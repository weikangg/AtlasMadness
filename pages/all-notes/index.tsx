import { useEffect, useState } from 'react';
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
    </div>
  );
}
