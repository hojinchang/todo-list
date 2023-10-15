import EditIcon from "./images/edit.svg";
import DeleteIcon from "./images/delete.svg";
import ProjectIcon from "./images/project.svg";


const dom = (() => {
    // Convert the project modal HTML element to Add Project mode
    const addProjectModal = () => {
        const modalTitle = document.getElementById("projectModalTitle");
        const titleInput = document.getElementById("projectInput");
        const submitButton = document.getElementById("projectConfirm");

        modalTitle.textContent = "Add Project";
        titleInput.placeholder = "Project Name";
        submitButton.textContent = "Add";
    }
    // Convert the project modal HTML element to Edit Project mode
    const editProjectModal = (projectTitle) => {
        const modalTitle = document.getElementById("projectModalTitle");
        const titleInput = document.getElementById("projectInput");
        const submitButton = document.getElementById("projectConfirm");

        modalTitle.textContent = "Edit Project";
        titleInput.value = projectTitle;
        submitButton.textContent = "Edit";
    }

    // Create a project element in the DOM
    const createSidebarProject = (projectTitle) => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("button");
        projectContainer.classList.add("project-button");
        projectContainer.classList.add("button-hover");
        projectContainer.dataset.sidebarFilter = projectTitle;
        projectContainer.dataset.projectTitle = projectTitle;

        const projectIcon = new Image();
        projectIcon.src = ProjectIcon;
        projectIcon.dataset.sidebarIcon = projectTitle;

        const name = document.createElement("p");
        name.textContent = projectTitle;
    
        const projectModification = document.createElement("div");
        projectModification.classList.add("projectModification");
        const editIcon = new Image();
        editIcon.src = EditIcon;
        editIcon.classList.add("edit-project");
        editIcon.dataset.projectTitle = projectTitle
        const deleteIcon = new Image();
        deleteIcon.src = DeleteIcon;
        deleteIcon.classList.add("delete-project");
        deleteIcon.dataset.projectTitle = projectTitle
    
        projectModification.appendChild(editIcon);
        projectModification.appendChild(deleteIcon);
        
        projectContainer.appendChild(projectIcon);
        projectContainer.appendChild(name);
        projectContainer.appendChild(projectModification);
    
        return projectContainer;
    }

    // Create main
    const createMain = (projectTitle) => {
        const headerContainer = document.createElement("div");
        headerContainer.classList.add("tasks-header-container");
        const headerIcon = document.querySelector(`img[data-sidebar-icon="${projectTitle}"]`).cloneNode(true);
        const headerText = document.createElement("h1");
        headerText.textContent = projectTitle;
        headerContainer.appendChild(headerIcon);
        headerContainer.appendChild(headerText);

        const tasksContainer = document.createElement("div");
        tasksContainer.classList.add("tasks-container");
        const tasksHeader = document.createElement("div");
        tasksHeader .classList.add("tasks-header");
        const tasksCount = document.createElement("span");
        tasksCount.classList.add("tasks-count");
        tasksCount.textContent = "0";
        const tasksText = document.createElement("p");
        tasksText.textContent = "Tasks (";
        tasksText.appendChild(tasksCount);
        tasksText.textContent += ")";

        const createTaskBtn = document.createElement("button");
        createTaskBtn.classList.add("create-button");
        createTaskBtn.classList.add("create-task-button");
        createTaskBtn.classList.add("button-hover");
        createTaskBtn.dataset.tooltip = "Create New Task";
        createTaskBtn.textContent = "+";

        tasksHeader.appendChild(tasksText);
        tasksHeader.appendChild(createTaskBtn);

        tasksContainer.appendChild(headerContainer);
        tasksContainer.appendChild(tasksHeader);

        return {headerContainer, tasksContainer};
    }

    return {addProjectModal, editProjectModal, createSidebarProject, createMain};
})();

export default dom;