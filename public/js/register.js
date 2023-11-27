window.addEventListener("DOMContentLoaded", function () {
  const formFieldElements = document.querySelectorAll(".formField");
  const category = document.getElementById("category");

  formFieldElements.forEach(function (field) {
    field.style.display = "none";
  });

  /* limpia inputs y mensajes de error al cambiar opcion en el select */
  function clearInputsAndErrorMessages() {
    formFieldElements.forEach(function (formField) {
      const inputField = formField.querySelector("input");
      if (inputField) {
        inputField.value = "";
      }

      validations.forEach((validation) => {
        const inputId = validation.field;
        const inputErrorMessage = document.getElementById(inputId + "Error");
        inputErrorMessage.innerText = "";
        inputErrorMessage.classList.remove("display");
      });
    });
  }

  const commonValidations = [

    {
      field: "name",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Debes completar el campo de nombre.",
        },
        {
          check: (input) => input.value.length >= 2,
          message: "Debe tener más de dos caracteres.",
        },        
      ],
    },
    {
      field: "lastName",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Debes completar el campo de apellido.",
        },
        {
          check: (input) => input.value.length >= 2,
          message: "Debe tener más de dos caracteres.",
        },       
      ],
    },
    {
      field: "tel",
      check: (input) => input.value !== "",
      message: "Debes completar el campo de teléfono",
    },
    {
      field: "email",
      check: (input) => input.value !== "",
      message: "Debes completar el campo de email",
    },
    {
      field: "password",
      check: (input) => input.value !== "",
      message: "Debes completar el campo de contraseña",
    },
    {
      field: "confirmPassword",
      check: (input) => {
        const passwordInput = document.getElementById("password");
        return input.value === passwordInput.value;
      },
      message: "Las contraseñas no coinciden",
    },
  ];

  const cfValidations = [

    {
      field: "dni",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Debes completar el campo de DNI.",
        },
        {
          check: (input) => input.value.length === 8,
          message: "El DNI debe tener 8 caracteres.",
        },        
      ],
    },
  ];

  const adminValidations = [];

  const mayoristaValidations = [
    
    {
      field: "businessName",
      check: (input) => input.value !== "",
      message: "Debes seleccionar una categoria",
    },
    {
      field: "cuit",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "El campo no debe estar vacío.",
        },
        {
          check: (input) => input.value.length === 11,
          message: "El CUIT debe tener 11 caracteres.",
        },       
      ],    
    },
  ];

  let validations = [];

  category.addEventListener("change", function () {
    clearInputsAndErrorMessages();

    const selectedOption = category.value;

    formFieldElements.forEach(function (formField) {
      formField.style.display = "block";
    });

    switch (selectedOption) {
      case "":
        formFieldElements.forEach(function (formField) {
          formField.style.display = "none";
        });
        break;
      case "admin":
        validations = commonValidations.concat(adminValidations);
        document.getElementById("dniField").style.display = "none";
        document.getElementById("cuitField").style.display = "none";
        document.getElementById("businessNameField").style.display = "none";
        break;
      case "cf":
        validations = commonValidations.concat(cfValidations);
        document.getElementById("cuitField").style.display = "none";
        document.getElementById("businessNameField").style.display = "none";
        break;
      case "mayorista":
        validations = commonValidations.concat(mayoristaValidations);
        document.getElementById("nameField").style.display = "none";
        document.getElementById("lastNameField").style.display = "none";
        document.getElementById("dniField").style.display = "none";
        break;
      default:
    }

    /* Agrega los event listeners y realiza las validaciones */
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
      // Busca el primer check que no se cumple y muestra mensaje
      const failedCheck = validation.checks.find(
        (check) => !check.check(input)
      );
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
});