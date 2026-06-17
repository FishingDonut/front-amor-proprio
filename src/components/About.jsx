import React, { useState } from 'react';
import { Play } from 'lucide-react';
import localThumb from '../assets/tumb-de-video.png';
import whatsappIcon from '../assets/whatsapp-icon.png';

export default function About({ texts }) {
    const [isPlaying, setIsPlaying] = useState(false);
    // Prioritize video from API (Media ID 7), fallback to local path
    const videoUrl = texts.aboutVideo || '/mp4/videoamorproprio.mp4';

    return (
        <section className="about" id="sobre-nos">
            {/* Background Ribbon Watermark IMAGE */}
            <div className="about-ribbon-watermark-img">
                <img src="/assets/fita-rosa.png" alt="Marca d'água Fita Rosa" />
            </div>

            <div className="container">
                <div className="about-header" style={{position: 'relative', zIndex: 2}}>
                    <h2>Sobre Nós</h2>
                    <p className="subtitle">Venha Nós conhecer e ajudar-nos</p>
                </div>
                
                <div className="about-wrapper">
                    <div className="about-video">
                        {!isPlaying ? (
                            <div className="about-video-thumbnail" 
                                 style={{
                                     backgroundImage: `url('${localThumb}')`,
                                     backgroundColor: '#fce7f3',
                                     backgroundSize: 'contain',
                                     backgroundRepeat: 'no-repeat',
                                     backgroundPosition: 'center',
                                     cursor: 'pointer'
                                 }}
                                 onClick={() => setIsPlaying(true)}>
                                <div className="about-video-play">
                                    <Play style={{ fill: 'currentColor', width: '32px', height: '32px', marginLeft: '4px' }} />
                                </div>
                            </div>
                        ) : (
                            <div style={{ width: '100%', height: '100%' }}>
                                {videoUrl ? (
                                    <video 
                                        src={videoUrl} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
                                        controls 
                                        autoPlay
                                    ></video>
                                ) : (
                                    <div style={{ width: '100%', height: '300px', backgroundColor: '#000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                        Vídeo não disponível
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="about-content" style={{textAlign: 'left'}}>
                        <p>{texts.aboutText}</p>
                        {texts.whatsappLink && (
                            <a href={texts.whatsappLink} className="btn-whatsapp">
                                <img src={whatsappIcon} alt="WhatsApp" />
                                Converse Conosco
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
