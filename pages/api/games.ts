import { postFormData, putData } from '@/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { IncomingForm } from 'formidable';
import FormData from 'form-data';
import { promises as fs } from 'fs';

const secret = process.env.NEXTAUTH_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const token = await getToken({ req, secret });

      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      var response = await putData(`games`, {}, req);
      if (!response.ok) {
        throw new Error("Failed to add new card.")
      }
      
      var json = await response.json();

      res.status(200).json(json);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Failed to update game.' });
      return;
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }
}
