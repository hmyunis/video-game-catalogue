'use strict';

const form = document.getElementById('signup-form');
const signInLink = document.getElementById('signin');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(
        signInLink.innerHTML.toLowerCase() === 'sign up'
            ? 'http://localhost:3000/signin'
            : 'http://localhost:3000/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

const signUpTitle = document.getElementById('signup-title');
const submitButton = document.getElementById('submit-btn');
const alreadyHave = document.getElementById('already-have');

signInLink.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('bg-slate-500');
    document.querySelector('body').classList.toggle('bg-slate-600');
    if (signInLink.innerHTML.toLowerCase() === 'sign in') {
        signUpTitle.innerHTML = 'Sign In to Your Account';
        submitButton.innerHTML = 'Sign In';
        signInLink.innerHTML = 'Sign Up';
        form.id = 'signin-form';
    } else if (signInLink.innerHTML.toLowerCase() === 'sign up') {
        signUpTitle.innerHTML = 'Sign Up Now';
        submitButton.innerHTML = 'Sign Up';
        signInLink.innerHTML = 'Sign In';
        form.id = 'signup-form';
    }
});
