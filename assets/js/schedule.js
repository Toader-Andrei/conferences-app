window.addEventListener("DOMContentLoaded", (e) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
  }

  const userName = document.querySelector(".user-name");
  userName.innerText = user.firstName + " " + user.lastName;

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

function onLogoutClick(event) {
  event.preventDefault();
  localStorage.clear();
  location.href = "login.html";
}

function createSpeechCard(speech) {
  const user = JSON.parse(localStorage.getItem("user"));

  fetch("http://localhost:3000/speeches/" + speech.id)
    .then((response) => response.json())
    .then((speech) => {
      if (speech.participants.includes(user.id)) {
        const participanting = document.querySelector(".btn-" + speech.id);
        participanting.setAttribute("class", "btn btn-success cursor");
        participanting.innerText = "Joined";
        participanting.removeAttribute("data-bs-toggle");
      }
    });

  const scheduleContainer = document.querySelector(".speeches-container");

  const speechContainer = document.createElement("div");
  speechContainer.setAttribute("class", "conferences-container mb-4");

  const speechRow = document.createElement("div");
  speechRow.setAttribute("class", "row align-items-center py-4 card-row");

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
  speechDetails.innerText = "by " + speech.speakerName;

  speechesDescriptionContainer.appendChild(speechDetails);

  const iconGroup = document.createElement("i");
  iconGroup.setAttribute("class", "fa-solid fa-people-group");

  speechesDescriptionContainer.appendChild(iconGroup);

  const peopleComming = document.createElement("span");
  peopleComming.setAttribute("class", "m-1 people");
  peopleComming.innerText = speech.participants.length + " seat(s)";

  speechesDescriptionContainer.appendChild(peopleComming);

  if (speech.participants.length >= 2 && speech.participants.length <= 9) {
    const warningMessage = document.createElement("h5");
    warningMessage.classList.add(".warning");
    warningMessage.innerText =
      "Hurry up, only a few seats left for this speech!";

    speechesDescriptionContainer.appendChild(warningMessage);
  } else if (speech.participants.length === 10) {
    const warningMessage = document.createElement("h5");
    warningMessage.innerText = "All seats have been reserved!";

    speechesDescriptionContainer.appendChild(warningMessage);
  }

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
  speechBtn.setAttribute(
    "class",
    "btn btn-primary collapsed speechBtn btn-" + speech.id
  );
  speechBtn.setAttribute("type", "button");
  speechBtn.setAttribute("data-bs-toggle", "collapse");
  speechBtn.setAttribute("data-bs-target", "#collapseExample-" + speech.id);
  speechBtn.setAttribute("aria-expended", "false");
  speechBtn.setAttribute("aria-controls", "collapseExample");
  speechBtn.innerText = "Check in ";

  const formContainer = document.createElement("div");
  formContainer.setAttribute("class", "mt-3 collapse");
  formContainer.setAttribute("id", "collapseExample-" + speech.id);

  const form = document.createElement("div");
  form.setAttribute("class", "row statement border-0 text-center");

  const submitBtnContainer = document.createElement("div");
  submitBtnContainer.setAttribute("class", "col-12 mb-3");

  const headingSpeech = document.createElement("h5");
  headingSpeech.innerText = "Are you sure?";

  submitBtnContainer.appendChild(headingSpeech);

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Yes";
  submitBtn.setAttribute("type", "button");
  submitBtn.setAttribute("class", "btn btn-primary collapsed me-3");
  submitBtn.setAttribute("data-bs-toggle", "collapse");
  submitBtn.setAttribute("data-bs-target", "#collapseExample-" + speech.id);
  submitBtn.setAttribute("aria-expended", "false");
  submitBtn.setAttribute("aria-controls", "collapseExample");

  submitBtnContainer.appendChild(submitBtn);

  const noBtn = document.createElement("button");
  noBtn.innerText = "No";
  noBtn.setAttribute("type", "button");
  noBtn.setAttribute("class", "btn btn-primary collapsed");
  noBtn.setAttribute("data-bs-toggle", "collapse");
  noBtn.setAttribute("data-bs-target", "#collapseExample-" + speech.id);
  noBtn.setAttribute("aria-expended", "false");
  noBtn.setAttribute("aria-controls", "collapseExample");

  submitBtnContainer.appendChild(noBtn);

  submitBtn.addEventListener("click", () => {
    const participateBtn = speechBtn;
    participateBtn.innerText = "Joined";
    speechBtn.removeAttribute("data-bs-toggle");
    speechBtn.setAttribute("class", "btn btn-success cursor");

    const user = JSON.parse(localStorage.getItem("user"));

    const participants = speech.participants || [];
    participants.push(user.id);

    fetch("http://localhost:3000/speeches/" + speech.id, {
      method: "PATCH",
      body: JSON.stringify({ participants: participants }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        const participantsComming = document.querySelector(".people");
        participantsComming.innerText = participants.length + " seat(s)";
      });
  });

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
