const validations = [
    {
        field: 'email',
        checks: [
            {
                check: input => input.value !== "",
                msg: 'Ingresar un correo electrónico'
            },
            {
                check: input => isValidEmail(input.value),
                msg: 'Ingresar un correo electrónico válido. Ejemplo: nombre@dominio.com'
            }
        ]
    },
    {
        field: 'password',
        check: (input) => input.value !== "",
        msg: 'Ingresar una contraseña'
    }
]

validations.forEach( (validation) => {
    const inputId = validation.field;
    const input = document.getElementById(inputId);
    const inputErrorMsg = document.getElementById(inputId + 'Error');

    
    function validate(){
        inputValidation(validation, input, inputErrorMsg)
    };

    input.addEventListener('blur', validate);
    input.addEventListener('input', validate);
})


const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const validationsResult = [];
    
    validations.forEach( (validation) => {
        const inputId = validation.field;
        const input = document.getElementById(inputId);
        const inputErrorMsg = document.getElementById(inputId + 'Error');
    
        const result = inputValidation(validation, input, inputErrorMsg);
        validationsResult.push(result);
    })

    if(validationsResult.every(val => val == true)){
        form.submit();
    }
});

function inputValidation(validation, input, inputErrorMsg){
    if (validation.checks) {
        // Busca el primer check que no se cumple y muestra mensaje
        const failedCheck = validation.checks.find(
          (check) => !check.check(input)
        );
        if (failedCheck) {
            inputErrorMsg.innerText = failedCheck.msg;
            inputErrorMsg.classList.add("display");
          return false;
        }
      } else if (!validation.check(input)) {
        inputErrorMsg.innerText = validation.msg;
        inputErrorMsg.classList.add("display");
        return false;
      }
      inputErrorMsg.innerText = "";
      inputErrorMsg.classList.remove("display");
      return true;
    }

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}