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
          } //ask, why is this not working? VERY confused.
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

router.get('/post/:id', (req, res) =>  {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'post_contents', 'user_id', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username'] //this also is not working
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    //console.log(dbPostData.comments);
    if(!dbPostData) {
      res.status(404).json({ message: 'No post found with this id.' });
      return;
    }
    const post = dbPostData.get({ plain: true });

    res.render('post-comments', {
      post,
      //add session login data here
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;