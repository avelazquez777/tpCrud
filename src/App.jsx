import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProductList from "./components/product/productList";
import CreateProduct from "./components/product/createProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/nuevos-productos" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
