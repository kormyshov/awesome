export const taskReducer = (state = [], action) => {
    let new_state = state;
    let flag = false;
    switch (action.type) {
        case "INIT_TASKS":
            return action.items;
        case "ADD_TASK":
            new_state = [action.item, ...state];
            flag = true;
            break;
        case "SWITCH_TASK":
            new_state = state.map(item => item.id !== action.item.id ? {...item} : {...action.item});
            flag = true;
            break;
        case "SAVE_TASK":
            // TODO: сделать проверку на изменение isChecked и обновление даты
            new_state = state.map(item => item.id !== action.item.id ? {...item} : {...action.item});
            flag = true;
            break;
        case "DELETE_TASK":
            new_state = [...state.filter(item => item.id !== action.id), {...action.item}];
            flag = true;
            break;
        default:
            new_state = state;
    }

    if (flag) {

        let user_id = window.Telegram.WebApp.initDataUnsafe.user?.id;
        const validation = encodeURIComponent(window.Telegram.WebApp.initData);
        if (typeof user_id === "undefined") user_id = "test"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(new_state)
        };

        fetch("https://functions.yandexcloud.net/d4e343ukvmnpbmhsmf0u?method=set_tasks&user=" + user_id + "&validate=" + validation, requestOptions)
    }
    return new_state;
}
