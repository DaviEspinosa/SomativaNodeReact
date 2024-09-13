'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/view/parts/header.js'


function Dashboard() {
    const [biblioteca, setBiblioteca] = useState([]);
    const [newBiblioteca, setNewBiblioteca] = useState({
        title: '',
        autor: '',
        anoPublicacao: '',
        genero: '',
        descricao: ''
    });

    useEffect(() => {
        fetchBiblioteca();
    }, []);

    const fetchBiblioteca = async () => {
        const response = await fetch('/api/biblioteca');
        const data = await response.json();
        setBiblioteca(data.data);
    };

    const addBiblioteca = async () => {
        const response = await fetch('/api/biblioteca', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBiblioteca),
        });
        const data = await response.json();
        setBiblioteca([...biblioteca, data.data]);
        setNewBiblioteca({
            title: '',
            autor: '',
            anoPublicacao: '',
            genero: '',
            descricao: ''
        });
    };

    const deleteBiblioteca = async (id) => {
        await fetch(`/api/biblioteca/${id}`, {
            method: 'DELETE',
        });
        setBiblioteca(biblioteca.filter((biblioteca) => biblioteca._id !== id));
    };

    // Aparecer cadastro de livros
    function toggleDiv() {
        var showForm = document.getElementById('formCadLivros')
        if (showForm.style.display === 'none' || showForm.style.display === '') {
            showForm.style.display = 'block'
        }
        else if (showForm.style.display === 'block') {
            showForm.style.display = 'none'
        }
    }

    return (
        <div class="Livros">
            <div>
                <Header/>
            </div>
            <button class="adicionarLivro" onClick={toggleDiv}>+</button>
            <div class="formCadLivros" id="formCadLivros">
                <h1>Cadastre um Livro ou Artigo</h1>
                <div class="inputsBox">
                    <div class="left">
                        <input
                            type="text"
                            placeholder="Título"
                            value={newBiblioteca.title}
                            onChange={(e) => setNewBiblioteca({ ...newBiblioteca, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Autor"
                            value={newBiblioteca.autor}
                            onChange={(e) => setNewBiblioteca({ ...newBiblioteca, autor: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Ano de Publicação"
                            value={newBiblioteca.anoPublicacao}
                            onChange={(e) => setNewBiblioteca({ ...newBiblioteca, anoPublicacao: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Gênero"
                            value={newBiblioteca.genero}
                            onChange={(e) => setNewBiblioteca({ ...newBiblioteca, genero: e.target.value })}
                        />
                    </div>
                    <div class="right">
                        <textarea
                            type="text"
                            placeholder="Descrição"
                            value={newBiblioteca.descricao}
                            onChange={(e) => setNewBiblioteca({ ...newBiblioteca, descricao: e.target.value })}
                        />
                    </div>
                </div>
                <button onClick={addBiblioteca}>Adicionar</button>
            </div>
            <ul className="container-cards">
                {biblioteca.map((item) => (
                    <li className={`card ${item.showMore ? 'expanded' : ''}`} key={item._id}>
                        <div className="card-image">
                            {/* Se você tiver uma URL de imagem, pode ser usada aqui */}
                            <img src={item.imageUrl || '/path/to/default-image.jpg'} alt={item.title} />
                        </div>
                        <div className="card-content">
                            <h3>{item.title}</h3>
                            <p><strong>Autor:</strong> {item.autor}</p>
                            <p><strong>Ano de Publicação:</strong> {item.anoPublicacao}</p>
                            <p><strong>Gênero:</strong> {item.genero}</p>
                            {/* <div className="description-container">
                                <p className="description-text">
                                    <span>{item.descricao}</span>
                                </p>
                                <button className="toggle-description" onClick={() => toggleDescription(item._id)}>
                                    {item.showMore ? 'Ver Menos' : 'Ver Mais'}
                                </button>
                            </div> */}
                            <button onClick={() => deleteBiblioteca(item._id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    );
}

export default Dashboard;
