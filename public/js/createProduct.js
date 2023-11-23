const validations = [
  {
    field: "name",
    check: (input) => input.value != "",
    message: "El campo no debe estar vacío",
  },
];

validations.forEach((validation) => {
  const inputId = validation.field;
  const input = document.getElementById(inputId);
  const inputErrorMessage = document.getElementById(inputId + "Error");

  function validate() {
    console.log("input", input.value);
    imputValidation(validation, input, inputErrorMessage);
  }

  input.addEventListener("blur", validate);
  input.addEventListener("input", validate);
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

function imputValidation(validation, input, inputErrorMessage) {
  if (!input.value) {
    inputErrorMessage.innerText = "El campo no debe estar vacío";
    inputErrorMessage.classList.add("display");
  }

  if (!validation.check(input)) {
    inputErrorMessage.innerText = validation.message;
    inputErrorMessage.classList.add("display");
  }
}
