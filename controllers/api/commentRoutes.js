const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.status(400).json({ logged_in: false, message: 'Please log in.' });
    return;
  }

  try {
    const now = new Date;
    const newComment = {
      text: req.body.comment,
      userId: req.session.user_id,
      postId: parseInt(req.params.id),
      created_on: now.toISOString()
    }

    const comment = await Comment.create(newComment);

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;