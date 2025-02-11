export const getRequestOptions = (body: Object) : RequestInit => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: body.toString()
    };
}

export const getCommand = (method: String) => {
    let user_id = window.Telegram.WebApp.initDataUnsafe.user?.id;
    const validation = encodeURIComponent(window.Telegram.WebApp.initData);
    if (typeof user_id === "undefined") user_id = "test";

    return "https://functions.yandexcloud.net/d4e343ukvmnpbmhsmf0u?method=" + method + "&user=" + user_id + "&validate=" + validation;
}
