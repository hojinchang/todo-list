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
    let projectConfirmBtn = document.getElementById("projectConfirm");
    let projectTitleInput = document.getElementById("projectInput");
    
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
        const projectTitle = project.dataset.sidebarFilter;

        const { headerContainer, tasksContainer } = dom.createMain(projectTitle);

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
        dom.editProjectModal(projectTitle);  // Convert the project modal HTML element to Edit Project mode
        _openModal(projectModal);

        const project = document.querySelector(`[data-project-title = "${projectTitle}"]`);
        projectForm.addEventListener("submit", (e) => {
            if (projectConfirmBtn.textContent === "Edit") {
                _editProject(e, projectForm, project);
            }

            console.log(e.target.parentNode)
        })
    }
    const _deleteProject = (e) => {
        e.stopPropagation();  // Prevents clicking the delete buttons from trying to propagate and open the project content
        e.target.parentNode.parentNode.remove();
        Projects.deleteProject();
        _clearProject();
        _updateNumProjects();
    }
    const _editProject = (e, projectForm, project) => {
        e.preventDefault();

        const formData = new FormData(projectForm);
        const newProjectTitle = formData.get("title");

        project.dataset.sidebarFilter = newProjectTitle;
        project.dataset.projectTitle = newProjectTitle;
        const title = project.querySelector("p");
        title.textContent = newProjectTitle;
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

            const editProjectBtn = document.querySelector(`[data-project-title = "${projectTitle}"].edit-project`);
            editProjectBtn.addEventListener("click", (e) => _editProjectModal(e, projectTitle));


            const deleteProjectBtn = document.querySelector(`[data-project-title = "${projectTitle}"].delete-project`);
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
        dom.addProjectModal();   // Convert the project modal HTML element to Add Project mode
        _openModal(projectModal);
    });
    projectForm.addEventListener("submit", (e) => {
        if (projectConfirmBtn.textContent === "Add") {
            _createProject(e, projectForm);
        }

        _closeModal(e.target.parentNode, projectForm);
        _updateNumProjects();
    } )

    _initDisplay();



})();

export default displayController;