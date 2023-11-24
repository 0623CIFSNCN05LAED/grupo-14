const form = document.getElementById('formLogin');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email');
    const emailValue = email.value;

    if(emailValue != ''){

    }else{
        console.log('error');
    }
});