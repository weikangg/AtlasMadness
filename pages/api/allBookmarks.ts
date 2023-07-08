import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db, ObjectId, GridFSBucket } from 'mongodb';

const connectToDatabase = async (databaseName: string): Promise<Db> => {
  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();
  const db = client.db(databaseName);
  return db;
};

const getChunkData = (bucket: GridFSBucket, fileId: ObjectId): Promise<any> => {
  return new Promise((resolve, reject) => {
    let fileData: any = [];

    const stream = bucket.openDownloadStream(fileId);

    stream.on('data', (chunk) => {
      fileData.push(chunk);
    });

    stream.on('error', reject);

    stream.on('end', () => {
      resolve(Buffer.concat(fileData).toString('utf8'));
    });
  });
};

const getData = async (authDb: Db, bookmarkId: ObjectId): Promise<any> => {
  const file = await authDb.collection('fs.files').findOne({ _id: bookmarkId });

  if (!file) {
    throw new Error(`File with id ${bookmarkId} not found`);
  }

  const bucket = new GridFSBucket(authDb);
  const fileData = await getChunkData(bucket, bookmarkId);

  const summary = await authDb.collection('summaries').findOne({ fileId: bookmarkId });

  if (!summary) {
    throw new Error(`Summary with id ${bookmarkId} not found`);
  }

  return {
    filename: file.filename,
    length: file.length,
    data: fileData,
    title: summary.title,
    description: summary.description,
    summary: summary.summary,
  };
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const email = req.query.email;
      console.log(email);
      const testDb = await connectToDatabase('test');
      const authDb = await connectToDatabase('Auth');

      const user = await testDb.collection('users').findOne({ email: email });
      console.log(user);
      if (user) {
        const bookmarks = user.bookmarks;
        console.log(bookmarks);
        const dataPromises = bookmarks.map((id: string) => getData(authDb, new ObjectId(id)));
        const data = await Promise.allSettled(dataPromises);
        console.log(data);
        const successfulData = data
          .filter((result) => result.status === 'fulfilled')
          .map((result: any) => result.value);

        res.status(200).json(successfulData);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error connecting to the database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
