import ArticleSection from '../components/ArticleSection';
import { useState } from 'react';
import { Image } from '@mantine/core';
import test from '../images/banner.png';
import { createStyles, rem } from '@mantine/core';
import SummarizeButton from '../components/SummarizeContent/SummarizeButton';

const useStyles = createStyles((theme) => ({
  img: {
    padding: '100px',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  const [summary, setSummary] = useState<string | null>(null);

  const handleSummarizeClick = async () => {
    try {
      // Perform API request to summarize the text
      // Update the 'summary' state with the result

      // Example API request
      const response = await fetch('../api/generateSummary');
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

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
        <SummarizeButton onClick={handleSummarizeClick} />
        {summary && (
          <div>
            <h2>Summary:</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
      <ArticleSection />
    </>
  );
}