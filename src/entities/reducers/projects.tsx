export const projectReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD":
            return [action.item, ...state]
        case "DELETE":
            const old = state.filter(item => item.id !== action.id);
            return [...old, action.item];
        default:
            return state;
    }
}
