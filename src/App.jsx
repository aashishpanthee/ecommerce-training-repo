import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductGrids from "./components/ProductGrids";

function App() {
  return (
    <section>
      <Navbar />
      <Hero />
      <ProductGrids />
    </section>
  );
}

export default App;
