import React from 'react';

export default function Hero({ texts }) {
    return (
        <section className="hero" id="inicio">
            {/* Background Watermarks */}
            <div className="hero-hands-watermark">
                <img src="/assets/foto-fundo.png" alt="Desenho de mãos" />
            </div>
            <div className="hero-ribbon-watermark">
                <img src="/assets/fita-rosa.png" alt="Fita Rosa" />
            </div>
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
