export const taskReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [action.item, ...state]
        case "SWITCH_TASK":
            return state.map(item => item.id !== action.item.id ? {...item} : {...action.item});
        case "SAVE_TASK":
            return state.map(item => item.id !== action.item.id ? {...item} : {...action.item});
        // case "DELETE":
        //     return [...state.filter(item => item.id !== action.id), action.item];
        // case "SAVE":
        //     return [action.item, ...state.filter(item => item.id !== action.item.id)];
        default:
            return state;
    }
}
