import { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://pymex.azurewebsites.net/api/auth/login', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Token recibido:', res.data.token); // 👈 para verificar
      onLogin(res.data.token);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Error en login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Contraseña" type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button>Iniciar sesión</button>
    </form>
  );
}