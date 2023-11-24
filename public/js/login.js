const validations = [
    {
        field: 'email',
        check: (input) => input.value != '',
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


const form = document.getElementById('formLogin');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submit interceptado');

    const email = document.getElementById('email');
    const emailValue = email.value;

    if(emailValue != ''){

    }else{
        console.log('error');
    }
});

function inputValidation(validation, input, inputErrorMsg){
    if(!input.value){
        inputErrorMsg.innerText = 'El campo no debe estar vacío';
    }

    if(!validation.check(input)){
        inputErrorMsg.innerText = validation.msg;
    }
}