import { postFormData } from '@/api';
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
  if (req.method === 'POST') {
    try {
      const token = await getToken({ req, secret });

      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { gameId } = req.query;

      if (!gameId) {
        res.status(400).json({ message: 'Missing gameId in the request.' });
        return;
      }

      const formOutput = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
        const form = new IncomingForm({
          multiples: false
        })
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err)
          resolve({ fields, files })
        })
      });

      const uploads = formOutput.files.file
      let file: any = null;

      if (Array.isArray(uploads)) {
        file = uploads[0];
      }

      const formData = new FormData()

      if (file) {
        const image = await fs.readFile(file.filepath)
        formData.append('imageFile', image, { filename: file.originalFilename })
      }

      if (formOutput.fields.json) {
        formData.append('json', formOutput.fields.json[0], { contentType: "application/json" });
      }
      await postFormData(`games/${gameId}`, formData, req);
      res.status(200).json({ message: 'Updated game.' });
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
