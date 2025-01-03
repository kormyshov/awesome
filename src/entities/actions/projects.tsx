import { v4 } from 'uuid';


export const initProjects = (projects) => {
    return {
        type: "INIT",
        items: projects,
    }
}

export const addProject = (projectName, projectDescription, projectStatus) => {
    return {
        type: "ADD",
        item: {
            id: v4(projectName),
            projectName: projectName,
            projectDescription: projectDescription,
            projectStatus: projectStatus,
        },
    }
}

export const deleteProject = (projectId, projectName, projectDescription) => {
    return {
        type: "DELETE",
        id: projectId,
        item: {
            id: projectId,
            projectName: projectName,
            projectDescription: projectDescription,
            projectStatus: "DELETED",
        },
    }
}

export const saveProject = (projectId, projectName, projectDescription, projectStatus) => {
    return {
        type: "SAVE",
        item: {
            id: projectId,
            projectName: projectName,
            projectDescription: projectDescription,
            projectStatus: projectStatus,
        },
    }
}
