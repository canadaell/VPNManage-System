import handleArr from "@/store/ArrStatus";

type ActionType = {
    type: string;
    val: number;
};

let reducer = (state = { ...handleArr.state }, action: ActionType) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case handleArr.sarrpush:  
            handleArr.actions.sarrpush(newState, action);
            break;
        default:
            break;
    }

    return newState;
};

export default reducer;