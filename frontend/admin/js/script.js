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

// function for message

const messageLists = document.querySelectorAll(".message-list");

messageLists.forEach(list => {
    list.addEventListener("click", (e) => {
        document.querySelector(".selected")?.classList.remove("selected");
        e.currentTarget.classList.add("selected");
        const msgData = e.currentTarget.querySelectorAll(".msg-data > *");
        const container = document.querySelectorAll(".message-content .msg-value");
        msgData.forEach((data, index) => {
            container[index].innerText = data.innerText;
            // console.log(data.innerText);
        })
    });
});