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
  const emailValue = document.querySelector(".email").value;
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
        fetch("http://localhost:3000/users?email=" + emailValue)
          .then((response) => response.json())
          .then((user) => {
            if (input.value === user.password)
              fetch("http://localhost:3000/users?email=" + emailValue)
                .then((response) => response.json())
                .then((users) => {
                  if (users.length > 0) {
                    if (users[0].password === passwordValue) {
                      const parent = input.parentElement;
                      const span = document.createElement("span");
                      span.classList.add("error");
                      span.innerText = "Please provide a valid email!";
                      input.classList.add("border", "border-danger");
                      parent.appendChild(span);
                    }
                  }
                });
          });
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

function onLoginClick(event) {
  event.preventDefault();
  const emailValue = document.querySelector(".email").value;
  const passwordValue = document.querySelector(".password").value;

  clearValidation();
  addValidation();

  if (isFormValid()) {
    console.log("merge");
    fetch("http://localhost:3000/users?email=" + emailValue)
      .then((response) => response.json())
      .then((users) => {
        if (users.length > 0) {
          const parent =
            document.querySelector("#password-value").parentElement;
          const span = document.createElement("span");
          span.classList.add("error");
          span.innerText = "Please enter a valid password!";
          document
            .querySelector("#password-value")
            .classList.add("border", "border-danger");
          parent.appendChild(span);
          if (users[0].password === passwordValue) {
            localStorage.setItem("user", JSON.stringify(users[0]));
            location.href = "index.html";
          }
        }
      });
  }
}
