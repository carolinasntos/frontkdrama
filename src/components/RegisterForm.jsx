import { useState } from 'react';
import axios from 'axios';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', form);
      alert('Usuario registrado');
    } catch (err) {
      alert(err.response?.data?.error || 'Error en registro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input placeholder="Usuario" onChange={e => setForm({...form, username: e.target.value})} />
      <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Contraseña" type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button>Registrarse</button>
    </form>
  );
}