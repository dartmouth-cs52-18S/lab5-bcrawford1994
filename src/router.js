import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts/:postID')
  .get(Posts.getPost)
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

// /your routes will go here
router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);


router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);


export default router;
