// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the navbar
var navbar = document.querySelector(".navbar");

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= 100) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

//active navbar
const activeNavbar = document.querySelectorAll(".nav-link");
activeNavbar.forEach((event) => {
  event.addEventListener("click", (e) => {
    const earlyActiveNavBar = document.querySelector(".text-pink");
    console.log(earlyActiveNavBar);
    if (earlyActiveNavBar) {
      earlyActiveNavBar.classList.remove("text-pink");
    }
    e.target.classList.add("text-pink");
  });
});

//active cards from schedule
const activeCard = document.querySelectorAll(".day-card");
activeCard.forEach((event) => {
  event.addEventListener("click", (e) => {
    const earlyActiveCard = document.querySelector(".active");
    if (earlyActiveCard) {
      earlyActiveCard.classList.remove("active");
    }
    event.classList.add("active");
  });
});
