async function newPost(event) {
    event.preventDefault();
    
    const title = document.querySelector('#title').value;
    const post_contents = document.querySelector('#post-body').value;

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
}

document.querySelector('.create-post-form').addEventListener('submit', newPost);