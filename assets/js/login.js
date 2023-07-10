function onLoginClick(event) {
  event.preventDefault();
  const email = document.querySelector(".email-value").value;
  const password = document.querySelector(".password-value").value;
  console.log(password);
  fetch("http://localhost:3000/users?email=" + email)
    .then((response) => response.json())
    .then((users) => {
      if (users.length > 0) {
        if (users[0].password == password) {
          localStorage.setItem("user", JSON.stringify(users[0]));
          location.href = "index.html";
        }
        console.log(users);
      } else {
        //validare
      }
    });
}
