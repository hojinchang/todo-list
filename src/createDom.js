import EditIcon from "./images/edit.svg";
import DeleteIcon from "./images/delete.svg";


const dom = (() => {
    // Create a project element in the DOM
    const createSidebarProject = (projectName) => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("sidebar-button");
        projectContainer.classList.add("button-hover");
        projectContainer.dataset.sidebarFilter = projectName;
        projectContainer.dataset.projectName = projectName;
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
    
        projectContainer.appendChild(name);
        projectContainer.appendChild(projectModification);
    
        const projectsSidebar = document.querySelector(".sidebar-projects");
        projectsSidebar.appendChild(projectContainer);
    
        return projectContainer;
    }

    // Create main
    const createMain = (headerName) => {
        const headerContainer = document.createElement("div");
        const headerIcon = document.querySelector(`img[data-sidebar-icon="${headerName}"]`).cloneNode(true);
        const headerText = document.createElement("h1");
        headerText.textContent = headerName;

        headerContainer.appendChild(headerIcon);
        headerContainer.appendChild(headerText);

        const main = document.querySelector("main");
        main.appendChild(headerContainer);

        return headerContainer;
    }

    return { createSidebarProject, createMain };
})();

export default dom;