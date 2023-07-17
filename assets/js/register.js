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
        } else {
          fetch("http://localhost:3000/users?email=" + input.value)
            .then((response) => response.json())
            .then((users) => {
              if (users.length > 0) {
                const input = document.querySelector("#email-value");
                const parent = input.parentElement;
                const span = document.createElement("span");
                span.classList.add("error");
                span.innerText = "This email already exists!";
                input.classList.add("border", "border-danger");
                parent.appendChild(span);
              }
            });
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
  console.log(errors);
  if (errors.length === 0) {
    return true;
  } else {
    return false;
  }
}

function onRegisterClick(event) {
  event.preventDefault();
  const email = document.querySelector("#email-value").value;
  const firstName = document.querySelector("#firstName-value").value;
  const lastName = document.querySelector("#lastName-value").value;
  const password = document.querySelector("#password-value").value;

  clearValidation();
  addValidation();

  if (isFormValid()) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        avatar: "assets/imgs/avatar.jpg",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        location.href = "index.html";
      });
  }
}
