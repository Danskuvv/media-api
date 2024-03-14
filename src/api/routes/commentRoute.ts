import express from 'express';
import {commentPost, commentsGet} from '../controllers/commentController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').post(authenticate, commentPost);

router.route('/bymedia/:media_id').get(commentsGet);

export default router;
