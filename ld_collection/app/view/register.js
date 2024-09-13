'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/view/parts/header.js';


function RegisterForm() {
    const router = useRouter();
    const [usuario, setUsuario] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addUsuario = async () => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setUsuario([...usuario, data.data]);
        setFormData({
            nome: '',
            email: '',
            senha: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token JWT no localStorage

            // Redireciona para a página do Dashboard após o registro bem-sucedido
            router.push('/dashboard');
        } else {
            console.error('Erro ao registrar usuário');
        }
    };

    return (
        <div class="Registrar">
            <div>
                <Header />
            </div>
            <body class="bodyRegisterUser">

                <div class="left">
                    
                </div>
                <div class="right">
                    <h1>Registrar</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Senha</label>
                            <input
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button onClick={addUsuario} type="submit">Registrar</button>
                    </form>
                </div>
            </body>
        </div>
    );
}

export default RegisterForm;
