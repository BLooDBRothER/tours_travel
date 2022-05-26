const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('.search-bar-container');
const formBtn = document.querySelector('#login-btn');
const floatForm = document.querySelectorAll('.float-form-container');
const formClose = document.querySelectorAll('#form-close');
const menu = document.querySelector('#menu-bar');
const navbar = document.querySelector('.navbar');
const imgBtn = document.querySelectorAll('.img-btn');
const formChangeBtn = document.querySelectorAll(".change-link");
const bookPackageBtn = document.querySelectorAll(".book-btn")

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

bookPackageBtn.forEach(bookBtn => {
  bookBtn.addEventListener("click", (e) => {
    floatForm[1].classList.add("active");
    updateBookForm(e.target.dataset);
  });
});

function updateBookForm(packageData) {
  floatForm[1].querySelector(".pkg-name").value = packageData.name;
  floatForm[1].querySelector(".pkg-price").value = packageData.price;
  floatForm[1].querySelector(".btn").dataset.id = packageData.id;
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