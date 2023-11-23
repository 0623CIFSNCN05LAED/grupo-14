const validations = [
  {
    field: "name",
    check: (input) => input.value != "",
    message: "El campo no debe estar vacío",
  },
  {
    field: "shortName",
    check: (input) => input.value != "",
    message: "El campo no debe estar vacío",
  },
  {
    field: "brand_id",
    check: (input) => input.value != "",
    message: "El campo no debe estar vacío",
  },
  {
    field: "retailPrice",
    check: (input) => input.value != "",
    message: "El campo no debe estar vacío",
  },
  {
    field: "discount",
    check: (input) => input.value != "",
    message: "El campo no debe estar vacío",
  },
  {
    field: "wholesalePrice",
    check: (input) => input.value != "",
    message: "El campo no debe estar vacío",
  },
  {
    field: "stock",
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
});

function imputValidation(validation, input, inputErrorMessage) {
  if (!input.value) {
    inputErrorMessage.innerText = "El campo no debe estar vacío";
    inputErrorMessage.classList.add("display");
    return;
  }

  if (!validation.check(input)) {
    inputErrorMessage.innerText = validation.message;
    inputErrorMessage.classList.add("display");
    return;
  }

  inputErrorMessage.innerText = "";
  inputErrorMessage.classList.remove("display");
  return;
}
