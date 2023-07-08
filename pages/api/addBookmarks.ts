import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';

const connectToDatabase = async (): Promise<Db> => {
  const client = new MongoClient(process.env.MONGO_URI!);
  try {
    await client.connect();
    const db = client.db('test');
    return db;
  } catch (error) {
    console.error('Error connecting to database: ', error); // Added error logging
    throw error;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { email, articleId } = req.body;
        console.log(email);
        console.log(articleId);
        if (!email || !articleId) {
          return res.status(400).json({ error: 'Missing email or articleId' });
        }

        const db = await connectToDatabase();
        const user = await db
          .collection('users')
          .findOneAndUpdate(
            { email },
            { $addToSet: { bookmarks: articleId } },
            { returnDocument: 'after', upsert: true }
          );
        console.log('bookmarked article', email);
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json({ error: 'Unable to bookmark article' });
      }

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
