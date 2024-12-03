export const addProject = (projectName) => {
    return {
        type: "ADD",
        item: {
            projectName: projectName,
            isActive: true,
        },
    }
}
