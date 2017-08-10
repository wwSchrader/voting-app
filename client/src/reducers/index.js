import { votes, voteHasErrored, votesIsLoading, singlePoll } from './votes.js';
import { userIsSignedIn, userIdNumber } from './user.js';
import { combineReducers } from 'redux'

const voteApp = combineReducers({
    votes,
    singlePoll,
    voteHasErrored,
    votesIsLoading,
    userIsSignedIn,
    userIdNumber
});

export default voteApp;