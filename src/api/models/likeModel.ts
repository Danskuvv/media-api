// likeModel.ts
import {RowDataPacket} from 'mysql2';
import {Like} from '../../../hybrid-types/DBTypes';
import promisePool from '../../lib/db';

const postLike = async (media_id: number, user_id: number): Promise<Like> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'INSERT INTO likes (media_id, user_id) VALUES (?, ?)',
    [media_id, user_id]
  );
  return rows[0];
};

const deleteLike = async (like_id: number): Promise<Like> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'DELETE FROM likes WHERE like_id = ?',
    [like_id]
  );
  return rows[0];
};

const getCountByMediaId = async (media_id: number): Promise<number> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & {count: number}[]>(
    'SELECT COUNT(*) as count FROM likes WHERE media_id = ?',
    [media_id]
  );
  return rows[0].count;
};

const getUserLike = async (
  media_id: number,
  user_id: number
): Promise<Like> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Like[]>(
    'SELECT * FROM likes WHERE media_id = ? AND user_id = ?',
    [media_id, user_id]
  );
  return rows[0];
};

export {postLike, deleteLike, getCountByMediaId, getUserLike};
