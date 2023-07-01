import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db, GridFSBucket } from 'mongodb';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const connectToDatabase = async (): Promise<Db> => {
  const client = new MongoClient(process.env.MONGO_URI!);
  try {
    await client.connect();
    const db = client.db('Auth');
    return db;
  } catch (error) {
    console.error('Error connecting to database: ', error); // Added error logging
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error parsing form data:', err);
          reject(err);
          return;
        }
        console.log(files); // log the files object
        resolve({ fields, files });
      });

      // Reject the promise after 5 seconds
      setTimeout(() => reject(new Error('Form parse timeout')), 5000);
    });

    try {
      const db = await connectToDatabase();
      const bucket = new GridFSBucket(db);

      // Assuming only one file is uploaded at a time
      const file = data.files.file[0]; // access the first file in the array
      const readStream = fs.createReadStream(file.filepath); // use `filepath` instead of `path`
      const uploadStream = bucket.openUploadStream(file.originalFilename); // use `originalFilename` instead of `name`

      readStream.pipe(uploadStream);

      uploadStream.on('finish', () => {
        res.status(200).json({ message: 'File uploaded successfully' });
        return;
      });

      uploadStream.on('error', (error) => {
        res.status(500).json({ error: 'Error uploading file' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error connecting to the database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
