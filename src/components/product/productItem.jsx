import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ producto, eliminarProducto }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);
  const navigate = useNavigate(); // Hook para navegar

  const actualizarProducto = () => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const nuevosProductos = productosGuardados.map(p =>
      p.id === producto.id ? { ...p, nombre, precio: parseFloat(precio), stock: parseInt(stock, 10) } : p
    );
    
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    setModoEdicion(false);
  };

  return (
    <li>
      {modoEdicion ? (
        <>
          <input type="number" value={producto.id} disabled /> {/* Mostrar id sin editar */}
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          <button onClick={actualizarProducto}>Guardar</button>
        </>
      ) : (
        <>
          <span>ID: {producto.id} - {producto.nombre} - ${producto.precio} - Stock: {producto.stock}</span>
          <button onClick={() => setModoEdicion(true)}>Editar</button>
          <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
        </>
      )}
    </li>
  );
};

export default ProductItem;
