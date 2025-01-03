export const taskReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_TASKS":
            return action.items;
        case "ADD_TASK":
            return [action.item, ...state]
        case "SWITCH_TASK":
            return state.map(item => item.id !== action.item.id ? {...item} : {...action.item});
        case "SAVE_TASK":
            // TODO: сделать проверку на изменение isChecked и обновление даты
            return state.map(item => item.id !== action.item.id ? {...item} : {...action.item});
        case "DELETE_TASK":
            return [...state.filter(item => item.id !== action.id), {...action.item}];
        default:
            return state;
    }
}
