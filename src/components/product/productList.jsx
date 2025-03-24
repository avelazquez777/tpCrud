import { useState, useEffect } from "react";
import ProductItem from "./productItem";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);
  }, []);

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
  };

  const eliminarTodos = () => {
    if (window.confirm("¿Seguro que deseas eliminar todos los productos?")) {
      setProductos([]);
      localStorage.removeItem("productos");
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <button onClick={eliminarTodos}>Eliminar Todos</button>
      <button onClick={() => navigate("/")}>Volver al Home</button> 
      <button onClick={() => navigate("/nuevos-productos")}>Agregar Nuevo Producto</button> 
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productos.map(producto => (
            <ProductItem key={producto.id} producto={producto} eliminarProducto={eliminarProducto} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
