function onRegisterClick(event) {
  event.preventDefault();
  const firstName = document.querySelector(".firstName-value").value;
  const lastName = document.querySelector(".lastName-value").value;
  const email = document.querySelector(".email-value").value;
  const password = document.querySelector(".password-value").value;

  if (true) {
    // validare + fetch de get
    fetch("http://localhost:3000/users?email=" + email)
      .then((response) => response.json())
      .then((users) => {
        if (users.length > 0) {
          console.log(users);
          // variabila de validare
        }
      });
  } else {
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
