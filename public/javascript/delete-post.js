async function deletePost(event) {
    event.preventDefault();
    console.log('APPLE');
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if(id) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#delete-post').addEventListener('click', deletePost);