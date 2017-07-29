let nextVoteId = 0;

export const createVote = newVote => {
    console.log(newVote);
    return {
        type: 'CREATE_VOTE',
        id: nextVoteId++,
        newVote
    }
}