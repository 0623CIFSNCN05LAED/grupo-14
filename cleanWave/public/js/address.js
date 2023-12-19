const validations = [
  {
    field: "country",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo país",
  },
  {
    field: "province",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo provincia",
  },
  {
    field: "neighborhood",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo localidad",
  },
  {
    field: "street",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo calle",
  },
  {
    field: "number",
    check: (input) => input.value.trim() !== "",
    message: "Debes completar el campo numeración",
  },
  {
    field: "note",
    checks: [
      {
        check: (input) => input.value.trim() !== "",
        message: "Debes completar el campo referencias del domicilio",
      },
      {
        check: (input) => input.value.length >= 5,
        message: "La descripción debe tener al menos 5 caracteres",
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
