const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name");
  const nameValue = name.value;
  if (nameValue != "") {
  } else {
    console.log("error");
  }
});
