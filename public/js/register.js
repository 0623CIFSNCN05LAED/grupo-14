window.addEventListener("DOMContentLoaded", function () {
  const formField = document.querySelectorAll(".formField");

  formField.forEach(function (field) {
    field.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const category = document.getElementById("category");
  const formField = document.querySelectorAll(".formField");

  category.addEventListener("change", function () {
    const selectedOption = category.value;
    formField.forEach(function (formField) {
      formField.style.display = "block";
    });

    switch (selectedOption) {
      case "":
        formField.forEach(function (formField) {
          formField.style.display = "none";
        });

      case "admin":
        document.getElementById("dniField").style.display = "none";
        document.getElementById("cuitField").style.display = "none";
        document.getElementById("businessNameField").style.display = "none";

        break;
      case "cf":
        document.getElementById("cuitField").style.display = "none";
        document.getElementById("businessNameField").style.display = "none";

        break;
      case "mayorista":
        document.getElementById("nameField").style.display = "none";
        document.getElementById("lastNameField").style.display = "none";
        document.getElementById("dniField").style.display = "none";

        break;
      default:
    }
  });
});

const cfValidations = [
  {
    field: "name",
    check: (input) => input.value != "",
    message: "Debes completar el campo de nombre.",
  },
  {
    field: "lastName",
    check: (input) => input.value != "",
    message: "Debes completar el campo de apellido.",
  },
  {
    field: "dni",
    check: (input) => input.value != "",
    message: "Debes completar el campo de DNI.",
  },
];

const adminValidations = [
  {
    field: "name",
    check: (input) => input.value != "",
    message: "Debes completar el campo de nombre.",
  },
  {
    field: "lastName",
    check: (input) => input.value != "",
    message: "Debes completar el campo de apellido",
  },
];

const mayoristaValidations = [
  {
    field: "businessName",
    check: (input) => input.value != "",
    message: "Debes seleccionar una categoria",
  },
  {
    field: "cuit",
    check: (input) => input.value != "",
    message: "Debes completar el campo de cuit",
  },
];

const commonValidations = [
  {
    field: "tel",
    check: (input) => input.value != "",
    message: "Debes completar el campo de teléfono",
  },
  {
    field: "email",
    check: (input) => input.value != "",
    message: "Debes completar el campo de email",
  },
  {
    field: "password",
    check: (input) => input.value != "",
    message: "Debes completar el campo de contraseña",
  },
  {
    field: "confirmPassword",
    check: (input) => input.value != "",
    message: "Debes completar el campo de confirmar contraseña",
  },
];

const category = document.getElementById("category");
let validations = [];

category.addEventListener("change", function () {
  console.log("catcal", validations);
  if (category.value == "admin") {
    validations = commonValidations.concat(adminValidations);
  }
  if (category.value == "cf") {
    validations = commonValidations.concat(cfValidations);
  }
  if (category.value == "mayorista") {
    validations = commonValidations.concat(mayoristaValidations);
  }
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
  if (!validation.check(input)) {
    inputErrorMessage.innerText = validation.message;
    inputErrorMessage.classList.add("display");
    return false;
  }

  inputErrorMessage.innerText = "";
  inputErrorMessage.classList.remove("display");
  return true;
}
