const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // add opaque class when scrolled down
    header.classList.add("opaque");
    header.classList.remove("transparent");
  } else {
    // go back to transparent class when at the top
    header.classList.add("transparent");
    header.classList.remove("opaque");
  }
});
