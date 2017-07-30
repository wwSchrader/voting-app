export function voteHasErrored(state = false, action) {
    switch (action.type) {
        case 'VOTE_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function votesIsLoading(state = false, action) {
    switch (action.type) {
        case 'VOTE_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function votes(state = [], action) {
    switch (action.type) {
        case 'VOTE_POST_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}
