const router = require('express').Router();
const sequelize = require('../config/connection'); //may not need this line
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
      attributes: [ 'id', 'title', 'post_contents', 'created_at' ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(allPosts => allPosts.get({ plain: true }));
  
        res.render('homepage', { 
          posts
          //add logic for session login here later
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;