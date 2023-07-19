function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function clearValidation() {
  document.querySelectorAll("input").forEach((input) => {
    const error = input.parentElement.querySelector(".error");
    if (error) {
      input.parentElement.querySelector(".error").remove();
      input.classList.remove("border", "border-danger");
    }
  });
}

function addValidation() {
  document.querySelectorAll("input").forEach((input) => {
    if (!input.value) {
      const parent = input.parentElement;
      const span = document.createElement("span");
      span.classList.add("error");
      span.innerText = "Please fill out the " + input.name + " field";
      input.classList.add("border", "border-danger");
      parent.appendChild(span);
    } else {
      if (input.name === "email") {
        if (!validateEmail(input.value)) {
          const parent = input.parentElement;
          const span = document.createElement("span");
          span.classList.add("error");
          span.innerText = "Please provide a valid email!";
          input.classList.add("border", "border-danger");
          parent.appendChild(span);
        }
      }
      if (input.name === "password") {
        if (input.value.length < 6) {
          const parent = input.parentElement;
          const span = document.createElement("span");
          span.classList.add("error");
          span.innerText =
            "Please provide a valid password longer than 6 characters!";
          input.classList.add("border", "border-danger");
          parent.appendChild(span);
        }
      }
    }
  });
}

function isFormValid() {
  const errors = document.querySelectorAll(".error");
  if (errors.length === 0) {
    return true;
  } else {
    return false;
  }
}

function onLoginClick(event) {
  event.preventDefault();
  const emailValue = document.querySelector(".email").value;
  const passwordValue = document.querySelector(".password").value;

  clearValidation();
  addValidation();

  if (isFormValid()) {
    fetch("http://localhost:3000/users?email=" + emailValue)
      .then((response) => response.json())
      .then((users) => {
        if (users.length > 0) {
          if (users[0].password !== passwordValue) {
            const input = document.querySelector(".password");
            const parent = input.parentElement;
            const span = document.createElement("span");
            span.classList.add("error");
            span.innerText = "Please provide a valid password!";
            input.classList.add("border", "border-danger");
            parent.appendChild(span);
          } else {
            localStorage.setItem("user", JSON.stringify(users[0]));
            location.href = "index.html";
          }
        } else {
          const input = document.querySelector(".email");
          const parent = input.parentElement;
          const span = document.createElement("span");
          span.classList.add("error");
          span.innerText = "There is no user associated with this email!";
          input.classList.add("border", "border-danger");
          parent.appendChild(span);
        }
      });
  }
}
