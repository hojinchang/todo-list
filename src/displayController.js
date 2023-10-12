import projects from './projects';

const displayController = (() => {
    const sidebarBtns = document.querySelectorAll(".sidebar-button");
    const newProjectModal = document.getElementById("newProjectModal");
    const newProjectForm = document.getElementById("newProjectForm");
    const newProjectBtn = document.querySelector(".create-project-button");
    const modalBtns = document.querySelectorAll(".modal-button");
    const backdropModal = document.createElement("div");


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
        newProjectForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(newProjectForm);
            const newProject = projects.addProject(formData.get("title"));

            console.log(newProject)
            newProject.addEventListener("click", (e) => _addActiveClass(e));

            newProjectForm.reset();
        })

    }


    const _initDisplay = () => {
        sidebarBtns.forEach(button => {
            button.addEventListener("click", _addActiveClass);
        });

        _activateNewProjectModal();
        _createProject();
    }


    _initDisplay();


})();

export default displayController;