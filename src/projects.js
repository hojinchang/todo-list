import { createSidebarProject } from "./createDom";

const projects = (() => {
    const projects = [];

    const addProject = (projectName) => {
        const project = createSidebarProject(projectName);
        projects.push(project);

        return project;
    }

    return {addProject};
})();

export default projects;