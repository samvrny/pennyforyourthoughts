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
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#signup').addEventListener('submit', signUp);