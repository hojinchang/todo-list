import dom from './createDom';
import Projects from './projects';
import Project from './project';

const displayController = (() => {
    const sidebarBtns = document.querySelectorAll(".sidebar-button");
    const projectsSidebar = document.querySelector(".sidebar-projects");
    const newProjectModal = document.getElementById("newProjectModal");
    const newProjectForm = document.getElementById("newProjectForm");
    const newProjectBtn = document.querySelector(".create-project-button");
    const projectsCount = document.querySelector(".projects-count");
    const modalBtns = document.querySelectorAll(".modal-button");
    const backdropModal = document.createElement("div");
    const mainContent = document.getElementById("main-content");


    const _openProject = (e) => {
        const project = e.target.closest(".sidebar-button");
        const projectName = project.dataset.sidebarFilter;
        mainContent.appendChild(dom.createMain(projectName));
    }

    const _clearProject = () => mainContent.textContent = "";

    const _addActiveClass = (e) => {
        const sidebarBtns = document.querySelectorAll(".sidebar-button");
        const sidebarBtn = e.target.closest(".sidebar-button");

        if (!sidebarBtn.classList.contains("active-button")) {
            sidebarBtns.forEach(button => {
                button.classList.remove("active-button");
            })
            sidebarBtn.classList.add("active-button");
        }
    }

    const _activateNewProjectModal = () => {
        backdropModal.className = "backdrop";

        // Opens the new project modal form
        const _openNewProjectModal = () => {
            newProjectModal.style.display = "block";
            backdropModal.style.display = "block";
            document.body.appendChild(backdropModal);
        }

        // Closes and resets the new project modal form
        const _closeNewProjectModal = () => {
            newProjectModal.style.display = "none";
            backdropModal.style.display = "none";
            document.body.removeChild(backdropModal);
        }

        newProjectBtn.addEventListener("click", _openNewProjectModal);
        
        modalBtns.forEach(button => {
            button.addEventListener("click", _closeNewProjectModal);
        });
    }

    const _createProject = () => {
        const _updateNumProjects = () => projectsCount.textContent = Projects.getLength();

        newProjectForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(newProjectForm);
            // Create project DOM element
            const project =  dom.createSidebarProject(formData.get("title"));

            project.addEventListener("click", (e) => {
                _addActiveClass(e);
                _clearProject();
                _openProject(e);
            });

            projectsSidebar.appendChild(project);
            
            newProjectForm.reset();

            Projects.addProject(Project())
            _updateNumProjects();
        })
    }


    const _initDisplay = () => {
        sidebarBtns.forEach(button => {
            button.addEventListener("click", (e) => {
                _addActiveClass(e);
                _clearProject();
                _openProject(e);
            });
        });

        _activateNewProjectModal();
        _createProject();
    }


    _initDisplay();


})();

export default displayController;