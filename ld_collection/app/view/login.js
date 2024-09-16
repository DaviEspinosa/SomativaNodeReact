'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/view/parts/header.js';

function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Armazena o token JWT no localStorage

            // Redireciona para o dashboard após login bem-sucedido
            router.push('/dashboard');
        } else {
            console.error('Erro ao fazer login');
        }
    };

    // Método para redirecionar para a tela de registro
    const handleRegister = () => {
        router.push('/register'); // Redireciona para a página de registro
    };

    return (
        <div className="Login">

            <div>
                <Header />
            </div>
            <div class="bodyLoginUser">
                <div class="background"></div>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div class="box-inputs">
                        <div>
                            <input
                                placeholder="E-mail"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Senha"
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <a style={{ fontSize: 'small' }} href="">Esqueceu sua senha?</a>
                    </div>
                    <div class="buttonsLoginPage">
                        <button type="submit">Login</button>
                        <a href="" onClick={handleRegister}>Cadastrar-se</a>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default LoginForm;
