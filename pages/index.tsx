import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Layout from '../components/navigation/Layout';

export default function HomePage() {
  return (
    <Layout>
      <div>Hello world</div>
      <ColorSchemeToggle />
    </Layout>
  );
}
