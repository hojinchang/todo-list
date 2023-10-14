import dom from './createDom';
import Projects from './projects';
import Project from './project';

const displayController = (() => {
    const sidebarFilterBtns = document.querySelectorAll(".filter-button");
    const projectsSidebar = document.querySelector(".sidebar-projects");

    const projectModal = document.getElementById("projectModal");
    const projectForm = document.getElementById("projectForm");
    const newProjectBtn = document.querySelector(".create-project-button");
    const projectsCount = document.querySelector(".projects-count");
    
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
        const projectName = project.dataset.projectName;

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
    const _deleteProject = (e) => {
        e.stopPropagation();  // Prevents clicking the delete buttons from trying to propagate and open the project content
        e.target.parentNode.parentNode.remove();
        Projects.deleteProject();
        _clearProject();
        _updateNumProjects();
    }
    const _createProject = (e, newProjectForm) => {
        e.preventDefault();

        const formData = new FormData(newProjectForm);
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

            const editProject = document.querySelector(`[data-project-name = "${projectTitle}"].edit-project`);
            

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
        dom.addProjectModal();
        _openModal(projectModal);

    });
    projectForm.addEventListener("submit", (e) => {
        _createProject(e, projectForm);
        _closeModal(e.target.parentNode, projectForm);
        _updateNumProjects();
    });

    _initDisplay();



})();

export default displayController;