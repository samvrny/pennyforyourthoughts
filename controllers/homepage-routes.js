const router = require('express').Router();
const sequelize = require('../config/connection'); //may not need this line
const { User, Post, Comment } = require('../models');

//get all posts and render the homepage
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
          posts,
          loggedIn: req.session.loggedIn
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get one post and render the comments page for it
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
    if(!dbPostData) {
      res.status(404).json({ message: 'No post found with this id.' });
      return;
    }
    const post = dbPostData.get({ plain: true });
    
    res.render('post-comments', {
      post,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//render the login page
router.get('/login', (req, res) => {
  res.render('sign-login');
});

module.exports = router;