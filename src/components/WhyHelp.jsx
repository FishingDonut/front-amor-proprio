import React from 'react';
import { Heart, Gift, Activity, BookOpen } from 'lucide-react';

export default function WhyHelp({ texts, icons }) {
    // Default icons if none provided via API
    const defaultIcons = {
        why1: <Heart size={40} strokeWidth={2.5} />,
        why2: <Gift size={40} strokeWidth={2.5} />,
        why3: <Activity size={40} strokeWidth={2.5} />,
        why4: <BookOpen size={40} strokeWidth={2.5} />
    };

    return (
        <section className="why" style={{position: 'relative', overflow: 'hidden'}}>
            <div className="container" style={{position: 'relative', zIndex: 2}}>
                <h2>{texts.whyTitle}</h2>
                <div className="why-grid">
                    <div className="why-card">
                        <div className="why-icon-wrapper" style={{ color: 'var(--primary-pink)', background: icons.why1 ? 'white' : 'var(--primary-pink-light)' }}>
                            {icons.why1 ? <img src={icons.why1} alt="Apoio Psicossocial" style={{ padding: '15%', width: '100%', height: '100%', objectFit: 'contain' }} /> : defaultIcons.why1}
                        </div>
                        <h3>Apoio Psicossocial</h3>
                        <p>{texts.why1}</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon-wrapper" style={{ color: 'var(--primary-pink)', background: icons.why2 ? 'white' : 'var(--primary-pink-light)' }}>
                            {icons.why2 ? <img src={icons.why2} alt="Recursos Práticos" style={{ padding: '15%', width: '100%', height: '100%', objectFit: 'contain' }} /> : defaultIcons.why2}
                        </div>
                        <h3>Recursos Práticos</h3>
                        <p>{texts.why2}</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon-wrapper" style={{ color: 'var(--primary-pink)', background: icons.why3 ? 'white' : 'var(--primary-pink-light)' }}>
                            {icons.why3 ? <img src={icons.why3} alt="Pesquisa e Diagnóstico" style={{ padding: '15%', width: '100%', height: '100%', objectFit: 'contain' }} /> : defaultIcons.why3}
                        </div>
                        <h3>Pesquisa e Diagnóstico</h3>
                        <p>{texts.why3}</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon-wrapper" style={{ color: 'var(--primary-pink)', background: icons.why4 ? 'white' : 'var(--primary-pink-light)' }}>
                            {icons.why4 ? <img src={icons.why4} alt="Educação e Conscientização" style={{ padding: '15%', width: '100%', height: '100%', objectFit: 'contain' }} /> : defaultIcons.why4}
                        </div>
                        <h3>Educação e Conscientização</h3>
                        <p>{texts.why4}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
