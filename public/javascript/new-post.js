//function that calls to create a new post
async function newPost(event) {
    event.preventDefault();
    
    const title = document.querySelector('#title').value;
    const post_contents = document.querySelector('#post-body').value;
    if(title && post_contents) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_contents
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        window.alert('Your title and post must both contain at least 1 character!');
    }
}

document.querySelector('.create-post-form').addEventListener('submit', newPost);