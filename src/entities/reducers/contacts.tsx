import { Contacts } from "../types/contact/contacts.tsx";
import { ContactActionType } from "../types/contact/contact_action_type.tsx";


export const contactReducer = (state: Contacts = new Contacts(), contactAction) => {

    let new_state: Contacts = state;
    let flag = false;

    switch (contactAction.type) {

        case ContactActionType.ADD_CONTACT:
            new_state.set(contactAction.item);
            flag = true;
            break;

        case ContactActionType.DELETE_CONTACT:
            new_state.setDeleted(contactAction.item);
            flag = true;
            break;

        case ContactActionType.SAVE_CONTACT:
            new_state.set(contactAction.item);
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
            body: new_state.toString()
        };

        fetch("https://functions.yandexcloud.net/d4e343ukvmnpbmhsmf0u?method=set_contacts&user=" + user_id + "&validate=" + validation, requestOptions)
    }
    return new_state;
}
