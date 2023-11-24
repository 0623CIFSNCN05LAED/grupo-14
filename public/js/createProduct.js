const validations = [
  {
    field: "name",
    check: (input) => input.value != "",
    message: "Debes completar el campo de nombre",
  },
  {
    field: "shortName",
    check: (input) => input.value != "",
    message: "Debes completar el campo de nombre abreviado",
  },
  {
    field: "brand_id",
    check: (input) => input.value != "",
    message: "Debes completar el campo de marca",
  },
  {
    field: "retailPrice",
    check: (input) => input.value != "",
    message: "Debes completar el campo de precio minorista",
  },
  {
    field: "discount",
    check: (input) => input.value != "",
    message: "Debes completar el campo de descuento",
  },
  {
    field: "wholesalePrice",
    check: (input) => input.value != "",
    message: "Debes completar el campo de precio mayorista",
  },
  {
    field: "stock",
    check: (input) => input.value != "",
    message: "Debes completar el campo de stock",
  },
  {
    field: "category_id",
    check: (input) => input.value != "",
    message: "Debes seleccionar una categoria",
  },
  {
    field: "image",
    check: (input) => input.files && input.files.length > 0,
    message: "Debes subir una imagen",
  },
  {
    field: "description",
    check: (input) => input.value != "",
    message: "Debes completar el campo de descripicion",
  },
];

validations.forEach((validation) => {
  const inputId = validation.field;
  const input = document.getElementById(inputId);
  const inputErrorMessage = document.getElementById(inputId + "Error");

  function validate() {
    console.log("input", input.value);
    inputValidation(validation, input, inputErrorMessage);
  }

  input.addEventListener("blur", validate);
  input.addEventListener("input", validate);
});

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const validationsResult = [];

  validations.forEach((validation) => {
    const inputId = validation.field;
    const input = document.getElementById(inputId);
    const inputErrorMessage = document.getElementById(inputId + "Error");
    const result = inputValidation(validation, input, inputErrorMessage);
    validationsResult.push(result);
  });
  if (validationsResult.every((val = (val) => val == true))) {
    form.submit();
  }
});

function inputValidation(validation, input, inputErrorMessage) {
  /* if (!input.value) {
    inputErrorMessage.innerText = "El campo no debe estar vacío";
    inputErrorMessage.classList.add("display");
    return false;
  }
 */
  if (!validation.check(input)) {
    inputErrorMessage.innerText = validation.message;
    inputErrorMessage.classList.add("display");
    return false;
  }

  inputErrorMessage.innerText = "";
  inputErrorMessage.classList.remove("display");
  return true;
}
