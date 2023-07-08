import { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';
import ArticleSection from '../../components/ArticleSection';
import { Card, createStyles, Center } from '@mantine/core';

type Note = {
  _id: string;
  filename: string;
  length: number;
};

const useStyles = createStyles((theme) => ({
  card: {
    marginTop: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing.md,
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function AllNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { classes } = useStyles();

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch('/api/allFiles');
      const data = await response.json();
      setNotes(Array.isArray(data) ? data : []);
    };

    getNotes();
  }, []);

  return (
    <div className={classes.header}>
      <h1>All Notes</h1>
      <ArticleSection />
      {/* <Card className={classes.card}>
            {notes.map((note, index) => (
              <ArticleCard
                key={index}
                image="https://i.imgur.com/Cij5vdL.png"
                link={`/api/files/${note._id}`}
                title={note.filename}
                description={`${note.length} bytes`}
                rating="outstanding"
                author={{
                  name: 'Bill Wormeater',
                  image:
                    'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                }}
              />
            ))}
          </Card> */}
    </div>
  );
}
