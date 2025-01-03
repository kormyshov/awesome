import { v4 } from 'uuid';


export const initTasks = (tasks) => {
    return {
        type: "INIT_TASKS",
        items: tasks,
    }
}

export const addTask = (taskName, taskDescription) => {
    return {
        type: "ADD_TASK",
        item: {
            id: v4(taskName),
            taskName: taskName,
            taskDescription: taskDescription,
            isChecked: false,
            taskStatus: "",
        },
    }
}

export const deleteTask = (taskId, taskName, taskDescription, isChecked) => {
    return {
        type: "DELETE_TASK",
        id: taskId,
        item: {
            id: taskId,
            taskName: taskName,
            taskDescription: taskDescription,
            isChecked: isChecked,
            taskStatus: "DELETED",
        },
    }
}

export const switchTask = (taskId, taskName, taskDescription, isChecked) => {
    return {
        type: "SWITCH_TASK",
        item: {
            id: taskId,
            taskName: taskName,
            taskDescription: taskDescription,
            isChecked: isChecked,
            switchDate: new Date().toISOString(),
            taskStatus: "",
        },
    }
}

export const saveTask = (taskId, taskName, taskDescription, isChecked) => {
    return {
        type: "SAVE_TASK",
        item: {
            id: taskId,
            taskName: taskName,
            taskDescription: taskDescription,
            isChecked: isChecked,
            taskStatus: "",
        },
    }
}