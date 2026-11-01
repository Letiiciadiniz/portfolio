import Home from './components/Home';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';

export default function Page() {
  return (
    <main className="min-h-screen">
      <Home />
      <Portfolio />
      <About />
      <Contact />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Leticia Diniz
          </p>
        </div>
      </footer>
    </main>
  );
}
