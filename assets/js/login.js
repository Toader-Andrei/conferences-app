function createValidation() {
  const labelsContainer = document.querySelectorAll(".form-validation");
  console.log(labelsContainer);

  const warningMessageContainer = document.createElement("div");
  const warningMessage = document.createElement("p");
  warningMessage.innerText = "Please fill up the gap!";

  warningMessageContainer.appendChild(warningMessage);

  labelsContainer.forEach((e) => {
    console.log(e);
    const warningMessageContainer = document.createElement("div");
    const warningMessage = document.createElement("p");
    warningMessage.innerText = "Please fill up the gap!";

    warningMessageContainer.appendChild(warningMessage);
    e.appendChild(warningMessageContainer);
  });
}

function onLoginClick(event) {
  event.preventDefault();
  const emailValue = document.querySelector(".email").value;
  const passwordValue = document.querySelector(".password").value;

  fetch("http://localhost:3000/users?email=" + emailValue)
    .then((response) => response.json())
    .then((users) => {
      if (users.length > 0) {
        if (users[0].password == passwordValue) {
          localStorage.setItem("user", JSON.stringify(users[0]));
          location.href = "index.html";
        } else {
          const passwordContainer = document.querySelector(".form-password");
          const password = document.querySelector(".password");
          password.classList.add("border-danger");

          const warningMessageContainer = document.createElement("div");
          const warningMessage = document.createElement("p");
          warningMessage.innerText = "Please fill up the gap!";

          warningMessageContainer.appendChild(warningMessage);

          passwordContainer.appendChild(warningMessageContainer);
        }
      } else {
        const email = document.querySelector(".email");
        email.classList.add("border-danger");

        const password = document.querySelector(".password");
        password.classList.add("border-danger");

        createValidation();
      }
    });
}
