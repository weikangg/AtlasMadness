import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Layout from '../components/navigation/Layout';
import ArticleSection from '../components/ArticleSection';

export default function HomePage() {
  return (
    <Layout>
      <ColorSchemeToggle />
      <div style={{ padding: '20px', textAlign:'center' }}>
        <h1 style={{ fontSize: '45px', fontWeight: 'bold'}}>
          Welcome to SummAIze
        </h1>
        <p style={{ fontSize: '20px', paddingLeft:"150px", paddingRight:"150px"}}>
          We are a group of students looking to streamline the process of absorbing information. 
          From summarizing pdf lectures notes to video lectures, our AI powered note collation system
          helps students from all over the world condense high volumes of study materials in a matter
          of seconds.
        </p>
      </div>
    <ArticleSection/>
    </Layout>
  );
}
