// likeRoute.ts
import express from 'express';
import {
  likePost,
  likeDelete,
  likeCountGet,
  userLikeGet,
} from '../controllers/likeController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').post(authenticate, likePost);

router.route('/:like_id').delete(authenticate, likeDelete);

router.route('/count/:media_id').get(likeCountGet);

router.route('/bymedia/user/:media_id').get(authenticate, userLikeGet);

export default router;
