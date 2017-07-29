import votes from './votes.js';
import { combineReducers } from 'redux'

const voteApp = combineReducers({
    votes
});

export default voteApp;