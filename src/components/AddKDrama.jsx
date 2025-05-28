import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddKdramas({ token }) {
  const [kdramas, setKdramas] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // ID del KDrama actualmente desplegado
  const [form, setForm] = useState({ rating: 5, review: '' });

  useEffect(() => {
    axios.get('https://pymex.azurewebsites.net/api/kdramas', {
      headers: { Authorization: token }
    }).then(res => setKdramas(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const handleAgregar = (idKDrama) => {
    setExpandedId(expandedId === idKDrama ? null : idKDrama);
    setForm({
      rating: 5,
      review: '',
      finished: false,
      recommend: false,
      watchedOn: ''
    });
  };

  const handleSubmit = async (idKDrama) => {
    try {
      await axios.post('https://pymex.azurewebsites.net/api/user-kdramas', {
        idKDrama,
        rating: form.rating,
        review: form.review,
        finished: form.finished ? 1 : 0,
        recommend: form.recommend ? 1 : 0,
        watchedOn: form.watchedOn || null
      }, {
        headers: { Authorization: token }
      });
      alert("K-Drama agregado con éxito");
      setExpandedId(null);
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  return (
    <div>
      <h2>Agregar K-Dramas</h2>
      <ul>
        {kdramas.map((k) => (
          <li key={k.idKDrama} style={{ marginBottom: '1rem' }}>
            <strong>{k.title}</strong><br />
            <em>Género:</em> {k.genre}<br />
            <em>Episodios:</em> {k.episodes}<br />
            <em>Plataforma:</em> {k.platform}<br />
            <button onClick={() => handleAgregar(k.idKDrama)}>
              {expandedId === k.idKDrama ? 'Cancelar' : 'Agregar'}
            </button>

            {expandedId === k.idKDrama && (
              <div style={{ marginTop: '0.5rem' }}>
                <label>
                  Calificación:
                  <select
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}
                  >
                    {[1, 2, 3, 4, 5].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </label>
                <br />
                <label>
                  Reseña:
                  <br />
                  <textarea
                    value={form.review}
                    onChange={e => setForm({ ...form, review: e.target.value })}
                    rows="3"
                    cols="40"
                  />
                </label>
                <br />

                <label>
                  ¿Terminaste de verlo?
                  <input
                    type="checkbox"
                    checked={form.finished}
                    onChange={e => setForm({ ...form, finished: e.target.checked })}
                  />
                </label>
                <br />

                <label>
                  ¿Lo recomendarías?
                  <input
                    type="checkbox"
                    checked={form.recommend}
                    onChange={e => setForm({ ...form, recommend: e.target.checked })}
                  />
                </label>
                <br />

                <label>
                  Fecha vista:
                  <input
                    type="date"
                    value={form.watchedOn}
                    onChange={e => setForm({ ...form, watchedOn: e.target.value })}
                  />
                </label>
                <br />
                <button onClick={() => handleSubmit(k.idKDrama)}>Guardar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}