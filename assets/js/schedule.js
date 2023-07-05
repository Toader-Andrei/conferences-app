// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the navbar
const navbar = document.querySelector(".navbar");

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

//event on a specific date
window.addEventListener("DOMContentLoaded", (e) => {
  fetch("http://localhost:3000/speeches?date=" + "28 July 2023")
    .then((response) => response.json())
    .then((speech) => {
      speech.forEach((event) => {
        createSpeechesCard(event);
      });
    });
  const monday = document.querySelector(".right-container");
  monday.addEventListener("click", (event) => {
    const speeches = document.querySelector(".speeches-container");
    speeches.innerText = "";
    event.preventDefault();
    fetch("http://localhost:3000/speeches?date=" + "28 July 2023")
      .then((response) => response.json())
      .then((speech) => {
        speech.forEach((event) => {
          createSpeechesCard(event);
        });
      });
  });
});
const tueday = document.querySelector(".middle-container");
tueday.addEventListener("click", () => {
  const speeches = document.querySelector(".speeches-container");
  speeches.innerText = "";
  fetch("http://localhost:3000/speeches?date=" + "29 July 2023")
    .then((response) => response.json())
    .then((speech) => {
      speech.forEach((event) => {
        createSpeechesCard(event);
      });
    });
});

const wednesday = document.querySelector(".left-container");
wednesday.addEventListener("click", () => {
  const speeches = document.querySelector(".speeches-container");
  speeches.innerText = "";
  fetch("http://localhost:3000/speeches?date=" + "30 July 2023")
    .then((response) => response.json())
    .then((speech) => {
      speech.forEach((event) => {
        createSpeechesCard(event);
      });
    });
});

// adding speeches
function createSpeechesCard(speech) {
  const scheduleContainer = document.querySelector(".speeches-container");

  const speechContainer = document.createElement("div");
  speechContainer.setAttribute("class", "conferences-container mb-4");

  const speechRow = document.createElement("div");
  speechRow.setAttribute("class", "row align-items-center pt-4 card-row");

  const speechCard = document.createElement("div");
  speechCard.setAttribute("class", "conferences-card container text-white");

  speechCard.appendChild(speechRow);

  const speechImageContainer = document.createElement("div");
  speechImageContainer.setAttribute(
    "class",
    "conference-img text-center col-sm-12 col-md-2 col-lg-2 col-xl-1"
  );

  const speakerImage = document.createElement("img");
  speakerImage.setAttribute("class", "conference-imgs");
  speakerImage.setAttribute("alt", "conference-img");
  speakerImage.setAttribute("src", speech.image);

  speechImageContainer.appendChild(speakerImage);

  const speechesDescriptionContainer = document.createElement("div");
  speechesDescriptionContainer.setAttribute(
    "class",
    "conference-topic col-sm-12 col-md-10 col-lg-10 col-xl-5"
  );

  const speechHeading = document.createElement("h2");
  speechHeading.innerText = speech.title;

  speechesDescriptionContainer.appendChild(speechHeading);

  const speechDetails = document.createElement("p");
  speechDetails.setAttribute("class", "mb-0");
  speechDetails.innerText =
    "by " + speech.speakerName + " / CEO of " + speech.owner;

  speechesDescriptionContainer.appendChild(speechDetails);

  const speechDateAndLocationContainer = document.createElement("div");
  speechDateAndLocationContainer.setAttribute(
    "class",
    "conference-details col-sm-8 col-lg-8 col-xl-4"
  );

  const speechDateContainer = document.createElement("div");

  const speechIconDate = document.createElement("i");
  speechIconDate.setAttribute("class", "fa-regular fa-clock");

  const speechDate = document.createElement("span");
  speechDate.innerText = " " + speech.date;

  speechDateContainer.appendChild(speechIconDate);
  speechDateContainer.appendChild(speechDate);
  speechDateAndLocationContainer.appendChild(speechDateContainer);

  const speechLocationContainer = document.createElement("div");

  const speechIconLocation = document.createElement("i");
  speechIconLocation.setAttribute("class", "fa-regular fa-map");

  const speechLocation = document.createElement("span");
  speechLocation.innerText = " " + speech.location;

  speechLocationContainer.appendChild(speechIconLocation);
  speechLocationContainer.appendChild(speechLocation);
  speechDateAndLocationContainer.appendChild(speechLocationContainer);

  const speechBtnContainer = document.createElement("div");
  speechBtnContainer.setAttribute(
    "class",
    "conference-btn col-sm-4 col-lg-4 col-xl-2 mt-2 mt-md-1 mt-lg-0"
  );

  const speechBtn = document.createElement("button");
  speechBtn.setAttribute("class", "btn btn-primary collapsed");
  speechBtn.setAttribute("type", "button");
  speechBtn.setAttribute("data-bs-toggle", "collapse");
  speechBtn.setAttribute("data-bs-target", "#collapseExample");
  speechBtn.setAttribute("aria-expended", "false");
  speechBtn.setAttribute("aria-controls", "collapseExample");
  speechBtn.innerText = "Participate";

  const formContainer = document.createElement("div");
  formContainer.setAttribute("class", "mt-3 collapse");
  formContainer.setAttribute("id", "collapseExample");

  const form = document.createElement("div");
  form.setAttribute("class", "row g-3 form card card-body");

  const formFirstNameContainer = document.createElement("div");
  formFirstNameContainer.setAttribute("class", "col-md-6");

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("type", "text");
  firstNameInput.setAttribute("class", "form-control");
  firstNameInput.setAttribute("placeholder", "First name");
  firstNameInput.setAttribute("aria-label", "First name");

  formFirstNameContainer.appendChild(firstNameInput);

  const formLastNameContainer = document.createElement("div");
  formLastNameContainer.setAttribute("class", "col-md-6");

  const firstLastNameInput = document.createElement("input");
  firstLastNameInput.setAttribute("type", "text");
  firstLastNameInput.setAttribute("class", "form-control");
  firstLastNameInput.setAttribute("placeholder", "Last name");
  firstLastNameInput.setAttribute("aria-label", "Last name");

  formLastNameContainer.appendChild(firstLastNameInput);

  const submitBtnContainer = document.createElement("div");
  submitBtnContainer.setAttribute("class", "col-12 mb-3");

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.setAttribute("type", "button");
  submitBtn.setAttribute("class", "btn btn-primary");

  submitBtnContainer.appendChild(submitBtn);

  form.appendChild(formFirstNameContainer);
  form.appendChild(formLastNameContainer);
  form.appendChild(submitBtnContainer);

  formContainer.appendChild(form);

  speechRow.appendChild(formContainer);

  const myCollapsible = document.querySelectorAll(".collapsed");
  myCollapsible.forEach((e) => {
    // console.log(e.target);
  });

  const speechBtnIcon = document.createElement("i");
  speechBtnIcon.setAttribute("class", "fa-solid fa-arrow-right-long");

  speechBtn.appendChild(speechBtnIcon);
  speechBtnContainer.appendChild(speechBtn);

  speechRow.appendChild(speechImageContainer);
  speechRow.appendChild(speechesDescriptionContainer);
  speechRow.appendChild(speechDateAndLocationContainer);
  speechRow.appendChild(speechBtnContainer);

  speechContainer.appendChild(speechCard);

  scheduleContainer.appendChild(speechContainer);
}