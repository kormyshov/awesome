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

// export const saveProject = (projectId, projectName, projectDescription, projectStatus) => {
//     return {
//         type: "SAVE",
//         item: {
//             id: projectId,
//             projectName: projectName,
//             projectDescription: projectDescription,
//             projectStatus: projectStatus,
//         },
//     }
// }
