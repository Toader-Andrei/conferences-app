const speakerId = JSON.parse(localStorage.getItem("speakerId"));
console.log(speakerId);

fetch("http://localhost:3000/speakers/" + speakerId)
  .then((response) => response.json())
  .then((speaker) => {
    createSpeakerPage(speaker);
  });

function createSpeakerPage(speaker) {
  const speakerName = document.querySelector(".speaker-name");
  speakerName.innerText = speaker.name;

  const speakerCategory = document.querySelector(".speaker-category");
  speakerCategory.innerText = speaker.category;

  const speakerImage = document.querySelector(".speaker-image");
  speakerImage.setAttribute("src", speaker.image);
}
