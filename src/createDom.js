import EditIcon from "./images/edit.svg";
import DeleteIcon from "./images/delete.svg";
import ProjectIcon from "./images/project.svg";


const dom = (() => {
    // Create a project element in the DOM
    const createSidebarProject = (projectName) => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("sidebar-button");
        projectContainer.classList.add("button-hover");
        projectContainer.dataset.sidebarFilter = projectName;
        projectContainer.dataset.projectName = projectName;

        const projectIcon = new Image();
        projectIcon.src = ProjectIcon;
        projectIcon.dataset.sidebarIcon = projectName;

        const name = document.createElement("p");
        name.textContent = projectName;
    
        const projectModification = document.createElement("div");
        projectModification.classList.add("projectModification");
        const editIcon = new Image();
        editIcon.src = EditIcon;
        editIcon.classList.add("edit-project");
        const deleteIcon = new Image();
        deleteIcon.src = DeleteIcon;
        deleteIcon.classList.add("delete-project");
    
        projectModification.appendChild(editIcon);
        projectModification.appendChild(deleteIcon);
        
        projectContainer.appendChild(projectIcon);
        projectContainer.appendChild(name);
        projectContainer.appendChild(projectModification);
    
        return projectContainer;
    }

    // Create main
    const createMain = (headerName) => {
        const headerContainer = document.createElement("div");
        const headerIcon = document.querySelector(`img[data-sidebar-icon="${headerName}"]`).cloneNode(true);
        const headerText = document.createElement("h2");
        headerText.textContent = headerName;

        headerContainer.appendChild(headerIcon);
        headerContainer.appendChild(headerText);

        return headerContainer;
    }

    return { createSidebarProject, createMain };
})();

export default dom;