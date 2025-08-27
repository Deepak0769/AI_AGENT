import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Aegis</Link>
        <div>
          {token ? (
            <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
          ) : (
            <Link to="/login" className="btn btn-ghost">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
