import { v4 } from 'uuid';

export const addProject = (projectName) => {
    return {
        type: "ADD",
        item: {
            key: v4(projectName),
            projectName: projectName,
            isActive: true,
        },
    }
}
