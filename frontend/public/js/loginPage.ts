document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const signInLink = document.getElementById('signin');
  
    if (form && signInLink) {
      form.addEventListener('submit', async function (event: Event) {
          event.preventDefault();
  
          const usernameInput = document.getElementById('username') as HTMLInputElement;
          const passwordInput = document.getElementById('password') as HTMLInputElement;
  
          if (usernameInput && passwordInput) {
            const username = usernameInput.value;
            const password = passwordInput.value;
  
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
          }
      });
  
      const signUpTitle = document.getElementById('signup-title');
      const submitButton = document.getElementById('submit-btn');
  
      signInLink.addEventListener('click', () => {
          document.querySelector('body')?.classList.toggle('bg-slate-500');
          document.querySelector('body')?.classList.toggle('bg-slate-600');
          if (signInLink.innerHTML.toLowerCase() === 'sign in') {
              if (signUpTitle && submitButton) {
                signUpTitle.innerHTML = 'Sign In to Your Account';
                submitButton.innerHTML = 'Sign In';
              }
              signInLink.innerHTML = 'Sign Up';
              form.id = 'signin-form';
          } else if (signInLink.innerHTML.toLowerCase() === 'sign up') {
              if (signUpTitle && submitButton) {
                signUpTitle.innerHTML = 'Sign Up Now';
                submitButton.innerHTML = 'Sign Up';
              }
              signInLink.innerHTML = 'Sign In';
              form.id = 'signup-form';
          }
      });
    }
  });