const projects = (() => {
    const projects = [];

    const getLength = () => projects.length;

    const getProjects = () => projects;

    const addProject = (newProject) => {
        projects.push(newProject);
    }

    const deleteProject = (projectName) => {
        const idx = projects.findIndex(project => project.getName() === projectName);
        projects.splice(idx, 1);
    }

    return {addProject, getLength, deleteProject};
})();

export default projects;