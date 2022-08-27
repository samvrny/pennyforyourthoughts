const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_body', 'user_id', 'post_id', 'created_at'],
        order: [['created_at', 'DESC']]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    console.log(req)
     Comment.create({
        comment_body: req.body.comment_body,
        post_id: req.body.post_id,
        user_id: req.body.user_id //goong to be req.session at some point once cookies are added
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;