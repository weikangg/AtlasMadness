import ArticleSection from '../components/ArticleSection';
import { useState, useEffect } from 'react';
import { Image } from '@mantine/core';
import test from '../images/banner.png';
import { createStyles, rem } from '@mantine/core';

type Note = {
  _id: string;
  filename: string;
  length: number;
  fileAuthor: string;
  fileTitle: string;
};

const useStyles = createStyles((theme) => ({
  img: {
    padding: '100px',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch('/api/allFiles');
      const data = await response.json();
      setNotes(Array.isArray(data) ? data : []);
      setIsLoading(false);
    };

    getNotes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Replace this with a loading spinner or similar if you want.
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '-60px' }}>
        <h1 style={{ fontSize: '65px', fontWeight: 'bold' }}>Welcome to SummAIze</h1>
        <p style={{ fontSize: '20px', paddingLeft: '150px', paddingRight: '150px' }}>
          We are a group of students looking to streamline the process of absorbing information.
          From summarizing pdf lectures notes to video lectures, our AI powered note collation
          system helps students from all over the world condense high volumes of study materials in
          a matter of seconds.
        </p>
        <Image className={classes.img} src={test.src} />
      </div>
      <ArticleSection notes={notes} />
    </>
  );
}
