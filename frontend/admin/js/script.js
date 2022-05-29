import {api} from "../../api.js";

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
  pkg_add: "package",
  pkg_id_get: (pkgId) => `package/${pkgId}`,
  pkg_update: (pkgId) => `package/${pkgId}`,
  pkg_delete: (pkgId) => `package/${pkgId}`,
  booking_get: (type) => `booking/${type}`,
  booking_post: (id) => `booking/${id}`,
  message_get: `message`,
  message_delete: (msgId) => `message/${msgId}`
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
  
  await api.post_json(endpointPath.pkg_add, JSON.stringify(packageData));
  console.log("submitted");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const index = +e.target.dataset.index;

    if(index === 1){
      updateListPackage();
    }
    else if(index === 2){
      getUserBooking("pending");
    }
    else if(index === 3){
      getMessage();
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
  parent.dataset.id = data.id;
  parent.innerHTML =`<img src=${endpointPath.img_get(data.image)} alt="loacation">
                  <div class="content">
                      <h3> <i class="fas fa-map-marker-alt"></i> ${data.place} </h3>
                      <p class="pkg-des"></p>
                      <div class="price"> Rs. ${data.price} </div>
                      <div class="edit-option" data-id=${data.id} data-name=${data.place} data-price=${data.price} data-img=${data.image}>
                          <span class="btn book-btn">Edit Package</span>
                          <span class="fa fa-trash delete"></span>
                  </div>`;
  parent.querySelector(".pkg-des").innerText = data.description;
  return parent;
}

function DOMUpdateListPackage(jsonData){
  const pkgContainer = document.querySelector(".package-container");
  pkgContainer.innerHTML = ''
  jsonData.forEach(data => {
    pkgContainer.appendChild(pkgTemplate(data));
    const lastElem = pkgContainer.lastChild;
    lastElem.querySelector(".delete").addEventListener("click", removePackage);
    lastElem.querySelector(".book-btn").addEventListener("click", editPackage);
  });
}

async function removePackage(e){
  const id = e.currentTarget.parentElement.dataset.id;
  const imgName = e.currentTarget.parentElement.dataset.img;
  const status = await api.remove(endpointPath.pkg_delete(id));
  if(status){
    await api.remove(endpointPath.img_delete(imgName));
  }
  updateListPackage();
}

// function to search pkg

const searchBtn = document.querySelectorAll(".pkg-search-ic");

searchBtn.forEach(btn => {
  btn.addEventListener("click", searchPkg);
});

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

// function to update pkg
const updateFormCnt = document.querySelector(".float-form");
const updateForm = document.querySelector(".update-pkg");
const closeForm = document.querySelector(".close-form");
const updateBtn = document.querySelector(".update-pkg-btn");

closeForm.addEventListener("click", () => {
  updateFormCnt.classList.add("none");
  updateForm.reset();
  updateForm.dataset.id="";  
});

function editPackage(e){
  const pkgData = e.currentTarget.parentElement.dataset;
  const update_img = document.querySelector(".update-pkg-img");

  updateForm.dataset.id = pkgData.id;
  updateForm.dataset.image  = pkgData.img;
  updateForm.querySelector(".update-pkg-name").value = pkgData.name;
  updateForm.querySelector(".update-pkg-price").value = pkgData.price;
  updateForm.querySelector(".update-pkg-des").value = document.querySelector(`.package[data-id='${pkgData.id}'] .pkg-des`).innerText;

  console.log(update_img.files.length);  

  updateFormCnt.classList.remove("none");
}

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

updateBtn.addEventListener("click", updatePkg);

async function updatePkg(){
  let packageData ={};
  const id = updateForm.dataset.id;
  packageData.name=updateForm.querySelector(".update-pkg-name").value;
  packageData.price=updateForm.querySelector(".update-pkg-price").value;
  packageData.des=updateForm.querySelector(".update-pkg-des").value;
  const imgInput = document.querySelector(".update-pkg-img");
  if(imgInput.files.length == 0){
    packageData.imgurl = updateForm.dataset.image;
  }
  else{
    const data = new FormData();
    data.append("image", imgInput.files[0]);
    const res=await api.post(endpointPath.img_post ,data);
    await api.remove(endpointPath.img_delete(updateForm.dataset.image));
    packageData.imgurl=res.image_url;
  }
  
  const status = await api.update(endpointPath.pkg_update(id), JSON.stringify(packageData));
  console.log(status);
  updateListPackage();
  closeForm.click();
}

// user bookings
const bookingStatusTemplate = (data) => {
  const parent = document.createElement("div");
  parent.classList.add("booking");
  parent.dataset.id = data.bookingid;
  console.log(data);
  var btn = '';
  if(data.approved === 2){
    btn = `<div class="btn approve-btn">Approve</div>
           <div class="btn cancel-btn">Cancel</div>`
  }
  else{
    btn = `<div>Status: ${data.approved == 0 ? "Cancelled" : "Approved" }</div>`;
  }
  parent.innerHTML = `
                <div class="user-detail">
                    <h3>User Detail</h3>
                    <div class="user-name">Name: <span>${data.name}</span></div>
                    <div class="user-email">E-mail: <span>${data.email}</span></div>
                    <div class="user-mobile">Mobile: <span>${data.phone_num}</span></div>
                    <div class="user-dep-date">Departure Date: <span>${data.departure_date}</span></div>
                    <div class="user-arr-date">Arrival Date: <span>${data.arrival_date}</span></div>
                </div>
                <div class="pkg-detail">
                    <h3>Package Detail</h3>
                    <div class="pkg-id">Package id: <span>${data.pkgid}</span></div>
                    <div class="pkg-name">Package Name: <span>${data.place}</span></div>
                </div>
                ${btn}`
  return parent;
}

async function getUserBooking(type){
  const data = await api.get(endpointPath.booking_get(type));
  console.log(data);
  updateUserBooking(data);
}

function updateUserBooking(bookingData){
  const bookingCnt = document.querySelector(".bookings-container");
  bookingCnt.innerHTML = '';
  bookingData.forEach(data => {
    bookingCnt.appendChild(bookingStatusTemplate(data));
    bookingCnt.lastChild.querySelectorAll(".btn")?.forEach(btn => {
      btn.addEventListener("click", updateBookingStatus);
    });
  });
}

async function updateBookingStatus(e){
  const id = e.currentTarget.parentElement.dataset.id;
  const approveStatus = e.currentTarget.classList.contains("approve-btn") ? 1 : 0;
  await api.update(endpointPath.booking_post(id), JSON.stringify({approved: approveStatus}));
  getUserBooking("pending");
}

// DOM FUNCTION FOR BOOKING FILTER
const bookingFilter = document.querySelector("#pkg-filter");
bookingFilter.addEventListener("change", (e) => {
  getUserBooking(e.currentTarget.value);
});

// function for messages
async function getMessage(){
  const data = await api.get(endpointPath.message_get);
  updateMessageList(data);
}

const msgTemplate = (data) => {
  const parent = document.createElement("div");
  parent.classList.add("message-list");
  parent.innerHTML = `
  <i class="fas fa-times clear-msg" data-msgid=${data.msgid}></i>
  <h4>${data.name}</h4>
  <p>${data.subject}</p>
  <div class="msg-data none">
      <div class="name">${data.name}</div>
      <div class="email">${data.email}</div>
      <div class="phoneNo">${data.phone_num}</div>
      <div class="subject">${data.subject}</div>
      <div class="data">${data.message}</div>
  </div>
  `;
  return parent;
}

function updateMessageList(msgData){
  const msgContainer = document.querySelector(".message-lists");
  msgContainer.innerHTML = '';
  msgData.forEach(data => {
    msgContainer.appendChild(msgTemplate(data));
    msgContainer.lastChild.addEventListener("click", messageClickListener, false);
    msgContainer.lastChild.querySelector(".clear-msg").addEventListener("click", clearMessage, true);
  });
}

// DOMfunction for message
async function clearMessage(e){
  e.stopPropagation();
  const msgid = e.currentTarget.dataset.msgid;
  console.log(msgid)
  await api.remove(endpointPath.message_delete(msgid));
  getMessage(); 
}

function messageClickListener(e) {
  document.querySelector(".selected")?.classList.remove("selected");
  e.currentTarget.classList.add("selected");
  const msgData = e.currentTarget.querySelectorAll(".msg-data > *");
  const container = document.querySelectorAll(".message-content .msg-value");
  msgData.forEach((data, index) => {
      container[index].innerText = data.innerText;
  });
}
