async function signUp(event) {
    event.preventDefault();
    console.log('APPLE BABY');
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
            console.log('New user created! Cake for everyone!');
            window.alert('New user created!');
        } else {
            alert(response.statusText)
        }
    }
}

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
            document.location.replace('/'); //This will change to dahsboard
        } else {
            window.alert('Incorrect credentials! Please try again.');
        }
    }
}

document.querySelector('#login').addEventListener('submit', login);
document.querySelector('#signup').addEventListener('submit', signUp);