const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
      exclude: ['password']
    });
    if (!posts) res.status(400).json({ message: "No posts" });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: { model: User } }],
      exclude: ['password']
    });

    if (!post) res.status(400).json({ message: "No post found" });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

router.post('/', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(400).json({ logged_in: false, message: 'Please log in.' });
    return;
  }
  const now = new Date;
  try {
    const newPost = {
      title: req.body.title,
      text: req.body.post,
      user_id: req.session.user_id,
      created_on: now.toISOString()
    }
    const post = await Post.create(newPost);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

router.put('/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(400).json({ logged_in: false, message: 'Please log in.' });
    return;
  }
  try {
    const now = new Date;
    const updatedPost = {
      title: req.body.title,
      text: req.body.post,
      user_id: req.session.user_id,
      updated_on: now.toISOString()
    }
    const result = await Post.update(updatedPost, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(400).json({ logged_in: false, message: 'Please log in.' });
    return;
  }
  try {
    const result = await Post.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;