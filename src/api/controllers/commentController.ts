import {Request, Response, NextFunction} from 'express';
import {Comment} from '@sharedTypes/DBTypes';
import {postComment, getCommentsByMediaId} from '../models/commentModel';
import {CommentResponse} from '@sharedTypes/MessageTypes';

const commentPost = async (
  req: Request<{}, {}, {comment_text: string; media_id: number}>,
  res: Response<CommentResponse>,
  next: NextFunction
) => {
  try {
    const newComment = await postComment(
      req.body.comment_text,
      req.body.media_id,
      res.locals.user.user_id
    );
    res.json({message: 'Comment added', comment: newComment});
  } catch (error) {
    next(error);
  }
};

const commentsGet = async (
  req: Request<{media_id: string}>,
  res: Response<Comment[]>,
  next: NextFunction
) => {
  try {
    const comments = await getCommentsByMediaId(Number(req.params.media_id));
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export {commentPost, commentsGet};
