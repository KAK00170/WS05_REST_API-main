const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  // TODO: Create a new Post instance from req.body.
  const post = new Post(req.body);
  // TODO: Save it to MongoDB.
  const savedPost = await post.save();
  // TODO: Return the created post with status code 201.
  return res.status(201).json(savedPost);
});

router.get('/', async (req, res) => {
  // TODO: Query all posts from MongoDB.
  const posts = await Post.find();
  // TODO: Return the results as JSON.
  return res.json(posts);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // TODO: Validate req.params.id using isValidObjectId().
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }
  // TODO: Find one post by id.
  const post = await Post.findById(id);
  // TODO: Return 404 if the post is not found.
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json(post);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // TODO: Validate req.params.id using isValidObjectId().
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }
  // TODO: Update the post with req.body.
  const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
  // TODO: Return the updated post as JSON.
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json(updatedPost);
});

router.delete('/:id', async (req, res) => {
  // TODO: Validate req.params.id using isValidObjectId().
  // TODO: Delete the post by id.
  // TODO: Return a success message as JSON.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  return res.status(501).json({ message: 'TODO: implement DELETE /api/posts/:id' });
});

module.exports = router;