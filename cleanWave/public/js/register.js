window.addEventListener("DOMContentLoaded", function () {
  const formFieldElements = document.querySelectorAll(".inputGroup");
  const category = document.getElementById("category");

  function clearInputsAndErrorMessages() {
    formFieldElements.forEach(function (inputGroup) {
      const inputField = inputGroup.querySelector("input");
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

  function validEmail(correo) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(correo);
  }

  function validImage(image) {
    const acceptedExtensions = /\.(jpg|jpeg|png)?$/;
    if (image) {
      return acceptedExtensions.test(image.toLowerCase());
    }
    return true;
  }

  const commonValidations = [
    {
      field: "tel",
      check: (input) => input.value !== "",
      message: "Por favor, ingrese teléfono / celular.",
    },
    {
      field: "email",
      checks: [
        {
          check: (input) => input.value !== "",
          message: "Por favor, ingrese Correo Electrónico.",
        },
        {
          check: (input) => validEmail(input.value),
          message:
            "Por favor, ingrese un correo electrónico válido. Ejemplo: nombre@dominio.com",
        },
      ],
    },
    {
      field: "image",
      checks: [
        {
          check: (input) => validImage(input.value),
          message: "Debes subir un archivo tipo .jpg, .png o .jpeg",
        },
      ],
    },
    {
      field: "password",
      checks: [
        {
          check: (input) => input.value !== "",
          message: "Por favor, ingrese una contraseña",
        },
        {
          check: (input) => input.value.length >= 8,
          message:
            "La contraseña debe tener al menos 8 caracteres. Intenta nuevamente.",
        },
        {
          check: (input) => /[A-Z]/.test(input.value),
          message:
            "La contraseña debe contener al menos una letra mayúscula. Intenta nuevamente.",
        },
        {
          check: (input) => /[a-z]/.test(input.value),
          message:
            "La contraseña debe contener al menos una letra minúscula. Intenta nuevamente.",
        },
        {
          check: (input) => /[\d]/.test(input.value),
          message:
            "La contraseña debe contener al menos un número. Intenta nuevamente.",
        },
      ],
    },
    {
      field: "confirmPassword",
      checks: [
        {
          check: (input) => input.value !== "",
          message: "Por favor, ingrese confirmar contraseña",
        },
        {
          check: (input) => {
            const passwordInput = document.getElementById("password");
            return input.value === passwordInput.value;
          },
          message:
            "Las contraseñas no coinciden. Por favor, verifica que las contraseñas ingresadas sean iguales.",
        },
      ],
    },
  ];

  const cfValidations = [
    {
      field: "name",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese su nombre.",
        },
        {
          check: (input) => input.value.length >= 2,
          message:
            "El nombre debe tener al menos 2 caracteres. Intenta nuevamente.",
        },
      ],
    },
    {
      field: "lastName",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese su apellido.",
        },
        {
          check: (input) => input.value.length >= 2,
          message:
            "El apellido debe tener al menos 2 caracteres. Intenta nuevamente.",
        },
      ],
    },

    {
      field: "dni",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese su DNI.",
        },
        {
          check: (input) => input.value.length === 8,
          message:
            "El DNI debe contener exactamente 8 números. Por favor, verifícalo e inténtalo nuevamente.",
        },
      ],
    },
  ];

  const adminValidations = [
    {
      field: "name",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese su nombre.",
        },
        {
          check: (input) => input.value.length >= 2,
          message:
            "El nombre debe tener al menos 2 caracteres. Intenta nuevamente.",
        },
      ],
    },
    {
      field: "lastName",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese su apellido.",
        },
        {
          check: (input) => input.value.length >= 2,
          message:
            "El apellido debe tener al menos 2 caracteres. Intenta nuevamente.",
        },
      ],
    },
    {
      field: "email",
      checks: [
        {
          check: (input) => input.value !== "",
          message: "Por favor, ingrese Correo Electrónico.",
        },
        {
          check: (input) => validEmail(input.value),
          message:
            "Por favor, ingrese un correo electrónico válido. Ejemplo: nombre@dominio.com",
        },
        {
          check: (input) => input.value.endsWith("@cleanwave.com"),
          message:
            "Por favor, el correo ingresado debe coincidir con el dominio empresarial.",
        },
      ],
    },
  ];

  const mayoristaValidations = [
    {
      field: "businessName",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, Razon Social.",
        },
        {
          check: (input) => input.value.length >= 2,
          message:
            "Su Razon Social debe tener al menos 2 caracteres. Intenta nuevamente.",
        },
      ],
    },
    {
      field: "cuit",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese CUIT.",
        },
        {
          check: (input) => input.value.length === 11,
          message:
            "El CUIT debe contener exactamente 11 números. Por favor, verifícalo e inténtalo nuevamente.",
        },
      ],
    },
  ];

  let validations = [];

  function updateFieldsAndValidations() {
    clearInputsAndErrorMessages();

    const selectedOption = category.value;

    formFieldElements.forEach(function (inputGroup) {
      inputGroup.style.display = "block";
    });

    switch (selectedOption) {
      case "":
        formFieldElements.forEach(function (inputGroup) {
          inputGroup.style.display = "none";
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
  }

  updateFieldsAndValidations();

  category.addEventListener("change", updateFieldsAndValidations);

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

    if (validationsResult.every((val) => val == true)) {
      form.submit();
    }
  });

  function inputValidation(validation, input, inputErrorMessage) {
    if (validation.checks) {
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
