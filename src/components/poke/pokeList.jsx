import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const PokeList = () => {
    const [pokemons, setPokemons] = useState([]); // Estado para almacenar los Pokémon
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/generation/1/') // Obtiene la primera generación de Pokémon
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                // Obtener detalles de cada Pokémon (incluyendo tipos)
                const fetchDetails = data.pokemon_species.slice().map(pokemon =>
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                        .then(response => response.json())
                        .then(details => ({
                            id: details.id,
                            name: details.name,
                            types: details.types.map(t => t.type.name).join(', ') // Extrae los tipos
                        }))
                );

                // Esperamos que todas las promesas se resuelvan
                Promise.all(fetchDetails).then(setPokemons);
            })
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    return (
        <div>
            <h1>Listado de Pokémon</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipos</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemons.map(pokemon => (
                        <tr key={pokemon.id}>
                            <td>{pokemon.id}</td>
                            <td>{pokemon.name}</td>
                            <td>{pokemon.types}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total de Pokémon: {pokemons.length}</p>
            <button onClick={() => navigate("/")}>Volver al Home</button>
        </div>
    );
};

export default PokeList;
