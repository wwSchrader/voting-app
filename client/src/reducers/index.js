import { votes, voteHasErrored, votesIsLoading } from './votes.js';
import { combineReducers } from 'redux'

const voteApp = combineReducers({
    votes,
    voteHasErrored,
    votesIsLoading
});

export default voteApp;