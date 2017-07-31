let nextVoteId = 0;

export const createVote = newVote => {
    return {
        type: 'CREATE_VOTE',
        id: nextVoteId++,
        newVote
    }
}

export function voteHasErrored(bool) {
    return {
        type: 'VOTE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function votesIsLoading(bool) {
    return {
        type: 'VOTE_IS_LOADING',
        isLoading: bool
    };
}

export function votesFetchDataSuccess(items) {
    console.log(items);
    return {
        type: 'VOTE_POST_DATA_SUCCESS',
        items
    };
}

export function votesFetchData() {
    return (dispatch) => {
        dispatch (votesIsLoading(true));

        fetch("/api/getvotes")
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(votesIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((votes) => dispatch(votesFetchDataSuccess(votes)))
            .catch((e) => {
                console.log(e);
                return dispatch(voteHasErrored(true))
            });
    };
}