const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const check = document.getElementById('check');
const error = document.querySelector('small');

form.addEventListener('submit', (e) => {
    checkInputs();
    e.preventDefault();
});

const checkInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const checkValue = check.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be empty');
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be empty');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid');
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be empty');
    } else if (passwordValue.length < 6) {
        setErrorFor(password, 'Password must be 6 charecters long');
    } else if (
        passwordValue === 'password' ||
        passwordValue === '123456' ||
        passwordValue === 'abcdef'
    ) {
        setErrorFor(password, 'Password should not be weak');
    } else {
        setSuccessFor(password);
    }

    if (checkValue === '') {
        setErrorFor(check, 'Confirm Password cannot be empty');
    } else if (checkValue !== passwordValue) {
        setErrorFor(check, 'password does not match');
    } else {
        setSuccessFor(check);
    }

    if (
        usernameValue !== '' &&
        emailValue !== '' &&
        isEmail(emailValue) &&
        passwordValue !== '' &&
        passwordValue.length >= 6 &&
        passwordValue !== 'password' &&
        passwordValue !== '123456' &&
        passwordValue !== 'abcdef' &&
        checkValue !== '' &&
        checkValue === passwordValue
    ) {
        setTimeout(() => {
            username.value = '';
            email.value = '';
            password.value = '';
            check.value = '';
            removeSuccessFor(username);
            removeSuccessFor(email);
            removeSuccessFor(password);
            removeSuccessFor(check);
        }, 1000);

        setTimeout(() => {
            alert('Account Created Successfully');
        }, 1000);
    }
};

const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
};

const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

const removeSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.classList.remove('success');
};

const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
};