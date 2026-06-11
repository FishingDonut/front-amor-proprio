import React, { useState } from 'react';
import { Play } from 'lucide-react';
import localThumb from '../assets/tumb.png';

export default function About({ texts }) {
    const [isPlaying, setIsPlaying] = useState(false);
    // Prioritize video from API (Media ID 7), fallback to local path
    const videoUrl = texts.aboutVideo || '/mp4/videoamorproprio.mp4';

    return (
        <section className="about" id="sobre-nos">
            {/* Background Ribbon Watermark */}
            <svg className="about-ribbon-watermark" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50,10 C36.2,10 25,21.2 25,35 C25,44.5 30.5,52.8 38.5,56.8 L20,90 L35,90 L46.5,69 L53.5,69 L65,90 L80,90 L61.5,56.8 C69.5,52.8 75,44.5 75,35 C75,21.2 63.8,10 50,10 Z M50,22 C57.2,22 63,27.8 63,35 C63,42.2 57.2,48 50,48 C42.8,48 37,42.2 37,35 C37,27.8 42.8,22 50,22 Z" />
            </svg>

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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.942-.001-3.841-.482-5.538-1.391l-6.459 1.6zm6.264-3.645c1.554.921 3.089 1.403 4.73 1.404 5.424 0 9.835-4.412 9.838-9.835.002-2.628-1.023-5.1-2.885-6.963-1.862-1.865-4.334-2.889-6.953-2.889-5.424 0-9.835 4.411-9.838 9.835-.001 1.748.469 3.453 1.359 4.927l-1.082 3.95 4.053-1.059zm12.352-7.05c-.273-.137-1.613-.796-1.863-.887-.25-.09-.432-.136-.614.137-.182.273-.705.887-.864 1.069-.159.182-.318.205-.591.068-.273-.137-1.15-.424-2.19-1.354-.809-.722-1.355-1.614-1.514-1.887-.159-.273-.017-.42.12-.556.123-.122.273-.318.409-.477.137-.159.182-.273.273-.455.09-.182.046-.341-.023-.477-.068-.137-.614-1.477-.841-2.023-.222-.533-.466-.459-.64-.469-.165-.009-.355-.011-.546-.011-.191 0-.5.072-.762.364-.263.292-1.003.98-1.003 2.392s1.025 2.778 1.168 2.972c.143.194 2.017 3.081 4.885 4.318.682.294 1.214.47 1.629.601.685.217 1.307.187 1.8.113.549-.082 1.613-.659 1.841-1.295.227-.637.227-1.183.159-1.295-.069-.114-.25-.182-.523-.319z"/></svg>
                                Converse Conosco
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
