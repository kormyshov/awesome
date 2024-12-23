import { v4 } from 'uuid';

export const addTask = (taskName, taskDescription) => {
    return {
        type: "ADD",
        item: {
            id: v4(taskName),
            taskName: taskName,
            taskDescription: taskDescription,
            isChecked: false,
        },
    }
}

// export const deleteProject = (projectId, projectName, projectDescription) => {
//     return {
//         type: "DELETE",
//         id: projectId,
//         item: {
//             id: projectId,
//             projectName: projectName,
//             projectDescription: projectDescription,
//             projectStatus: "DELETED",
//         },
//     }
// }

export const switchTask = (taskId, taskName, taskDescription, isChecked) => {
    return {
        type: "SWITCH",
        item: {
            id: taskId,
            taskName: taskName,
            taskDescription: taskDescription,
            isChecked: isChecked,
        },
    }
}
