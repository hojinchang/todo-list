const projects = (() => {
    const projects = [];

    const getLength = () => projects.length;

    const getProjects = () => projects;

    const addProject = (newProject) => {
        projects.push(newProject);
    }

    return {addProject, getLength};
})();

export default projects;