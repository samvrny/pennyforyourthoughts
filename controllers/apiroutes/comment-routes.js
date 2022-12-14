const router = require('express').Router();
const { Comment } = require('../../models');
const authorize = require('../../utils/authorize');

//get all comments from the database
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

//post a new comment to the database
router.post('/', authorize, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            //console.log(err);
            res.status(400).json(err);
        });
    }
});

module.exports = router;