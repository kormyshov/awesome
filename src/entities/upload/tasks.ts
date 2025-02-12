import { Tasks } from "../types/task/tasks.ts";
import { getCommand, getRequestOptions } from "./common.ts";


export const uploadTasks = (state: Tasks = new Tasks()) => {
    fetch(getCommand("set_tasks"), getRequestOptions(state));
}
