const navLinks = document.querySelectorAll(".link");
const section = document.querySelectorAll(".section");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const active = document.querySelector(".section.active");

        const selectedBtn = document.querySelector(".selected");

        selectedBtn.classList.remove("selected");
        e.target.classList.add("selected");

        active.classList.add("none");
        active.classList.remove("active");

        section[+e.target.dataset.index].classList.add("active");
        section[+e.target.dataset.index].classList.remove("none");
    });
})