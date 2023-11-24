document.addEventListener('DOMContentLoaded', function () {
    const category = document.getElementById('category');
    const formField = document.querySelectorAll('.formField')
   

    category.addEventListener('change', function () {
        const selectedOption = category.value;

      
        // Realiza acciones según la opción seleccionada
        formField.forEach(function (formField) {
            formField.style.display = 'block';
        });

        switch (selectedOption) {
            case'':
            formField.forEach(function (formField) {
                formField.style.display = 'none';
            });
            
            case 'admin':
                document.getElementById('dniField').style.display = 'none';
                document.getElementById('cuitField').style.display = 'none';
                document.getElementById('businessNameField').style.display = 'none';
        
                break;
            case 'cf':
               
                document.getElementById('cuitField').style.display = 'none';
                document.getElementById('businessNameField').style.display = 'none';
                             
                break;
            case 'mayorista':
                document.getElementById('nameField').style.display = 'none';
                document.getElementById('lastNameField').style.display = 'none';
                document.getElementById('dniField').style.display = 'none';
               
                break;
            default:
               
        }
    });
});


const cfValidations = [
    {
      field: "name",
      check: (input) => input.value != "",
      message: "Debes completar el campo de nombre",
    },
    {
      field: "lastName",
      check: (input) => input.value != "",
      message: "Debes completar el campo de apellido",
    },
    {
      field: "dni",
      check: (input) => input.value != "",
      message: "Debes completar el campo de dni",
    },
  ];
  
  const adminValidations = [
    {
      field: "name",
      check: (input) => input.value != "",
      message: "Debes completar el campo de nombre",
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
  
  function validationsCategory(category) {
    let validations = [];
    
    if (category == "admin") {
      validations = commonValidations.concat(adminValidations);
      
    }
    if (category == "cf") {
      validations = commonValidations.concat(cfValidations);
    }
    if (category == "mayorista") {
      validations = commonValidations.concat(mayoristaValidations);
    }
   console.log('vf',validations)
    return validations;
  }
  
  const validations = validationsCategory(category);

  console.log('validations',validations)  

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
    } */
  
    if (!validation.check(input)) {
      inputErrorMessage.innerText = validation.message;
      inputErrorMessage.classList.add("display");
      return false;
    }
  
    inputErrorMessage.innerText = "";
    inputErrorMessage.classList.remove("display");
    return true;
  }