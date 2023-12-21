const validations = [
  {
    field: "name",
    checks: [
      {
        check: (input) => input.value.trim() !== "",
        message: "Debes completar el campo de nombre",
      },
      {
        check: (input) => input.value.length >= 5,
        message: "El nombre debe tener al menos 5 caracteres",
      },
    ],
  },
  {
    field: "shortName",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo de nombre abreviado",
  },
  {
    field: "brand_id",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo de marca",
  },
  {
    field: "retailPrice",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo de precio minorista",
  },
  {
    field: "discountCf",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo de descuento minorista",
  },
  {
    field: "discountM",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo de descuento mayorista",
  },
  {
    field: "wholesalePrice",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo de precio mayorista",
  },

  {
    field: "stock",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo de stock",
  },
  {
    field: "category_id",
    check: (input) => input.value.trim() !== "",
    message: "Debes seleccionar una categoria",
  },
  {
    field: "image",
    check: (input) => input.files && input.files.length > 0,
    message: "Debes subir una imagen",
  },
  {
    field: "description",
    checks: [
      {
        check: (input) => input.value.trim() !== "",
        message: "Debes completar el campo de descripción",
      },
      {
        check: (input) => input.value.length >= 20,
        message: "La descripción debe tener al menos 20 caracteres",
      },
    ],
  },
];

validations.forEach((validation) => {
  const inputId = validation.field;
  const input = document.getElementById(inputId);
  const inputErrorMessage = document.getElementById(inputId + "Error");

  function validate() {
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
  if (validation.checks) {
    const failedCheck = validation.checks.find((check) => !check.check(input));
    if (failedCheck) {
      inputErrorMessage.innerText = failedCheck.message;
      inputErrorMessage.classList.add("display");
      return false;
    }
  } else if (!validation.check(input)) {
    inputErrorMessage.innerText = validation.message;
    inputErrorMessage.classList.add("display");
    return false;
  }
  inputErrorMessage.innerText = "";
  inputErrorMessage.classList.remove("display");
  return true;
}
