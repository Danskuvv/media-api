// likeController.ts
import {Request, Response, NextFunction} from 'express';
import {Like} from '../../../hybrid-types/DBTypes';
import {
  postLike,
  deleteLike,
  getCountByMediaId,
  getUserLike,
} from '../models/likeModel';
import {LikeResponse} from '../../../hybrid-types/MessageTypes';

const likePost = async (
  req: Request<{}, {}, {media_id: number}>,
  res: Response<LikeResponse>, // Use LikeResponse here
  next: NextFunction
) => {
  try {
    const newLike = await postLike(req.body.media_id, res.locals.user.user_id);
    res.json({message: 'Like added', like: newLike});
  } catch (error) {
    next(error);
  }
};

const likeDelete = async (
  req: Request<{like_id: string}>,
  res: Response<LikeResponse>, // Use LikeResponse here
  next: NextFunction
) => {
  try {
    const deletedLike = await deleteLike(Number(req.params.like_id));
    res.json({message: 'Like deleted', like: deletedLike});
  } catch (error) {
    next(error);
  }
};

const likeCountGet = async (
  req: Request<{media_id: string}>,
  res: Response<{count: number}>,
  next: NextFunction
) => {
  try {
    const count = await getCountByMediaId(Number(req.params.media_id));
    res.json({count});
  } catch (error) {
    next(error);
  }
};

const userLikeGet = async (
  req: Request<{media_id: string}>,
  res: Response<Like>,
  next: NextFunction
) => {
  try {
    const userLike = await getUserLike(
      Number(req.params.media_id),
      res.locals.user.user_id
    );
    res.json(userLike);
  } catch (error) {
    next(error);
  }
};

export {likePost, likeDelete, likeCountGet, userLikeGet};
