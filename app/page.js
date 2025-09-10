import Greeting from '../components/Greeting';

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Welcome to the Testing Demo!</h1>
      <Greeting name="Tester" />
    </main>
  );
}
