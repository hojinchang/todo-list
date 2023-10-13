import { createSidebarProject } from "./createDom";

const projects = (() => {
    const projects = [];

    const getLength = () => projects.length;

    const addProject = (projectName) => {
        const project = createSidebarProject(projectName);
        projects.push(project);

        return project;
    }

    return {addProject, getLength};
})();

export default projects;