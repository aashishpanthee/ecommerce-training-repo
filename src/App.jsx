import './App.css';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductGrids from './components/ProductGrids';

function App() {
  return (
    <section>
      <Navbar />
      <Hero />
      <ProductGrids />
      <Footer />
    </section>
  );
}

export default App;
