const votes = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_VOTE':
            console.log(action);
            return [
                ...state,
                {
                    id: action.id,
                    vote: action.newVote
                }
            ];
        default:
            return state;
    }
}

export default votes;