fetch("http://localhost:3000/speakers")
  .then((response) => response.json())
  .then((user) => {
    user.forEach((speaker) => {
      createSpeakerCard(speaker);
    });
  });

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

//adding speaker's id on image
function createSpeakerCard(speaker) {
  const speakersRow = document.querySelector(".speakers-row");

  const speakerContainer = document.createElement("div");
  speakerContainer.setAttribute(
    "class",
    "col-12 col-md-4 mb-4 mt-sm-4 mt-md-0"
  );

  const speakerImageDescriptionContainer = document.createElement("div");
  speakerImageDescriptionContainer.setAttribute(
    "class",
    "speaker-image-container"
  );
  speakerImageDescriptionContainer.setAttribute("speaker-id", speaker.id);

  const speakerLink = document.createElement("a");
  speakerLink.setAttribute("href", "speaker.html");

  const speakerImage = document.createElement("img");
  speakerImage.setAttribute("class", "speakers-imgs cursor-pointer");
  speakerImage.setAttribute("src", speaker.image);
  speakerImage.setAttribute("alt", speaker.category);
  speakerImage.addEventListener("click", () => {
    localStorage.setItem("speakerId", JSON.stringify(speaker.id));
  });

  speakerLink.appendChild(speakerImage);

  speakerImageDescriptionContainer.appendChild(speakerLink);

  const speakerNameCategoryContainer = document.createElement("div");
  speakerNameCategoryContainer.setAttribute("class", "speaker-description");

  speakerImageDescriptionContainer.appendChild(speakerNameCategoryContainer);

  const speakerName = document.createElement("p");
  speakerName.setAttribute("class", "text-uppercase");
  speakerName.innerText = speaker.name;

  const speakerCategory = document.createElement("p");
  speakerCategory.setAttribute("class", "text-uppercase text-pink");
  speakerCategory.innerText = speaker.category;

  speakerNameCategoryContainer.appendChild(speakerName);
  speakerNameCategoryContainer.appendChild(speakerCategory);

  speakerContainer.appendChild(speakerImageDescriptionContainer);

  speakersRow.appendChild(speakerContainer);
}
// function createForm(e) {
//   const speechRow = document.querySelector(".card-row");

//   const formContainer = document.createElement("div");
//   formContainer.setAttribute("class", "mt-3 collapse");
//   formContainer.setAttribute("id", "collapseExample");

//   const form = document.createElement("div");
//   form.setAttribute("class", "row card-body");

//   const formFirstNameContainer = document.createElement("div");
//   formFirstNameContainer.setAttribute("class", "col-md-6");

//   const firstNameInput = document.createElement("input");
//   firstNameInput.setAttribute("type", "text");
//   firstNameInput.setAttribute("class", "form-control");
//   firstNameInput.setAttribute("placeholder", "First name");
//   firstNameInput.setAttribute("aria-label", "First name");

//   formFirstNameContainer.appendChild(firstNameInput);

//   const formLastNameContainer = document.createElement("div");
//   formLastNameContainer.setAttribute("class", "col-md-6");

//   const firstLastNameInput = document.createElement("input");
//   firstLastNameInput.setAttribute("type", "text");
//   firstLastNameInput.setAttribute("class", "form-control");
//   firstLastNameInput.setAttribute("placeholder", "Last name");
//   firstLastNameInput.setAttribute("aria-label", "Last name");

//   formLastNameContainer.appendChild(firstLastNameInput);

//   const submitBtnContainer = document.createElement("div");
//   submitBtnContainer.setAttribute("class", "col-12 mb-3");

//   const submitBtn = document.createElement("button");
//   submitBtn.innerText = "Submit";
//   submitBtn.setAttribute("type", "button");
//   submitBtn.setAttribute("class", "btn btn-primary");

//   submitBtnContainer.appendChild(submitBtn);

//   form.appendChild(formFirstNameContainer);
//   form.appendChild(formLastNameContainer);
//   form.appendChild(submitBtnContainer);

//   formContainer.appendChild(form);

//   speechRow.appendChild(formContainer);
// }
