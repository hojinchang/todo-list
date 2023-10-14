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

    const projectExists = (projectName) => !!projects.find(project => project.getName() === projectName);  // !! converts output of array.find into boolean
    
    return {addProject, getLength, deleteProject, projectExists};
})();

export default projects;