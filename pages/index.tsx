import Layout from '../components/navigation/Layout';
import ArticleSection from '../components/ArticleSection';
import { Image } from '@mantine/core';
import test from '../images/banner.png';
import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  img: {
    padding: '50px',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

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
      <ArticleSection />
    </>
  );
}
