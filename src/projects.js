const projects = (() => {
    const projects = [];

    const getLength = () => projects.length;

    const getProjects = () => projects;

    const addProject = (projectName) => {
        projects.push(projectName);
    }

    return {addProject, getLength};
})();

export default projects;