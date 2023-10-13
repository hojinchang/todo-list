import EditIcon from "./images/edit.svg";
import DeleteIcon from "./images/delete.svg";

const createSidebarProject = (projectName) => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("sidebar-button");
    projectContainer.classList.add("button-hover");
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


export { createSidebarProject };