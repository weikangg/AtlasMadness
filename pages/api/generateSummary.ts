import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import { OpenAIApi, Configuration } from 'openai';

// Connect to MongoDB and return the database instance
const connectToDatabase = async (): Promise<Db> => {
  const client = new MongoClient(process.env.MONGO_URI!);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const db = client.db('Auth'); // Replace with your database name
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    throw error;
  }
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Summarize the content using OpenAI
const summarizeContent = async (content: string): Promise<string> => {
  const prompt = `Summarize: ${content}`;

  // Create an instance of OpenAI with your API key
  const openai = new OpenAIApi(configuration);

  // Make a request to the OpenAI API to generate the summary
  const response = await openai.createCompletion({
    model: 'text-davinci-003', // Choose the appropriate OpenAI model
    prompt,
    max_tokens: 100, // Adjust the maximum number of tokens as needed
    temperature: 0.7, // Adjust the temperature for controlling randomness
    n: 1, // Generate a single response
    stop: '\n', // Stop generation at the first line break
  });

  // Extract the summary from the response
  const summary = response.data.choices[0]?.text?.trim() || '';

  return summary;
};

// API endpoint handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();

    // Fetch the text data from MongoDB collection
    const collection = db.collection('fs.files'); // Replace with your collection name
    const data = await collection.find().toArray();

    // Process each data item and generate the summary
    const processedData = await Promise.all(
      data.map(async (item) => {
        const summary = await summarizeContent(item.text);
        return {
          _id: item._id,
          text: item.text,
          summary,
        };
      })
    );

    res.status(200).json(processedData);
  } catch (error) {
    console.error('Error processing data: ', error);
    res.status(500).json({ error: 'An error occurred while processing the data.' });
  }
};

export default handler;
