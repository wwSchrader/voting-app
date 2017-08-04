import { votes, voteHasErrored, votesIsLoading, singlePoll } from './votes.js';
import { combineReducers } from 'redux'

const voteApp = combineReducers({
    votes,
    singlePoll,
    voteHasErrored,
    votesIsLoading
});

export default voteApp;