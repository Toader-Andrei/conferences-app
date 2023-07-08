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
        createSpeechCard(event);
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
          createSpeechCard(event);
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
        createSpeechCard(event);
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
        createSpeechCard(event);
      });
    });
});

function createSpeechCard(speech) {
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
  // collapse
  const speechBtn = document.createElement("button");
  speechBtn.setAttribute("class", "btn btn-primary collapsed " + speech.id);
  speechBtn.setAttribute("type", "button");
  speechBtn.setAttribute("data-bs-toggle", "collapse");
  speechBtn.setAttribute("data-bs-target", "#collapseExample-" + speech.id);
  speechBtn.setAttribute("aria-expended", "false");
  speechBtn.setAttribute("aria-controls", "collapseExample");
  speechBtn.innerText = "Participate";

  const formContainer = document.createElement("div");
  formContainer.setAttribute("class", "mt-3 collapse");
  formContainer.setAttribute("id", "collapseExample-" + speech.id);

  const form = document.createElement("div");
  form.setAttribute("class", "row statement border-0");

  const formFirstNameContainer = document.createElement("div");
  formFirstNameContainer.setAttribute("class", "col-md-5");

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("type", "text");
  firstNameInput.setAttribute("class", "form-control first-name");
  firstNameInput.setAttribute("placeholder", "First name");
  firstNameInput.setAttribute("aria-label", "First name");

  formFirstNameContainer.appendChild(firstNameInput);

  const formLastNameContainer = document.createElement("div");
  formLastNameContainer.setAttribute("class", "col-md-5");

  const LastNameInput = document.createElement("input");
  LastNameInput.setAttribute("type", "text");
  LastNameInput.setAttribute("class", "form-control last-name");
  LastNameInput.setAttribute("placeholder", "Last name");
  LastNameInput.setAttribute("aria-label", "Last name");

  formLastNameContainer.appendChild(LastNameInput);

  const submitBtnContainer = document.createElement("div");
  submitBtnContainer.setAttribute("class", "col-md-2 mb-3");

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.setAttribute("type", "button");
  submitBtn.setAttribute("class", "btn btn-primary collapsed");
  submitBtn.setAttribute("data-bs-toggle", "collapse");
  submitBtn.setAttribute("data-bs-target", "#collapseExample-" + speech.id);
  submitBtn.setAttribute("aria-expended", "false");
  submitBtn.setAttribute("aria-controls", "collapseExample");

  submitBtnContainer.appendChild(submitBtn);

  submitBtn.addEventListener("click", () => {
    const participateBtn = speechBtn;
    participateBtn.innerText = "Going";
    speechBtn.removeAttribute("data-bs-toggle");
    speechBtn.setAttribute("class", "btn btn-primary cursor");

    const firstName = document.querySelector(".first-name").value;
    const lastName = document.querySelector(".last-name").value;
    console.log(firstName, lastName);

    const participant = {
      firstName: firstName,
      lastName: lastName,
      speech: speech.id,
    };

    localStorage.setItem("participant", JSON.stringify(participant));
  });

  form.appendChild(formFirstNameContainer);
  form.appendChild(formLastNameContainer);
  form.appendChild(submitBtnContainer);

  formContainer.appendChild(form);

  speechCard.appendChild(formContainer);

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
