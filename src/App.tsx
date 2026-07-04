import Nav from './components/Nav';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="h-[100dvh] overflow-hidden bg-black text-white">
      <Nav />
      <main className="h-[100dvh] overflow-hidden">
        <Hero />
      </main>
    </div>
  );
}
