import React from 'react';

export default function Hero({ texts }) {
    return (
        <section className="hero" id="inicio">
            {/* Background Ribbon Watermark */}
            <svg className="hero-watermark" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50,10 C36.2,10 25,21.2 25,35 C25,44.5 30.5,52.8 38.5,56.8 L20,90 L35,90 L46.5,69 L53.5,69 L65,90 L80,90 L61.5,56.8 C69.5,52.8 75,44.5 75,35 C75,21.2 63.8,10 50,10 Z M50,22 C57.2,22 63,27.8 63,35 C63,42.2 57.2,48 50,48 C42.8,48 37,42.2 37,35 C37,27.8 42.8,22 50,22 Z" />
            </svg>
            <div className="container">
                <div className="hero-wrapper">
                    <div className="hero-content">
                        <p className="hero-tag">{texts.heroTag}</p>
                        <h1 dangerouslySetInnerHTML={{ __html: texts.heroTitle || '' }}></h1>
                        <p>{texts.heroDesc}</p>
                        <div className="hero-buttons">
                            {texts.btn1Text && <a href={texts.btn1Link || "#"} className="btn-hero-primary">{texts.btn1Text}</a>}
                            {texts.btn2Text && <a href={texts.btn2Link || "#"} className="btn-hero-secondary">{texts.btn2Text}</a>}
                        </div>
                    </div>
                    <div className="hero-image">
                        {texts.heroImage ? (
                            <img src={texts.heroImage} alt="Banner Principal" />
                        ) : (
                            <div style={{ width: '100%', height: '400px', backgroundColor: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#e84a90', fontWeight: 'bold' }}>Amor Próprio</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
