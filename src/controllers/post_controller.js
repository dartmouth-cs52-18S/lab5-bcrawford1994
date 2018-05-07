import Post from '../models/post_model';

export const createPost = (req, res) => {
  // res.send('post should be created here');
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
  console.log('here: ', post);
  return post.save()
    .then((result) => {
      console.log('created post: ', result);
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPosts = (req, res) => {
  // res.send('posts should be returned');
  return Post.find({})
    .then((result) => {
      console.log(result);
      res.json((result));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  // res.send('single post looked up');
  // console.log(req.params);
  Post.findById(req.params.postID)
    .then((result) => {
      console.log(result);
      res.json((result));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deletePost = (req, res) => {
  // res.send('delete a post here');
  // Post.remove(req.params.postID)

  Post.remove({
    _id: req.params.postID,
  })
    .then((result) => {
      console.log(result);
      res.json({ message: 'Post Deleted!' });
    })
    .catch((error) => {
      console.log('error, ', error);
      res.status(500).json({ error });
    });
};
export const updatePost = (req, res) => {
  // res.send('update a post here');
  Post.findById(req.params.postID)
    .then((result) => {
      result.title = req.body.title;
      result.tags = req.body.tags;
      result.content = req.body.content;
      result.cover_url = req.body.cover_url;
      res.json({ message: 'Post Updated!' });
      return result.save();
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  /*
  return post.save()
    .then((result) => {
      res.json({ message: 'Post updated!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
    */
};
