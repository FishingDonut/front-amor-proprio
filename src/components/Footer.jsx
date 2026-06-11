import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ texts, logoUrl }) {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="#" className="logo">
                            <img src={logoUrl || 'https://i.ibb.co/LXTbJMtQ/Novo-Projeto.png'} alt="Amor Própria" />
                        </a>
                        <p>Mulheres na luta contra o câncer. Rede de apoio, acolhimento, orientação e empoderamento.</p>
                    </div>
                    <div className="footer-contact">
                        <div className="contact-item">
                            <MapPin size={18} />
                            <p>{texts.address || "Itajaí, Santa Catarina"}</p>
                        </div>
                        <div className="contact-item">
                            <Phone size={18} />
                            <p>{texts.phone || "(47) 99999-9999"}</p>
                        </div>
                        <div className="contact-item">
                            <Mail size={18} />
                            <p>{texts.email || "contato@amorproprioitajai.org.br"}</p>
                        </div>
                    </div>
                    <div className="footer-social">
                        <h3>Redes Sociais</h3>
                        <div className="social-links">
                            <a href={texts.instaLink || "#"} target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href={texts.fbLink || "#"} target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>{texts.copyright || "© 2026 Amor Próprio de Itajaí. Todos os direitos reservados."}</p>
                    <Link to="/login" className="admin-link">Acesso adm</Link>
                </div>
            </div>
        </footer>
    );
}
