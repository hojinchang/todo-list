import { createSidebarProject } from "./createDom";

const projects = (() => {

    const projects = [];

    const addProject = (projectName) => {
        const project = createSidebarProject(projectName);
        projects.push(project);

        console.log(`Created a new project: ${projectName}`);
        console.log(projects)
        return project;
    }

    return {addProject};
})();

export default projects;