import { useRouter } from 'next/router';
import { TableOfContents } from './tableOfContents';
import { Grid, Container } from '@mantine/core';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { DownloadButton } from '../../../components/details/DownloadButton';

interface Note {
  title: string;
  description: string;
  summary: string;
  fileId: ObjectId;
}

interface PageProps {
  note: Note;
}

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

export async function getServerSideProps(context: any) {
  const db = await connectToDatabase();
  const { params } = context;

  // Assuming the note's ID is passed as a URL parameter and
  // you have a `notes` collection in your MongoDB database

  const note = await db.collection('summaries').findOne({ fileId: new ObjectId(params.id) });

  // The note object can be directly included in props if it's serializable.
  // If not, you might need to convert it to a JSON string and then parse it back in the component.

  return {
    props: {
      note: JSON.parse(JSON.stringify(note)),
    },
  };
}
const links = [
  {
    label: 'Description',
    id: 'summary',
    order: 0,
  },
  {
    label: 'Summary',
    id: 'keypoints',
    order: 0,
  },
  {
    label: 'Quiz Cards',
    id: 'notes',
    order: 0,
  },
];

export default function Page({ note }: PageProps) {
  const router = useRouter();
  return (
    <Container>
      <h2>{note.title}</h2>
      <Grid>
        <Grid.Col xs={0} sm={3}>
          <TableOfContents id="100" links={links} />
        </Grid.Col>
        <Grid.Col xs={12} sm={9}>
          <h4 id="keypoints">Description</h4>
          <p>{note.description}</p>
          <h4 id="summary">Summary</h4>
          <p>{note.summary}</p>
          <h4 id="notes">Quiz Cards</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci
            molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo
            eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci
            molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo
            eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci
            molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo
            eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.
          </p>
          <p>
            Lorem ipsum, dolor sit ametß consectetur adipisicing elit. Recusandae quod adipisci
            molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo
            eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae quod adipisci
            molestias, fugit nobis mollitia cumque perferendis veniam aliquid? Blanditiis illo
            eveniet suscipit minima ea quam doloribus officiis. Voluptas, consequatur.
          </p>
          <DownloadButton fileId={note.fileId} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
