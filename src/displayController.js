import dom from './createDom';
import Projects from './projects';
import Project from './project';

const displayController = (() => {
    const sidebarFilterBtns = document.querySelectorAll(".filter-button");
    const projectsSidebar = document.querySelector(".sidebar-projects");

    const newProjectBtn = document.querySelector(".create-project-button");
    const newProjectModal = document.getElementById("newProjectModal");
    const newProjectForm = document.getElementById("newProjectForm");
    const editProjectModal = document.getElementById("editProjectModal");
    const editProjectForm = document.getElementById("editProjectForm");

    const projectsCount = document.querySelector(".projects-count");
    let projectConfirmBtn = document.getElementById("projectConfirm");
    
    const mainContent = document.getElementById("main-content");

    const modalBtns = document.querySelectorAll(".modal-button");
    const newTaskModal = document.getElementById("newTaskModal");

    const backdropModal = document.createElement("div");
    backdropModal.className = "backdrop";


    const _highlightActiveBtn = (e) => {
        const sidebarBtns = document.querySelectorAll(".button");
        const button = e.target.closest(".button");

        if (!button.classList.contains("active-button")) {
            sidebarBtns.forEach(btn => {
                btn.classList.remove("active-button");
            })
            button.classList.add("active-button");
        }
    }
    const _updateNumProjects = () => projectsCount.textContent = Projects.getLength();
    const _clearProject = () => mainContent.textContent = "";
    const _openProject = (e) => {
        const _setNewTaskButton = () => {
            const newTaskBtn = document.querySelector(".create-task-button");
            newTaskBtn.addEventListener("click", (e) => {
                _openModal(newTaskModal);
            })
        }

        const project = e.target.closest(".button");
        const projectName = project.dataset.sidebarFilter;

        const { headerContainer, tasksContainer } = dom.createMain(projectName);

        mainContent.appendChild(headerContainer);
        mainContent.appendChild(tasksContainer);

        _setNewTaskButton();  
    }
    const _openModal = (modal) => {
        modal.style.display = "block";
        backdropModal.style.display = "block";
        document.body.appendChild(backdropModal);
    }
    const _closeModal = (modal, form) => {
        modal.style.display = "none";
        backdropModal.style.display = "none";
        document.body.removeChild(backdropModal);
        form.reset();
    }
    const _editProjectModal = (e, projectTitle) => {
        e.stopPropagation();  // Prevents clicking the delete buttons from trying to propagate and open the project content
        dom.editProjectModal();  // Convert the project modal HTML element to Edit Project mode
        _openModal(projectModal);
    }
    const _deleteProject = (e) => {
        e.stopPropagation();  // Prevents clicking the delete buttons from trying to propagate and open the project content
        e.target.parentNode.parentNode.remove();
        Projects.deleteProject();
        _clearProject();
        _updateNumProjects();
    }
    const _editProject = (e, projectForm) => {
        e.preventDefault();
        const formData = new FormData(projectForm);
        const projectTitle = formData.get("title");
    }
    const _createProject = (e, projectForm) => {
        e.preventDefault();

        const formData = new FormData(projectForm);
        const projectTitle = formData.get("title");

        if (!Projects.projectExists(projectTitle)) {
            const project =  dom.createSidebarProject(projectTitle);   // Create project DOM element

            project.addEventListener("click", (e) => {
                _clearProject();
                _highlightActiveBtn(e);
                _openProject(e);
            });

            Projects.addProject(Project(projectTitle));
            projectsSidebar.appendChild(project);

            const editProjectBtn = document.querySelector(`[data-project-name = "${projectTitle}"].edit-project`);
            editProjectBtn.addEventListener("click", (e) => _editProjectModal(e, projectTitle));

            const deleteProjectBtn = document.querySelector(`[data-project-name = "${projectTitle}"].delete-project`);
            deleteProjectBtn.addEventListener("click", _deleteProject);
        
        } else {
            alert("Project Already Exists");
        }
    }

    const _initDisplay = () => {
        sidebarFilterBtns.forEach(button => {
            button.addEventListener("click", (e) => {
                _clearProject();
                _highlightActiveBtn(e);
                _openProject(e);
            });
        });    
    }


    modalBtns.forEach(button => {
        button.addEventListener("click", (e) => {
            const modal = e.target.closest(".modal");
            const form = e.target.closest("form");
            _closeModal(modal, form);
        });
    });


    newProjectBtn.addEventListener("click", () =>  {
        _openModal(newProjectModal);
    });
    newProjectForm.addEventListener("submit", (e) => {
        _createProject(e, newProjectForm);
        _closeModal(e.target.parentNode, newProjectForm);
        _updateNumProjects();
        
    } )

    _initDisplay();



})();

export default displayController;