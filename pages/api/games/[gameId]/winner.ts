import { postData, postFormData } from '@/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { Exception } from 'sass';

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const token = await getToken({ req, secret });

      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { gameId, blockId } = req.query;

      if (!gameId) {
        res.status(400).json({ message: 'Missing gameId in the request.' });
        return;
      }

      var response = await postData(`games/${gameId}/winner`, req.body, req);

      if (!response.ok) {
        throw new Error("Failed to claim cell.")
      }

      console.log(response);
      
      var json = await response.json();

      res.status(200).json(json);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Failed to draw winner.' });
      return;
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }
}
