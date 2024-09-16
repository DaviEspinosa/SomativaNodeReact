'use client';

import { useEffect, useState } from 'react';
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
    const [hydrated, setHydrated] = useState(false);

    // Verifica se o componente foi montado no cliente
    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        // Impede a renderização antes da montagem no cliente
        return null;
    }

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
            router.push('/login ')
        } else {
            console.error('Erro ao registrar usuário');
        }
    };

    return (
        <div class="Registrar">
            <div>
                <Header />
            </div>
            <div class="bodyRegisterUser">

                <div class="background"></div>
                <div class="left">
                    <div class="description">
                        <h1>Quer conhecer sobre qualquer assunto?</h1>
                        <p>A LDCollection  é o lugar certo!!</p>
                    </div>
                </div>
                <div class="right">
                    <form onSubmit={handleSubmit}>
                        <h2>Registrar</h2>

                        <div class="box-inputs">
                            <div>

                                <input
                                    placeholder='Nome'
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>

                                <input
                                    placeholder='Cpf'
                                    type="text"
                                    name="cpf"
                                // value={formData.nome}
                                // onChange={handleChange}
                                // required
                                />
                            </div>
                            <div>

                                <input
                                    placeholder='E-mail'
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>

                                <input
                                    placeholder='Senha'
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>

                                <input
                                    placeholder='Confirme sua senha'
                                    type="password"
                                    name="senha"
                                //     value={formData.senha}
                                //     onChange={handleChange}
                                //     required
                                />
                            </div>
                        </div>
                        <button onClick={addUsuario} type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
