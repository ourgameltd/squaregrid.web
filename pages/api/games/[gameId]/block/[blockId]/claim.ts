import { postDataAnonymous } from '@/api';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { gameId, blockId } = req.query;

      if (!gameId) {
        res.status(400).json({ message: 'Missing gameId in the request.' });
        return;
      }
      
      if (!blockId) {
        res.status(400).json({ message: 'Missing blockId in the request.' });
        return;
      }

      var response = await postDataAnonymous(`games/${gameId}/block/${blockId}/claim`, req.body);
      
      if (!response.ok) {
        throw new Error("Failed to claim cell.")
      }

      res.status(200).json({ message: 'Claimed cell.' });
      return;
    } catch (error) {
      res.status(500).json({ message: 'Failed to claim cell, it may just have been taken.' });
      return;
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }
}
