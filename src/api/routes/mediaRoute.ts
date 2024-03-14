import express from 'express';
import {
  mediaDelete,
  mediaGet,
  mediaListGet,
  mediaListGetByAppId,
  mediaPost,
  mediaPut,
} from '../controllers/mediaController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(mediaListGet).post(authenticate, mediaPost);

router
  .route('/:id')
  .get(mediaGet)
  .delete(authenticate, mediaDelete)
  .put(authenticate, mediaPut);

router.route('/app/:id').get(mediaListGetByAppId);

export default router;
