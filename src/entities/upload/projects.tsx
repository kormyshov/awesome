import { Projects } from "../types/project/projects.tsx";


export const uploadProjects = (state: Projects = new Projects()) => {

    let user_id = window.Telegram.WebApp.initDataUnsafe.user?.id;
    const validation = encodeURIComponent(window.Telegram.WebApp.initData);
    if (typeof user_id === "undefined") user_id = "test"

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: state.toString()
    };

    fetch("https://functions.yandexcloud.net/d4e343ukvmnpbmhsmf0u?method=set_projects&user=" + user_id + "&validate=" + validation, requestOptions)
}
