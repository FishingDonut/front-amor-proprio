import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ logoUrl, donateLink }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="container">
                <a href="#" className="logo">
                    <img src={logoUrl || 'https://i.ibb.co/LXTbJMtQ/Novo-Projeto.png'} alt="Amor Própria" />
                </a>
                
                <button className="mobile-nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
                    {isOpen ? <X /> : <Menu />}
                </button>

                <nav id="navbar" className={isOpen ? 'open' : ''}>
                    <ul>
                        <li><a href="#" className="active" onClick={() => setIsOpen(false)}>Início</a></li>
                        <li><a href="#sobre-nos" onClick={() => setIsOpen(false)}>Sobre Nós</a></li>
                        <li><a href="#atividades" onClick={() => setIsOpen(false)}>Atividades</a></li>
                        <li><a href="#testemunhos" onClick={() => setIsOpen(false)}>Testemunhos</a></li>
                        {/* <li>
                            <a href={donateLink || "https://wa.me/5547999782324"} className="btn-nav-donate" onClick={() => setIsOpen(false)}>
                                Doe Agora
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
