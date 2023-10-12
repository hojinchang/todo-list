import projects from './projects';
// import createSidebarProject from "./createDom";


const displayController = (() => {

    const _activateNewProjectModal = () => {
        const newProjectModal = document.getElementById("newProjectModal");
        const newProjectBtn = document.querySelector(".create-project-button");
        const modalButtons = document.querySelectorAll(".modal-button");
        const backdropModal = document.createElement("div");
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
        
        modalButtons.forEach(button => {
            button.addEventListener("click", _closeNewProjectModal);
        });
    }

    const _createProject = () => {
        const newProjectForm = document.getElementById("newProjectForm");

        newProjectForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(newProjectForm);
            console.log(formData.get("title"))
            projects.addProject(formData.get("title"));
            newProjectForm.reset();
        })

    }



    _activateNewProjectModal();
    _createProject();


})();

export default displayController;