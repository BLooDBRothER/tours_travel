import { user } from "./userData.js";

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('.search-bar-container');
const formBtn = document.querySelector('#login-btn');
const floatForm = document.querySelectorAll('.float-form-container');
const formClose = document.querySelectorAll('#form-close');
const menu = document.querySelector('#menu-bar');
const navbar = document.querySelector('.navbar');
const imgBtn = document.querySelectorAll('.img-btn');
const formChangeBtn = document.querySelectorAll(".change-link");
const bookingsOpen = document.querySelector(".your-bookings-link");
const bookingsClose = document.querySelector("#your-bookings-close");
const yourBookings =document.querySelector(".your-bookings");

window.onscroll = () => {
  searchBtn.classList.remove('fa-times');
  searchBar.classList.remove('active');
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  floatForm.forEach(form => {
    form.classList.remove('active')
  });
}

menu.addEventListener('click', () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
  searchBtn.classList.toggle('fa-times');
  searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () => {
  floatForm[0].classList.add('active');
});

formClose.forEach(closeBtn => {
  closeBtn.addEventListener("click", (e) => {
    floatForm[+e.target.dataset.index].classList.remove('active');
  });
})

imgBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.controls .active').classList.remove('active');
    btn.classList.add('active');
    let src = btn.getAttribute('data-src');
    document.querySelector('#video-slider').src = src;
  });
});

formChangeBtn.forEach(elem => {
  elem.addEventListener("click", (e) => {
    const toActivate = document.querySelector("form.none");
    const toDeactivate = document.querySelector(`form.${e.target.dataset.value}`);
    toActivate.classList.remove("none");
    toDeactivate.classList.add("none");
  });
});

function updateBookForm(packageData) {
  floatForm[1].querySelector("form").dataset.id = packageData.pkgid;
  floatForm[1].querySelector(".pkg-name").value = packageData.name;
  floatForm[1].querySelector(".pkg-price").value = packageData.price;
  let data=user.returnAllData();
  console.log({
    "name":data.name,
    "phone":data.phone_num,
    "email":data.email
  });
  floatForm[1].querySelector(".name").value=data.name;
  floatForm[1].querySelector(".mobile").value=data.phone_num;
  floatForm[1].querySelector(".email").value=data.email;
}


// your bookings
const url = "http://localhost:3000";
const endpointPath = {
  pkg_get: `${url}/package`,
  pkg_name_get: (pkgName) => `${url}/package/name/${pkgName}`,
  booking_post: `${url}/booking`,
  booking_id_get: (userid) => `${url}/booking/${userid}`,
  booking_check: `${url}/booking/check`,
  booking_delete: (id) => `${url}/booking/${id}`,
  msg_post: `${url}/message`
}

const reload = document.querySelector(".reload");
reload.addEventListener("click", getYourBookings);

bookingsOpen.addEventListener("click", (e) => {
  e.preventDefault();
  if(!user.returnAllData().isLogin){
    formBtn.click();
    return;
  }
  yourBookings.classList.remove("none");
  getYourBookings();
});

bookingsClose.addEventListener("click", () => {
  yourBookings.classList.add("none");
});

async function getYourBookings(){
  const res = await fetch(endpointPath.booking_id_get(user.returnAllData().id));
  const data = await res.json();
  console.log(data);
  updateYourBookings(data);
}

const bookingsTemplate = (data) => {
  console.log(data);
  const parent = document.createElement("div");
  parent.classList.add("booking-pkg");
  parent.innerHTML = `<div class="pkg-name">${data.place}</div>
                      <div class="dep-data">${data.departure_date}</div>
                      <div class="arr-data">${data.arrival_date}</div>
                      <div class="pkg-status">${data.approved == 1 ? "Approved" : (data.approved == 0 ? "Cancelled" : "Pending")}</div>
                      <div class="pkg-cancel ${data.approved == 2 ? "" : "no-event"}" data-bookingid=${data.bookingid}>Cancel</div>`
  return parent;
}

const bookingCnt = document.querySelector(".bookings");

function updateYourBookings(bookingData){
  bookingCnt.innerHTML = `<div class="booking-pkg-title">
                            <div class="title-name">Package Name</div>
                            <div class="title-dep">Departure Date</div>
                            <div class="title-arr">Arrival Date</div>
                            <div class="title-status">Approval Status</div>
                            <div class="title-cancel">Cancel Booking</div>
                          </div>`
  bookingData.forEach(data => {
    bookingCnt.appendChild(bookingsTemplate(data));
    bookingCnt.lastChild.querySelector(".pkg-cancel").addEventListener("click", cancelBooking);
  });
}

async function cancelBooking(e) {
  if(e.currentTarget.classList.contains("no-event")){
    return;
  }
  const id = e.currentTarget.dataset.bookingid;
  const res = await fetch(endpointPath.booking_delete(id), {
    method: "DELETE"
  });
  console.log(res);
  getYourBookings();
}

// search package
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = searchForm.querySelector("#search-bar").value;
  if(value === ""){
    getPackage();
    return;
  }
  const res = await fetch(endpointPath.pkg_name_get(value), {
    method: 'GET'
  });
  const data = await res.json();
  updatePackage(data);
})

// Update package list

const packageTemplate = (id,name,price,des,imgurl) => {
    const parent = document.createElement("div");
    parent.className = "box package";
    parent.innerHTML = `<img src="${url}/photos/${imgurl}" alt="">
    <div class="content">
        <h3> <i class="fas fa-map-marker-alt"></i> ${name} </h3>
        <p></p>
        <div class="price"> Rs.${price} </div>
        <span class="btn book-btn" data-pkgid=${id} data-name=${name} data-price=${price}>book now</span>
    </div>`
    parent.querySelector("p").innerText = des;
    return parent;
};

async function getPackage(){
    const data=await fetch(endpointPath.pkg_get,{
      method:"GET"
    });
    let res = await data.json();
    updatePackage(res);
}

function updatePackage(data){
    console.log(data);
    const container =  document.querySelector(".box-container")
    container.innerHTML="";
    data.forEach(d => {
      container.appendChild(packageTemplate(d.id,d.place,d.price,d.description,d.image));
      container.lastChild.querySelector(".book-btn").addEventListener("click", (e) => {
        console.log(user.returnAllData().isLogin);
        if(!user.returnAllData().isLogin){
          formBtn.click();
          return;
        }
        floatForm[1].classList.add("active");
        updateBookForm(e.target.dataset);
      })
    });
}

// function to book package
const closeBook = document.querySelector(".book-pkg-close");
const bookForm = document.querySelector(".book-package");
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const bookingData = {}
  bookingData.userid = user.returnAllData().id;
  bookingData.departure_date =bookForm.querySelector(".pkg-dep").valueAsDate.toDateString();
  bookingData.arrival_date =bookForm.querySelector(".pkg-arr").valueAsDate.toDateString();

  const isPresent = await fetch(endpointPath.booking_check, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookingData)
  })
  if(isPresent.status === 409){
    alert("Already booked");
    return;
  }

  bookingData.packageid = bookForm.dataset.id;
  bookingData.booking_date = (new Date()).toDateString(); 
  bookingData.approved = 2;

  const data = await fetch(endpointPath.booking_post,{
    method:"POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData)
  });
  closeBook.click();
  console.log(data);
});

// function to send contact message
const msgBtn = document.querySelector(".msg-btn");
const msgForm = document.querySelector(".msg-form");

msgForm.addEventListener("submit", async (e) => {
  console.log("ehl")
  e.preventDefault();
  const messageData = {};
  messageData.userid = user.returnAllData().id;
  messageData.message = msgForm.querySelector(".msg-content").value;
  messageData.subject = msgForm.querySelector(".msg-subject").value;

  const res = await fetch(endpointPath.msg_post, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify(messageData)
  });

  if(res.status === 200){
    showNotificatio("Message Sent");
    msgForm.querySelector(".msg-content").value = '';
    msgForm.querySelector(".msg-subject").value = '';
  }
})

function showNotificatio(message){
  const notification = document.querySelector(".notification");
  notification.innerText = message;
  notification.classList.remove("none");
  setTimeout(() => {notification.classList.add("none")}, 5000);
}

window.onload = () => {
  getPackage();
}
// Swiper function
var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".brand-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    991: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});