const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}
console.log(user);

const speakerId = JSON.parse(localStorage.getItem("speakerId"));

fetch("http://localhost:3000/speakers/" + speakerId)
  .then((response) => response.json())
  .then((speaker) => {
    createSpeakerPage(speaker);
  });

function clearForm() {
  const form = document.querySelector(".form");
  form.reset();
}

function createSpeakerPage(speaker) {
  const speakerName = document.querySelector(".speaker-name");
  speakerName.innerText = speaker.name;

  const speakerCategory = document.querySelector(".speaker-category");
  speakerCategory.innerText = speaker.category;

  const speakerImage = document.querySelector(".speaker-image");
  speakerImage.setAttribute("src", speaker.image);

  const authorContainer = document.querySelector(".post-author-avatar");

  const authorAvatar = document.createElement("img");
  authorAvatar.setAttribute("src", speaker.image);
  authorAvatar.setAttribute("class", "avatar");

  authorContainer.appendChild(authorAvatar);

  const authorContentContainer = document.querySelector(".post-author-content");

  const authorContentHeading = document.createElement("h5");
  authorContentHeading.setAttribute("class", "mt-2");
  authorContentHeading.innerText = speaker.name;

  const authorContentCategory = document.createElement("h5");
  authorContentCategory.setAttribute("class", "text-pink");
  authorContentCategory.innerText = speaker.category;

  const authorContentMindSet = document.createElement("h6");
  authorContentMindSet.setAttribute("class", "my-2 text-secondary");
  authorContentMindSet.innerText = speaker.mindSet;

  authorContentContainer.appendChild(authorContentHeading);
  authorContentContainer.appendChild(authorContentCategory);
  authorContentContainer.appendChild(authorContentMindSet);

  const title = document.querySelector(".title");
  title.innerText = speaker.title;

  const date = document.querySelector(".date");
  date.innerText = speaker.date;

  const name = document.querySelector(".name");
  name.innerText = speaker.name;

  const location = document.querySelector(".location");
  location.innerText = speaker.location;

  fetch("http://localhost:3000/comments?postId=" + speakerId)
    .then((response) => response.json())
    .then((comments) => {
      comments.forEach((comment) => {
        createComment(comment);
      });
      const commentsContainer = document.querySelector(".comments");

      const commentCounter = document.querySelector(".comments-counter");
      console.log(commentCounter, comments);

      commentCounter.innerText = comments.length || 0;

      if (commentsContainer.length === 0) {
        const emptyCommentsContainer = document.createElement("div");
        emptyCommentsContainer.classList.add("no-comments-warning");

        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("text-center");
        emptyMessage.innerText = "No comments!";

        emptyCommentsContainer.appendChild(emptyMessage);
        commentSection.appendChild(emptyCommentsContainer);
      }
    });
}

function clearForm() {
  const form = document.querySelector(".form");
  form.reset();
}

function createComment(comment) {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // adding first name and last name
    });
  const commentSection = document.querySelector(".comments");

  const commentContainer = document.createElement("div");
  commentContainer.setAttribute(
    "class",
    "d-flex aling-content-center m-4 border-radius p-2 bg-light shadow comment-container"
  );
  commentContainer.setAttribute("data-id", comment.id);

  const profile = document.createElement("div");
  profile.setAttribute(
    "class",
    "profile-img-name text-center m-2 max-witdh-150"
  );

  const commentImage = document.createElement("img");
  commentImage.setAttribute("src", "assets/imgs/avatar.jpg");
  commentImage.setAttribute("class", "comment-image");

  const commentTextContainer = document.createElement("div");
  commentTextContainer.setAttribute(
    "class",
    "d-flex align-items-center flex-grow-1 m-2"
  );

  const commentNameContainer = document.createElement("div");
  commentNameContainer.setAttribute("class", "actualComment");

  const commentName = document.createElement("h5");
  commentName.classList.add("m-0");
  commentName.innerText = comment.firstname + " " + comment.lastname;

  profile.appendChild(commentImage);
  profile.appendChild(commentName);

  const commentDescription = document.createElement("p");
  commentDescription.setAttribute("class", "fs-5");
  commentDescription.innerText = comment.comment;

  commentNameContainer.appendChild(commentDescription);

  const commentDate = document.createElement("p");
  commentDate.setAttribute("class", "text-secondary");
  commentDate.innerText = comment.time;

  commentNameContainer.appendChild(commentDate);

  const iconsContainer = document.createElement("div");
  iconsContainer.setAttribute("class", "align-self-center text-center");

  const clearBtn = document.createElement("i");
  clearBtn.setAttribute(
    "class",
    "fa-solid fa-trash align-self-center m-4 fs-4"
  );

  clearBtn.setAttribute("data-id", comment.id);

  clearBtn.addEventListener("click", () => {
    const commentId = document.querySelector(
      '.fa-trash[data-id="' + comment.id + '"]'
    );

    fetch("http://localhost:3000/comments/" + comment.id, {
      method: "DELETE",
    }).then(() => {
      commentContainer.remove(commentId);
      const comments = document.querySelectorAll(".comment-container");

      if (comments.length === 0) {
        const emptyCommentsContainer = document.createElement("div");
        emptyCommentsContainer.classList.add("no-comments-warning");

        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("text-center");
        emptyMessage.innerText = "No comments!";

        emptyCommentsContainer.appendChild(emptyMessage);
        commentSection.appendChild(emptyCommentsContainer);
      }
      document.querySelector(".comments-counter").innerText =
        +document.querySelector(".comments-counter").innerText - 1;
    });
  });

  commentContainer.appendChild(profile);
  commentTextContainer.appendChild(commentNameContainer);
  commentContainer.appendChild(commentTextContainer);

  iconsContainer.appendChild(clearBtn);

  commentContainer.appendChild(iconsContainer);

  commentSection.appendChild(commentContainer);
}

const commentsContainer = document.querySelector(".comments");

const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const comment = document.querySelector(".comments-input").value;
  const date = new Date().toLocaleDateString("ro-RO");

  const validation = document.createElement("p");
  validation.classList.add("text-danger", "fs-5", "validation-message");
  validation.innerText =
    "Do you want to remain anonymous? then leave this site, here is no place for people like you! Try Tor Browser :)";

  const validationsLocation = document.querySelector(".validations");

  if (comment === "") {
    validationsLocation.appendChild(validation);
    if (validation) {
      const validationMessage = document.querySelector(".validation-message");
      validationMessage.remove();
      validationsLocation.appendChild(validation);
    }
  } else {
    const validationMessage = document.querySelector(".validation-message");
    if (validationMessage) {
      validationMessage.remove();
    }
    fetch("http://localhost:3000/comments", {
      method: "POST",
      body: JSON.stringify({
        comment: comment,
        postId: speakerId,
        time: date,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((comment) => {
        const warningMessageContainer = document.querySelector(
          ".no-comments-warning"
        );
        if (warningMessageContainer) {
          warningMessageContainer.remove();
        }
        createComment(comment);
        document.querySelector(".comments-counter").innerText =
          +document.querySelector(".comments-counter").innerText + 1;
      });
  }

  clearForm();
});
