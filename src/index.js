import './style.css';

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
