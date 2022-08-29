async function updatePost(event) {
    event.preventDefault();

    const title = document.querySelector('#edit-post-title').value.trim();
    const post_contents = document.querySelector('#edit-post-body').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if(title && post_contents) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post_contents,
                title
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
        window.alert('Your Title and Post must each contain at least 1 character!');
    }
}

document.querySelector('#update-form').addEventListener('submit', updatePost);