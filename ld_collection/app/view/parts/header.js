'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    if (token) {
      // Simula uma verificação de usuário
      setUser({ name: 'Usuário Logado' }); // Aqui você substituiria com o fetch de dados do usuário autenticado
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const routeRegisterClick = () => {
    router.push('/register');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="filter-bar">
          <option>Filtrar por...</option>
          <option>Autor</option>
          <option>Gênero</option>
          <option>Livros</option>
          <option>Documentários</option>
          <option>Artigos Científicos</option>
          </select>
      </div>
      <div className="auth-links">
        <button onClick={routeRegisterClick}>Cadastrar/Logar</button>
        {/* {user ? (
          <span className="user-name">{user.name}</span>
        ) : (
          <>
            <button onClick={handleRegisterClick}>Registrar</button>
            <button onClick={handleLoginClick}>Login</button>
          </>
        )} */}
      </div>
    </header>
  );
}
