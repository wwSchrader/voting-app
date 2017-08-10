"use strict";

var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
var MONGODB_URI = process.env.MONGODB_URI;

var pollCollection;
var userCollection;
var sessionsCollection;

// ------------------------------
// ASYNCHRONOUS PROMISE-BASED API
// ------------------------------

function findUserById(userId) {
  return new Promise(function (resolve, reject) {
    try {
      userCollection.findOne({"_id": ObjectId(userId)}, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (ex) {
      reject(new DatastoreUnknownExceptionGetAll(ex));
    }
  });
}


function findUser(userName) {
  return new Promise(function (resolve, reject) {
    try {
      userCollection.findOne({"username": userName}, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (ex) {
      reject(new DatastoreUnknownExceptionGetAll(ex));
    }
  });
}

function addUser(userBody) {
  return new Promise(function (resolve, reject) {
    try {
      userCollection.insertOne(userBody , function (err, res) {
        if (err) {
          reject(new DatastoreUnderlyingException(userBody, err));
        } else {
          resolve(res);
        }
      });
    } catch (ex) {
      reject(new DatastoreValueSerializationException(userBody, ex));
    }
  });
}

function insert(value) {
  return new Promise(function (resolve, reject) {
    try {
      pollCollection.insertOne(value, function (err, res) {
        if (err) {
          reject(new DatastoreUnderlyingException(value, err));
        } else {
          resolve(res);
        }
      });
    } catch (ex) {
      reject(new DatastoreValueSerializationException(value, ex));
    }
  });
}

function addVoteToOption(pollId, optionIndex) {
  return new Promise(function (resolve, reject) {
    try {
      //create dot notation for accessing a nested array element
      var update = {"$inc": {} };
      update["$inc"]["voteOptions." + optionIndex + ".optionVotes"] = 1;
      //update the chosen voteOption votes by increasing by 1
      pollCollection.updateOne({"_id": ObjectId(pollId)}, update)
        .then(function (result) {
          if (result.result.ok !== 1) {
            reject(new DatastoreUnknownExceptionGetAll(result))
          } else {
            resolve(result);
          }
        });
    } catch (ex) {
      reject(new DatastoreUnknownExceptionGetAll(ex))
    }
  });
}

function addOptionAndVote(pollId, newOptionName) {
  return new Promise(function (resolve, reject) {
    try {
      //push new vote option and give it a vote
      pollCollection.updateOne({"_id": ObjectId(pollId)},
        { $push:
          { "voteOptions":
            {"optionName": newOptionName, "optionVotes": 1}
          }
        })
        .then(function (result) {
          if (result.result.ok !== 1) {
            reject(new DatastoreUnknownExceptionGetAll(result))
          } else {
            resolve(result);
          }
        });
    } catch (ex) {
      reject(new DatastoreUnknownExceptionGetAll(ex))
    }
  });
}

function getAllNames() {
  return new Promise(function (resolve, reject) {
    try {
      //return just the ids and vote names
      pollCollection.find({}, {voteName: 1 }).toArray(function (err, arrays) {
        if (err) {
          reject(new DatastoreUnderlyingExceptionGetAll(err));
        } try {
          if(arrays===null){
            resolve(null);
          }
          else{
            resolve(arrays);
          }
        } catch (ex) {
          reject(new DatastoreDataParsingException(arrays, ex));
        }
      });
    } catch (ex) {
      reject(new DatastoreUnknownExceptionGetAll(ex));
    }
  })
}

function getNamesFilterByCreator(userId) {
  return new Promise(function (resolve, reject) {
    try {
      //return just the ids and vote names
      pollCollection.find({creatorId: ObjectId(userId)}, {voteName: 1 }).toArray(function (err, arrays) {
        if (err) {
          reject(new DatastoreUnderlyingExceptionGetAll(err));
        } try {
          if(arrays===null){
            resolve(null);
          }
          else{
            resolve(arrays);
          }
        } catch (ex) {
          reject(new DatastoreDataParsingException(arrays, ex));
        }
      });
    } catch (ex) {
      reject(new DatastoreUnknownExceptionGetAll(ex));
    }
  })
}

function getPollDetail(key) {
  return new Promise(function (resolve, reject) {
    try {
      //return just the ids and vote names
      pollCollection.find(ObjectId(key)).toArray(function (err, arrays) {
        if (err) {
          reject(new DatastoreUnderlyingExceptionGetAll(err));
        } try {
          if(arrays===null){
            resolve(null);
          }
          else{
            resolve(arrays);
          }
        } catch (ex) {
          console.log(ex);
          reject(new DatastoreDataParsingException(arrays, ex));
        }
      });
    } catch (ex) {
      console.log(ex);
      reject(new DatastoreUnknownExceptionGetAll(ex));
    }
  })
}

function deleteOnePoll(key) {
  return new Promise(function (resolve, reject) {
    try {
      //delete poll based on id number
      pollCollection.deleteOne({"_id": ObjectId(key)})
        .then(function (result) {
          if(result.result.ok !== 1) {
            reject(result);
          }
          resolve(result);
        })
    } catch (ex) {
      console.log(ex);
      reject(new DatastoreUnknownExceptionGetAll(ex));
    }
  })
}

// Serializes an object to JSON and stores it to the database
function set(key, value) {
  return new Promise(function (resolve, reject) {
    if (typeof(key) !== "string") {
      reject(new DatastoreKeyNeedToBeStringException(key));
    } else {
      try {
        var serializedValue = JSON.stringify(value);
        pollCollection.updateOne({"key": key}, {$set: {"value": serializedValue}}, {upsert:true}, function (err, res) {
          if (err) {
            reject(new DatastoreUnderlyingException(value, err));
          } else {
            console.log(res);
            resolve(res);
          }
        });
      } catch (ex) {
        reject(new DatastoreValueSerializationException(value, ex));
      }
    }
  });
}

// Fetches an object from the DynamoDB instance, deserializing it from JSON
function get(key) {
  return new Promise(function (resolve, reject) {
    try {
      if (typeof(key) !== "string") {
        reject(new DatastoreKeyNeedToBeStringException(key));
      } else {
        pollCollection.findOne({"key":key}, function (err, data) {
          if (err) {
            reject(new DatastoreUnderlyingException(key, err));
          } else {
            try {
              if(data===null){
                resolve(null);
              }
              else{
                resolve(JSON.parse(data.value));
              }
            } catch (ex) {
              reject(new DatastoreDataParsingException(data.value, ex));
            }
          }
        });
      }
    } catch (ex) {
      reject(new DatastoreUnknownException("get", {"key": key}, ex));
    }
  });
}

function remove(key) {
  return new Promise(function (resolve, reject) {
    try {
      if (typeof(key) !== "string") {
        reject(new DatastoreKeyNeedToBeStringException(key));
      } else {
        pollCollection.deleteOne({"key": key}, function (err, res) {
          if (err) {
            reject(new DatastoreUnderlyingException(key, err));
          } else {
            resolve(res);
          }
        });
      }
    } catch (ex) {
      reject(new DatastoreUnknownException("remove", {"key": key}, ex));
    }
  });
}

function removeMany(keys) {
  return Promise.all(keys.map(function (key) {
    return remove(key);
  }));
}

function connect(collectionType) {
  return new Promise(function (resolve, reject) {
    try {
      mongodb.MongoClient.connect(MONGODB_URI, function(err, db) {
        if(err) {
          console.log(err);
          reject(err);
        }

        if (collectionType === 'pollCollection') {
          pollCollection = db.collection(collectionType);
          resolve(pollCollection);
        } else if (collectionType === 'userCollection') {
          userCollection = db.collection(collectionType);
          resolve(userCollection);
        } else if (collectionType === 'sessionsCollection') {
          userCollection = db.collection(collectionType);
          resolve(userCollection);
        }

      });
    } catch(ex) {
      console.log(ex);
      reject(new DatastoreUnknownException("connect", null, ex));
    }
  });
}

function DatastoreKeyNeedToBeStringException(keyObject) {
  this.type = this.constructor.name;
  this.description = "Datastore can only use strings as keys, got " + keyObject.constructor.name + " instead.";
  this.key = keyObject;
}

function DatastoreValueSerializationException(value, ex) {
  this.type = this.constructor.name;
  this.description = "Failed to serialize the value to JSON";
  this.value = value;
  this.error = ex;
}

function DatastoreDataParsingException(data, ex) {
  this.type = this.constructor.name;
  this.description = "Failed to deserialize object from JSON";
  this.data = data;
  this.error = ex;
}

function DatastoreUnderlyingException(params, ex) {
  this.type = this.constructor.name;
  this.description = "The underlying DynamoDB instance returned an error";
  this.params = params;
  this.error = ex;
}

function DatastoreUnderlyingExceptionGetAll(ex) {
  this.type = this.constructor.name;
  this.description = "The underlying DynamoDB instance returned an error";
  this.error = ex;
}

function DatastoreUnknownException(method, args, ex) {
  this.type = this.constructor.name;
  this.description = "An unknown error happened during the operation " + method;
  this.method = method;
  this.args = args;
  this.error = ex;
}

function DatastoreUnknownExceptionGetAll(ex) {
  this.type = this.constructor.name;
  this.description = "An unknown error happened during the operation ";
  this.error = ex;
}

var asyncDatastore = {
  findUserById: findUserById,
  findUser: findUser,
  addUser: addUser,
  insert: insert,
  set: set,
  get: get,
  getAllNames: getAllNames,
  getNamesFilterByCreator: getNamesFilterByCreator,
  getPollDetail: getPollDetail,
  deleteOnePoll: deleteOnePoll,
  addVoteToOption: addVoteToOption,
  addOptionAndVote: addOptionAndVote,
  remove: remove,
  removeMany: removeMany,
  connect: connect
};

module.exports = {
  async: asyncDatastore
};