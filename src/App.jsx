import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import MyKdramas from './components/MyKdramas'; 
import AddKDrama from './components/AddKDrama'; 

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token')); 

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); 
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null); // borra estado
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>My KDramaS</h1>

        {!token ? (
          <>
            <RegisterForm />
            <hr />
            <LoginForm onLogin={setToken} />
          </>
        ) : (
          <>
            <nav style={{ marginBottom: '1rem' }}>
              <Link to="/profile">Perfil</Link> |{' '}
              <Link to="/my-kdramas">K-Dramas Vistos</Link> |{' '}
              <Link to="/add-kdramas">Agregar K-Dramas</Link>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </nav>

            <Routes>
              <Route path="/profile" element={<Profile token={token} />} />
              <Route path="/my-kdramas" element={<MyKdramas token={token} />} />
              <Route path="/add-kdramas" element={<AddKDrama token={token} />} />
              <Route path="*" element={<Navigate to="/profile" />} /> {/* Redirección por defecto */}
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;