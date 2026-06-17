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
                        <img src="/assets/coracao-testemunha.png" alt="Coração" style={{ width: '80px', height: 'auto' }} />
                    </div>
                    <h2>Testemunhos</h2>
                    <p>Historias reais de mulheres e apoiadores que fazem parte da nossa missão. Cada palavra nos inspira a continuar acolhendo, cuidando e transformando vidas</p>
                    <div className="testimonial-quote-divider" style={{ marginTop: '24px', marginBottom: '0' }}>
                        <img src="/assets/linha-testemunha-aspa.png" alt="linha" className="quote-line" />
                        <img src="/assets/aspas-testemunha.png" alt="aspas" className="quote-icon" />
                        <img src="/assets/linha-testemunha-aspa.png" alt="linha" className="quote-line" />
                    </div>
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
            {/* Ribbon Background watermark IMAGE */}
            <div className="testimonials-watermark-img">
                <img src="/assets/fita-rosa.png" alt="Marca d'água Fita Rosa" />
            </div>
        </section>
    );
}
