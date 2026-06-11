import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials({ texts, testimonials }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const displayTestimonials = testimonials || [];
    const slidesCount = displayTestimonials.length;

    useEffect(() => {
        if (slidesCount <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesCount);
        }, 6000);
        return () => clearInterval(interval);
    }, [slidesCount]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesCount);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);

    return (
        <section className="testimonials" id="testemunhos">
            <div className="container">
                <div className="testimonials-header">
                    <div className="testimonials-icon">
                        <Heart style={{ fill: 'var(--primary-pink)', color: 'var(--primary-pink)', width: '64px', height: '64px' }} />
                    </div>
                    <h2>Testemunhos</h2>
                    <p>Historias reais de mulheres e apoiadores que fazem parte da nossa missão. Cada palavra nos inspira a continuar acolhendo, cuidando e transformando vidas</p>
                </div>

                <div className="carousel-container">
                    {slidesCount > 1 && (
                        <button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label="Depoimento anterior">
                            <ChevronLeft />
                        </button>
                    )}
                    
                    <div className="carousel-track-wrapper">
                        <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {slidesCount === 0 ? (
                                <div className="carousel-slide">
                                    <p className="testimonial-message">Nenhum depoimento disponível no momento.</p>
                                </div>
                            ) : (
                                displayTestimonials.map((test, idx) => (
                                    <div key={idx} className="carousel-slide">
                                        <div className="testimonial-quote-icon">
                                            <img src="/assets/aspas-testemunha.png" alt="aspas" style={{ width: '40px', height: 'auto' }} />
                                        </div>
                                        <p className="testimonial-message">{test.message || test.mensage || ""}</p>
                                        <div className="testimonial-divider">
                                            <img src="/assets/coracao-testemunha.png" alt="coração" style={{ width: '20px', height: 'auto' }} />
                                        </div>
                                        <div className="testimonial-user">
                                            <div className="testimonial-avatar-wrapper" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {test.img ? (
                                                    <img className="testimonial-avatar" src={test.img} alt={test.user_name || "Anônima"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <Heart size={24} color="#e84a90" fill="#e84a90" />
                                                )}
                                            </div>
                                            <div className="testimonial-name">{test.user_name || "Anônima"}</div>
                                            <div className="testimonial-role">{test.staff || "Acolhida"}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {slidesCount > 1 && (
                        <button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label="Próximo depoimento">
                            <ChevronRight />
                        </button>
                    )}

                    <div className="carousel-dots">
                        {displayTestimonials.length > 1 && displayTestimonials.map((_, idx) => (
                            <button 
                                key={idx}
                                className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(idx)}
                                aria-label={`Ir para depoimento ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Ribbon Background watermark SVG */}
            <svg className="testimonials-watermark" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50,10 C36.2,10 25,21.2 25,35 C25,44.5 30.5,52.8 38.5,56.8 L20,90 L35,90 L46.5,69 L53.5,69 L65,90 L80,90 L61.5,56.8 C69.5,52.8 75,44.5 75,35 C75,21.2 63.8,10 50,10 Z M50,22 C57.2,22 63,27.8 63,35 C63,42.2 57.2,48 50,48 C42.8,48 37,42.2 37,35 C37,27.8 42.8,22 50,22 Z" />
            </svg>
        </section>
    );
}
