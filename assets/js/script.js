const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}

const userName = document.querySelector(".user-name");
userName.innerText = user.firstName + " " + user.lastName;

fetch("http://localhost:3000/speakers")
  .then((response) => response.json())
  .then((user) => {
    user.forEach((speaker) => {
      createSpeakerCard(speaker);
    });
  });

function onLogoutClick(event) {
  event.preventDefault();
  localStorage.clear();
  location.href = "login.html";
}

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
