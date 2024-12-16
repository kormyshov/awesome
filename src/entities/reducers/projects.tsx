export const projectReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD":
            return [action.item, ...state]
        case "DELETE":
            return [...state.filter(item => item.id !== action.id), action.item];
        case "SAVE":
            return [action.item, ...state.filter(item => item.id !== action.item.id)];
        default:
            return state;
    }
}
