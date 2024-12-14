import { v4 } from 'uuid';

export const addProject = (projectName, projectDescription, projectStatus) => {
    return {
        type: "ADD",
        item: {
            key: v4(projectName),
            projectName: projectName,
            projectDescription: projectDescription,
            projectStatus: projectStatus,
        },
    }
}
