import {api} from "./api.js";

const navLinks = document.querySelectorAll(".link");
const section = document.querySelectorAll(".section");
const form = document.querySelector(".add-pkg");

const base_url = "http://localhost:3000"

const endpointPath = {
  img_post: "image",
  img_get: (img_name) => `${base_url}/photos/${img_name}`,
  img_delete: (img_name) => `image/${img_name}`,
  pkg_post: "package",
  pkg_get: "package",
  pkg_name_get: (pkgName) => `package/name/${pkgName}`,
  pkg_id_get: (pkgId) => `package/${pkgId}`,
  pkg_delete: (pkgId) => `package/${pkgId}`,
}

// post form data 
form.addEventListener("submit",async (e) => {
  e.preventDefault();
  console.log("clicking submit butn");
  const value = form.querySelector(".add-pkg-img");
  const data = new FormData();
  const pkgname=form.querySelector(".add-pkg-name").value;
  const pkgprice=form.querySelector(".add-pkg-price").value;
  const pkgdes=form.querySelector(".add-pkg-des").value;

  data.append("image", value.files[0]);
  const res=await api.post(endpointPath.img_post ,data);
  
  let packageData ={};
  packageData.imgurl=res.image_url;
  packageData.name=pkgname;
  packageData.price=pkgprice;
  packageData.des=pkgdes;
  
  await api.post_json("package",JSON.stringify(packageData));
  console.log("submitted");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const index = +e.target.dataset.index;

    if(index == 1){
      updateListPackage();
    }

    const active = document.querySelector(".section.active");

    const selectedBtn = document.querySelector(".selected");

    selectedBtn.classList.remove("selected");
    e.target.classList.add("selected");
    
    active.classList.add("none");
    active.classList.remove("active");

    section[index].classList.add("active");
    section[index].classList.remove("none");
  });
});

// -------------------------Methods for list Package----------------------------

// function for fetching packages
var pkgLists;
async function updateListPackage(){
  const res = await api.get(endpointPath.pkg_get);
  pkgLists = res;
  DOMUpdateListPackage(pkgLists);
}

const pkgTemplate = (data) => {
  const parent = document.createElement("div");
  parent.classList.add("package");
  parent.innerHTML =`<img src=${endpointPath.img_get(data.image)} alt="loacation">
                  <div class="content">
                      <h3> <i class="fas fa-map-marker-alt"></i> ${data.place} </h3>
                      <p>${data.description}</p>
                      <div class="price"> Rs. ${data.price} </div>
                      <div class="edit-option" data-id=${data.id} data-name=${data.place} data-price=${data.price} data-img=${data.image}>
                          <span class="btn book-btn">Edit Package</span>
                          <span class="fa fa-trash delete"></span>
                  </div>`
  return parent
}

function DOMUpdateListPackage(jsonData){
  const pkgContainer = document.querySelector(".package-container");
  pkgContainer.innerHTML = ''
  jsonData.forEach(data => {
    pkgContainer.appendChild(pkgTemplate(data));
    const lastElem = pkgContainer.lastChild;
    lastElem.querySelector(".delete").addEventListener("click", removePackage);
  });
}

async function removePackage(e){
  const id = e.currentTarget.parentElement.dataset.id;
  const imgName = e.currentTarget.parentElement.dataset.image;
  const status = await api.remove(endpointPath.pkg_delete(id));
  if(status){
    await api.remove(endpointPath.img_delete(imgName));
  }
  updateListPackage();
}

const searchBtn = document.querySelectorAll(".pkg-search-ic");

searchBtn.forEach(btn => {
  btn.addEventListener("click", searchPkg);
});

// function to search pkg
async function searchPkg(e){
  const type = e.target.dataset.type;
  const value = document.querySelector(`.search-box.${type}`).value;
  console.log(value);
  if(value === ""){
    return;
  }
  const fetchUrlPath = type == "id" ? endpointPath.pkg_id_get(+value) : endpointPath.pkg_name_get(value);
  const res = await api.get(fetchUrlPath);
  if(!res){
    document.querySelector(".package-container").innerText = "No Package found";
    return;
  }
  DOMUpdateListPackage(res);
}

// DOMfunction for message
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
