export const projectReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD":
            return [action.item, ...state]
        default:
            return state;
    }
}
