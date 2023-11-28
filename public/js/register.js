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
  
  
  function validEmail(correo) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(correo);
  }

  const commonValidations = [

    {
      field: "name",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese su nombre.",
        },
        {
          check: (input) => input.value.length >= 2,
          message: "El nombre debe tener al menos 2 caracteres. Intenta nuevamente.",
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
          message: "El apellido debe tener al menos 2 caracteres. Intenta nuevamente.",
        },       
      ],
    },
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
          message: "Por favor, ingrese un correo electrónico válido. Ejemplo: nombre@dominio.com",
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
          message: "La contraseña debe tener al menos 8 caracteres. Intenta nuevamente.",
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
        message: "Las contraseñas no coinciden. Por favor, verifica que las contraseñas ingresadas sean iguales.",
        },
                
      ],
    }
  ];

  const cfValidations = [

    {
      field: "dni",
      checks: [
        {
          check: (input) => input.value.trim() !== "",
          message: "Por favor, ingrese su DNI.",
        },
        {
          check: (input) => input.value.length === 8,
          message: "El DNI debe contener exactamente 8 números. Por favor, verifícalo e inténtalo nuevamente.",
        },        
      ],
    },
  ];

  const adminValidations = [];

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
          message: "Su Razon Social debe tener al menos 2 caracteres. Intenta nuevamente.",
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
          message: "El CUIT debe contener exactamente 11 números. Por favor, verifícalo e inténtalo nuevamente.",
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