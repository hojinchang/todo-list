import dom from './createDom';
import Projects from './projects';
import Project from './project';

const displayController = (() => {
    const sidebarFilterBtns = document.querySelectorAll(".filter-button");
    const projectsSidebar = document.querySelector(".sidebar-projects");
    const newProjectModal = document.getElementById("newProjectModal");
    const newProjectForm = document.getElementById("newProjectForm");
    const newProjectBtn = document.querySelector(".create-project-button");
    const projectsCount = document.querySelector(".projects-count");
    const modalBtns = document.querySelectorAll(".modal-button");
    const mainContent = document.getElementById("main-content");

    const backdropModal = document.createElement("div");
    backdropModal.className = "backdrop";


    const _openProject = (e) => {
        const project = e.target.closest(".button");
        const projectName = project.dataset.sidebarFilter;

        const { headerContainer, tasksContainer } = dom.createMain(projectName);

        mainContent.appendChild(headerContainer);
        mainContent.appendChild(tasksContainer);
    }

    const _clearProject = () => mainContent.textContent = "";

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

    // Opens the new project modal form
    const _openModal = (modal) => {
        modal.style.display = "block";
        backdropModal.style.display = "block";
        document.body.appendChild(backdropModal);
    }

    // Closes and resets the new project modal form
    const _closeModal = (modal, form) => {
        console.log(modal)

        modal.style.display = "none";
        backdropModal.style.display = "none";
        document.body.removeChild(backdropModal);
        form.reset();
    }

    const _updateNumProjects = () => projectsCount.textContent = Projects.getLength();

    const _initDisplay = () => {
        sidebarFilterBtns.forEach(button => {
            button.addEventListener("click", (e) => {
                _highlightActiveBtn(e);
                _clearProject();
                _openProject(e);
            });
        });    
    }


    newProjectBtn.addEventListener("click", () => _openModal(newProjectModal));
    newProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(newProjectForm);
        const projectTitle = formData.get("title");
        const project =  dom.createSidebarProject(projectTitle);   // Create project DOM element

        project.addEventListener("click", (e) => {
            _highlightActiveBtn(e);
            _clearProject();
            _openProject(e);
        });

        Projects.addProject(Project(projectTitle));
        projectsSidebar.appendChild(project);
        
        _closeModal(e.target.parentNode, newProjectForm);
        _updateNumProjects();
    });

    

    modalBtns.forEach(button => {
        button.addEventListener("click", (e) => {
            const modal = e.target.closest(".modal");
            const form = e.target.closest("form");
            _closeModal(modal, form);
        });
    });

    _initDisplay();


})();

export default displayController;