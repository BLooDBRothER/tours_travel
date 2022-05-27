// const api = import("./api");
import {api} from "./api.js";

const navLinks = document.querySelectorAll(".link");
const section = document.querySelectorAll(".section");
const form = document.querySelector(".add-pkg");

form.addEventListener("submit",async (e) => {
  e.preventDefault();
  console.log("clicking submit butn");
  const value = form.querySelector(".add-pkg-img");
  const data = new FormData();
  const pkgname=form.querySelector(".add-pkg-name").value;
  const pkgprice=form.querySelector(".add-pkg-price").value;
  const pkgdes=form.querySelector(".add-pkg-des").value;
  data.append("image", value.files[0]);
  const res=await api.post("http://localhost:3000/image",data);
  let packageData ={};
  packageData.imgurl=res.image_url;
  packageData.name=pkgname;
  packageData.price=pkgprice;
  packageData.des=pkgdes;
  await api.post_json("http://localhost:3000/package",JSON.stringify(packageData));
  console.log("submitted");
});

navLinks.forEach((link) => {
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
});

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
