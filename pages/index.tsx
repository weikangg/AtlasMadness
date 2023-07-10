import ArticleSection from '../components/ArticleSection';
import { ContactUs } from '../components/ContactUs';
import { useState, useEffect } from 'react';
import test from '../images/banner.png';
import { createStyles, LoadingOverlay, Image, Grid, Col } from '@mantine/core';
import FeatureCards from '../components/FeatureCards/FeatureCards';

type Note = {
  _id: string;
  filename: string;
  length: number;
  userName: string;
  title: string;
};

const useStyles = createStyles((theme) => ({
  img: {
    padding: '100px',
  },
}));

const features = [
  {
    title: 'Automatic Content Summarization',
    description: 'Effortlessly generate summaries of lecture content uploaded as PDF, DOC, or MP4 files using OpenAI. Our powerful algorithms thoroughly analyze the text, extracting key information and distilling it into comprehensive summaries. This helps you effortlessly retain crucial concepts, saving you time and enhancing your learning experience.',
  },
  {
    title: 'Multimodal File Analysis',
    description: 'Experience seamless handling of various file formats. PDF files are processed with Google Cloud Document AI for Optical Character Recognition (OCR) and text extraction. DOC files undergo direct analysis, while MP4 uploads are converted to text using Google Cloud Speech-to-Text. Enjoy comprehensive content analysis across diverse file types.',
  },
  {
    title: 'Interactive Study Toolkit',
    description: 'Access the original uploaded document and its summary in DOC format for future reference. Engage in active recall using personalized quiz cards based on the summarized content. Sign up, log in, and conveniently bookmark notes to access your study materials. Our chatbot is available to provide clarification and guidance whenever you have doubts.',
  },
];


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

  return isLoading ? (
    <LoadingOverlay visible zIndex={10} />
  ) : (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '65px', fontWeight: 'bold' }}>Welcome to SummAIze</h1>
        <h4 style={{ fontSize: '25px', fontWeight: 'bold' }}>Effortless Learning, Instant Notes</h4>
        <p style={{ fontSize: '20px', paddingLeft: '150px', paddingRight: '150px' }}>
          We are a group of students looking to streamline the process of absorbing information.
          From summarizing pdf lectures notes to video lectures, our AI powered note collation
          system helps students from all over the world condense high volumes of study materials in
          a matter of seconds.
        </p>
      <FeatureCards features={features} />
        {/* <Image className={classes.img} src={test.src} /> */}
      </div>
      <ArticleSection notes={notes} />
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
      >
        <ContactUs />
      </div>
    </>
  );
}
