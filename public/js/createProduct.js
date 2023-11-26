const validations = [
  {
    field: "name",
    check: (input) => {
      let msg = "";
      if (input.value === "") {
        msg = "Debes completar el campo de nombre.";
      } else if (input.value.length < 5) {
        msg = "El nombre debe tener al menos 5 caracteres.";
      }
      return msg;
    },
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
 /*  {
    field: "description",
    check: (input) => input.value != "",
    message: "Debes completar el campo de descripicion",
  }, */ 
  {
    field: "description",
    check: (input) => {
      let msg = "";
      if (input.value === "") {
        msg = "Debes completar el campo de descripicion.";
      } else if (input.value.length < 20) {
        msg = "La descripcion debe de tener 20 caracteres";
      }
      return msg;
    },
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
  if (validation.check(input) != "") {
    inputErrorMessage.innerText = validation.check(input);
    inputErrorMessage.classList.add("display");
    return false;
  }

  inputErrorMessage.innerText = "";
  inputErrorMessage.classList.remove("display");
  return true;
}
