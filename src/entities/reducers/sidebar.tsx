export const sidebarReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN":
            return true
        case "CLOSE":
            return false
        default:
            return state;
    }
}
