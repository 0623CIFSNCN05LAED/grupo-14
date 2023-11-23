const validations = [
  {
    field: "name",
    validation: () => true,
    message: "mensaje de validación",
  },
];

validations.forEach((validation) => {
  const inputId = validation.field;
  const input = document.getElementById(imputId);
  const inputErrorMessage = document.getElementById(inputId + "Error");
});

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
