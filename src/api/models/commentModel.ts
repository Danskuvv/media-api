import {RowDataPacket} from 'mysql2';
import {Comment} from '@sharedTypes/DBTypes';
import promisePool from '../../lib/db';

const postComment = async (
  comment_text: string,
  media_id: number,
  user_id: number
): Promise<Comment> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Comment[]>(
    'INSERT INTO comments (comment_text, media_id, user_id) VALUES (?, ?, ?)',
    [comment_text, media_id, user_id]
  );
  return rows[0];
};

const getCommentsByMediaId = async (media_id: number): Promise<Comment[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Comment[]>(
    'SELECT * FROM comments WHERE media_id = ?',
    [media_id]
  );
  return rows;
};

export {postComment, getCommentsByMediaId};
