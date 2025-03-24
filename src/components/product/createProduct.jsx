import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  // Productos precargados
  const productosIniciales = [
    { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
    { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
    { id: 3, nombre: "Mouse", precio: 30, stock: 40 }
  ];

  // Usamos el useEffect para verificar si ya hay productos en el localStorage
  useEffect(() => {
    // Verificamos si hay productos guardados en el localStorage
    const productosGuardados = JSON.parse(localStorage.getItem("productos"));
    
    // Si no hay productos en el localStorage, guardamos los productos iniciales
    if (!productosGuardados || productosGuardados.length === 0) {
      localStorage.setItem("productos", JSON.stringify(productosIniciales));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre || !precio || !stock) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Obtener los productos guardados y el último id
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const ultimoId = productosGuardados.length > 0 ? productosGuardados[productosGuardados.length - 1].id : 0;

    // Crear el nuevo producto con un id autoincremental
    const nuevoProducto = {
      id: ultimoId + 1,  // Incrementa el último id guardado
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock, 10)
    };

    // Guardar el nuevo producto en el localStorage
    productosGuardados.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productosGuardados));

    navigate("/productos"); // Redirigir a la lista de productos
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Precio:</label>
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />

        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />

        <button type="submit">Agregar Producto</button>
      </form>
      <button onClick={() => navigate("/")}>Volver al Home</button> {/* Botón para volver */}
    </div>
  );
};

export default CreateProduct;
