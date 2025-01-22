import { Contacts } from "../types/contact/contacts.tsx";


export const uploadContacts = (state: Contacts = new Contacts()) => {

    let user_id = window.Telegram.WebApp.initDataUnsafe.user?.id;
    const validation = encodeURIComponent(window.Telegram.WebApp.initData);
    if (typeof user_id === "undefined") user_id = "test"

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: state.toString()
    };

    fetch("https://functions.yandexcloud.net/d4e343ukvmnpbmhsmf0u?method=set_contacts&user=" + user_id + "&validate=" + validation, requestOptions)
}
