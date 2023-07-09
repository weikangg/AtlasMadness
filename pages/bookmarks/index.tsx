import { useEffect, useState } from 'react';
import ArticleSection from '../../components/ArticleSection';
import { Card, createStyles, Center } from '@mantine/core';
import { useSession } from 'next-auth/react';

type Note = {
  _id: string;
  filename: string;
  length: number;
  userName: string;
  title: string;
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

export default function AllBookmarksPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { classes } = useStyles();
  const { data: session, status: loading } = useSession();
  const removeNote = (noteId: string) => {
    setNotes(notes.filter(note => note._id !== noteId));
  };
  useEffect(() => {
    const getNotes = async () => {
      if (session?.user?.email) {
        console.log(session?.user?.email);
        const response = await fetch(`/api/allBookmarks?email=${session?.user?.email}`);
        const data = await response.json();
        setNotes(Array.isArray(data) ? data : []);
      }
    };

    getNotes();
    console.log(notes);
  }, [session, loading]);

  return (
    <div className={classes.header}>
      <h1>All Bookmarks</h1>
      <ArticleSection notes={notes} removeNote={removeNote}/>
    </div>
  );
}
