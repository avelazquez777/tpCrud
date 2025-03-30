import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProductList from "./components/product/productList";
import CreateProduct from "./components/product/createProduct";
import PokeList from "./components/poke/pokeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/nuevos-productos" element={<CreateProduct />} />
        <Route path="/pokeList" element={<PokeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
