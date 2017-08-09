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
    return {
        type: 'VOTE_POST_DATA_SUCCESS',
        items
    };
}

export function singlePollFetchDataSuccess(items) {
    return {
        type: 'SINGLE_POLL_FETCH_DATA_SUCCESS',
        items
    };
}

export function isLoggedIn(bool){
    console.log(bool);
    return {
        type: 'USER_IS_LOGGED_IN',
        isLoggedIn: bool
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

export function votesFetchSinglePoll(pollId) {
    return (dispatch) => {
        dispatch (votesIsLoading(true));

        fetch("/api/getpoll/?id=" + pollId)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(votesIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((singlePoll) => dispatch(singlePollFetchDataSuccess(singlePoll)))
            .catch((e) => {
                console.log(e);
                return dispatch(voteHasErrored(true))
            }
        );
    };
}