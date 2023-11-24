const validations = [
    {
        field: 'email',
        check: (input) => input.value != '' && isValidEmail(input.value),
        msg: 'Debe completar con su email'
    },
    {
        field: 'password',
        check: (input) => input.value != '',
        msg: 'Debe completar con su contraseña'
    }
]

validations.forEach( (validation) => {
    const inputId = validation.field;
    const input = document.getElementById(inputId);
    const inputErrorMsg = document.getElementById(inputId + 'Error');

    
    function validate(){
        console.log('input', input.value);
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
    if(!input.value){
        inputErrorMsg.innerText = 'El campo no debe estar vacío';
        inputErrorMsg.classList.add('display');
        return;
    }

    if(!validation.check(input)){
        inputErrorMsg.innerText = validation.msg;
        inputErrorMsg.classList.add('display');
        return;
    }

    inputErrorMsg.innerText = '';
    inputErrorMsg.classList.remove('display');
    return;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}