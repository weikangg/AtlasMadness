import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db, GridFSBucket } from 'mongodb';

const connectToDatabase = async (): Promise<Db> => {
  const client = new MongoClient(process.env.MONGO_URI!);
  try {
    await client.connect();
    console.log('Successfully connected to database'); // Added log
    const db = client.db('Auth');
    return db;
  } catch (error) {
    console.error('Error connecting to database: ', error); // Added error logging
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const bucket = new GridFSBucket(db);

      // Create an array to store the file data
      let filesData: any = [];

      // Create a stream and use it to read filenames from GridFS
      const stream = bucket.find({}).stream();

      stream.on('data', (doc) => {
        // Push each file data to the array
        filesData.push({
          filename: doc.filename,
          length: doc.length,
          _id: doc._id.toString(),
        });
      });

      stream.on('error', (error) => {
        res.status(500).json({ error: 'Error reading files' });
      });

      stream.on('end', () => {
        // When the stream is finished, return the files data
        res.json(filesData);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error connecting to the database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
