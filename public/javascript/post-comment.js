async function postComment(event) {
    event.preventDefault();

    const comment_body = document.querySelector('.comment-textarea').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if(comment_body) {
        console.log(post_id);
        console.log(comment_body);
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        window.alert('You must enter at least 1 character into the comment form!');
    }
}

document.querySelector('.post-comment-form').addEventListener('submit', postComment);