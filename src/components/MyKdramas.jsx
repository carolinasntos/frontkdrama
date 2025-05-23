import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyKdramas({ token }) {
    const [userKdramas, setUserKdramas] = useState([]); // ✅ aquí declaras ambos
  //const [kdramas, setKdramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/user-kdramas', {
      headers: { Authorization: token }
    })
      .then(res => {
        setUserKdramas(res.data);
        /*const userKdramas = res.data || [];
        console.log("RESPUESTA DEL BACKEND:", res.data);*/ // 👈 IMPORTANTE
        /*const kdramasFiltrados = userKdramas
            .map(uk => uk.KDrama)
            .filter(k => k !== undefined && k !== null); // solo si existen

        setKdramas(kdramasFiltrados);*/
      })
      .catch(err => {
        console.error(err);
        setError("Error al cargar tus K-Dramas");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (idUserKDrama) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este K-Drama?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/user-kdramas/${idUserKDrama}`, {
        headers: { Authorization: token }
      });
      setUserKdramas(prev => prev.filter(item => item.idUserKDrama !== idUserKDrama));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("No se pudo eliminar.");
    }
  };

  if (loading) return <p>Cargando K-Dramas...</p>;
  if (error) return <p>{error}</p>;
  if (userKdramas.length === 0) return <p>No has calificado ningún K-Drama aún.</p>;

  return (
    <div>
      <h2>Mis K-Dramas Calificados</h2>
      <ul>
        {userKdramas.map((item, i) => (
          <li key={item.idUserKDrama}>
            <strong>{item.KDrama?.title || "Título desconocido"}</strong><br />
            {item.review && <em>Reseña:</em>} {item.review || "(sin reseña)"}<br />
            {item.rating && <span>⭐ Calificación: {item.rating}/5</span>}<br />
            {item.watchedOn && <> Visto el: {new Date(item.watchedOn).toLocaleDateString()}</>}<br />

            <button onClick={() => handleDelete(item.idUserKDrama)}>Eliminar</button>

          </li>
        ))}
      </ul>
    </div>
  );
}