import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);  // ✅ ESTA línea es la clave
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/me', {
      headers: { Authorization: token }
    })
    .then(res => {
        console.log("Perfil recibido:", res.data);
        setProfile(res.data);
    })
    .catch(err => {
        console.error("Error al obtener el perfil:", err.response?.data || err.message);
        setError("Error al cargar el perfil");
    });
  }, [token]);

  const handleSave = () => {
    axios.put('http://localhost:3000/api/users/me', {
      username: newUsername
    }, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setProfile(res.data.user);
        setEditing(false);
      })
      .catch(err => {
        console.error("Error al actualizar perfil:", err);
        alert("Error al guardar cambios.");
      });
  };

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h2>Perfil</h2>
      <p>
        Usuario:
        {editing ? (
          <input
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        ) : (
          <> {profile.username}</>
        )}
      </p>
      <p>Email: {profile.email}</p>

      {editing ? (
        <>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>Editar usuario</button>
      )}
    </div>
  );
}