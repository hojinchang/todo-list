import projects from './projects';
// import createSidebarProject from "./createDom";


const displayController = (() => {
    const _activateNewProjectModal = () => {
        const newProjectModal = document.getElementById("newProjectModal");
        const newProjectBtn = document.querySelector(".create-project-button");
        const closeProjectModalBtn = document.querySelector(".modal-close-button");
        const backdropModal = document.createElement("div");
        backdropModal.className = "backdrop";

        newProjectBtn.addEventListener("click", () => {
            newProjectModal.style.display = "block";
            backdropModal.style.display = "block";
            document.body.appendChild(backdropModal);
        })
        
        
        closeProjectModalBtn.addEventListener("click", () => {
            newProjectModal.style.display = "none";
            backdropModal.style.display = "none";
            document.body.removeChild(backdropModal);
        })
    }

    const _createProject = () => {
        const newProjectForm = document.getElementById("newProjectForm");

        newProjectForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(newProjectForm);
            console.log(formData.get("title"))
            projects.addProject(formData.get("title"));
            // createSidebarProject
        })

    }



    _activateNewProjectModal();
    _createProject();


})();

export default displayController;