const modal = document.getElementById("studdy-modal");
const closeBtn = document.querySelector(".close-btn");
const getStartedBtn = document.getElementById("get-started-btn");

window.addEventListener("load", () => {
  modal.classList.add("show");
});

// closes when the close button is clicked
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// closes the modal when clicking "Get Started"
getStartedBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});
