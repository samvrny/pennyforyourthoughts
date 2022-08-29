//function that calls to 'sign up' (add a new user)
async function signUp(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup-input').value.trim();
    const password = document.querySelector('#password-signup-input').value.trim();

    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            window.alert(`New user created! Welcome, ${username}`);
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

//function that calls to log in a user and create a new session
async function login(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login-input').value.trim();
    const password = document.querySelector('#password-login-input').value.trim();

    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            window.alert(`Welcome, ${username}!`);
            document.location.replace('/dashboard');
        } else {
            window.alert('Incorrect credentials! Please try again.');
        }
    }
}

document.querySelector('#login').addEventListener('submit', login);
document.querySelector('#signup').addEventListener('submit', signUp);