import React, { useState, useEffect } from 'react';
import { LogOut, Edit3, X, Save, Image as ImageIcon, Heart, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Admin() {
    const navigate = useNavigate();
    
    // Core data state
    const [logoUrl, setLogoUrl] = useState('https://i.ibb.co/LXTbJMtQ/Novo-Projeto.png');
    const [texts, setTexts] = useState([]);
    const [medias, setMedias] = useState([]);
    const [activities, setActivities] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Modal Visibility States
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isValuesModalOpen, setIsValuesModalOpen] = useState(false);
    const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);
    const [isActivityEditModalOpen, setIsActivityEditModalOpen] = useState(false);
    const [isPostsModalOpen, setIsPostsModalOpen] = useState(false);
    const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);

    // Modal Form States
    // 1. Banner Form
    const [bannerTopTag, setBannerTopTag] = useState('');
    const [bannerTitle, setBannerTitle] = useState('');
    const [bannerDesc, setBannerDesc] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [btn1Text, setBtn1Text] = useState('');
    const [btn1Link, setBtn1Link] = useState('');
    const [btn2Text, setBtn2Text] = useState('');
    const [btn2Link, setBtn2Link] = useState('');

    // 2. About Form
    const [aboutText, setAboutText] = useState('');
    const [aboutWhatsapp, setAboutWhatsapp] = useState('');
    const [aboutImage, setAboutImage] = useState('');

    // 3. Values Form
    const [statDonation, setStatDonation] = useState('');
    const [statMembers, setStatMembers] = useState('');
    const [statSales, setStatSales] = useState('');

    // 4. Activity Edit Form
    const [selectedActivity, setSelectedActivity] = useState({ id: null, title: '', description: '', link: '', img: '' });

    // 5. Post (Testimonial) Edit Form
    const [selectedPost, setSelectedPost] = useState({ id: null, user_name: '', staff: '', message: '', img: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [textsRes, mediasRes, activitiesRes, postsRes] = await Promise.all([
                API.get('/v1/text?limit=100'),
                API.get('/v1/media?limit=100'),
                API.get('/v1/activity?limit=100'),
                API.get('/v1/post?limit=100')
            ]);

            const rawTexts = textsRes.data || [];
            const rawMedias = mediasRes.data || [];
            const rawActivities = activitiesRes.data || [];
            const rawPosts = postsRes.data || [];

            setTexts(rawTexts);
            setMedias(rawMedias);
            setActivities(rawActivities);
            setPosts(rawPosts);

            // Locate logo
            const logoItem = rawMedias.find(m => m.title && m.title.toLowerCase().includes('logo'));
            if (logoItem) setLogoUrl(logoItem.url);

        } catch (err) {
            console.error("Erro ao buscar dados do dashboard:", err);
            if (err.message && err.message.includes('401')) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // --- Helper to Find and Save text records ---
    const getTextContent = (idOrName, fallback = '') => {
        let found;
        if (typeof idOrName === 'number') {
            found = texts.find(t => Number(t.id) === idOrName);
        } else {
            found = texts.find(t => t.name && t.name.toLowerCase() === idOrName.toLowerCase());
        }
        return found ? found.content : fallback;
    };

    const getMediaUrl = (id, fallback = '') => {
        const found = medias.find(m => Number(m.id) === id);
        return found ? found.url : fallback;
    };

    const saveTextRecord = async (idOrName, newContent) => {
        let found;
        if (typeof idOrName === 'number') {
            found = texts.find(t => Number(t.id) === idOrName);
        } else {
            found = texts.find(t => t.name && t.name.toLowerCase() === idOrName.toLowerCase());
        }

        if (found) {
            await API.put(`/v1/text/${found.id}`, { name: found.name, content: newContent });
        } else if (typeof idOrName === 'string') {
            // Create a new text record
            await API.post('/v1/text', { name: idOrName, content: newContent });
        }
    };

    const saveMediaRecord = async (id, title, url) => {
        const found = medias.find(m => Number(m.id) === id);
        if (found) {
            await API.put(`/v1/media/${id}`, { title, url });
        } else {
            await API.post('/v1/media', { title, url });
        }
    };

    // --- Modal Openers ---
    const openBannerModal = () => {
        setError('');
        setBannerTopTag(getTextContent(1, 'Apoio a Mulher com Câncer de mama'));
        setBannerTitle(getTextContent(2, 'Empoderamento e Acolhimento'));
        setBannerDesc(getTextContent(3, ''));
        setBannerImage(getMediaUrl(6, ''));
        setBtn1Text(getTextContent('Texto do Botao 1', 'Saiba Mais'));
        setBtn1Link(getTextContent('Link do Botao 1', '#sobre-nos'));
        setBtn2Text(getTextContent('Texto do Botao 2', 'Como Ajudar'));
        setBtn2Link(getTextContent('Link do Botao 2', '#como-ajudar'));
        setIsBannerModalOpen(true);
    };

    const openAboutModal = () => {
        setError('');
        setAboutText(getTextContent(4, ''));
        setAboutWhatsapp(getTextContent(5, ''));
        setAboutImage(getMediaUrl(7, ''));
        setIsAboutModalOpen(true);
    };

    const openValuesModal = () => {
        setError('');
        setStatDonation(getTextContent(6, 'R$ 15.000'));
        setStatMembers(getTextContent(7, '450 +'));
        setStatSales(getTextContent(8, '1.200+'));
        setIsValuesModalOpen(true);
    };

    const openActivitiesModal = () => {
        setError('');
        setIsActivitiesModalOpen(true);
    };

    const openActivityEditModal = (activity = null) => {
        setError('');
        if (activity) {
            setSelectedActivity({ ...activity });
        } else {
            setSelectedActivity({ id: null, title: '', description: '', link: '', img: '' });
        }
        setIsActivityEditModalOpen(true);
    };

    const openPostsModal = () => {
        setError('');
        setIsPostsModalOpen(true);
    };

    const openPostEditModal = (post = null) => {
        setError('');
        if (post) {
            setSelectedPost({ ...post });
        } else {
            setSelectedPost({ id: null, user_name: '', staff: '', message: '', img: '' });
        }
        setIsPostEditModalOpen(true);
    };

    // --- Save Handlers ---
    const handleSaveBanner = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        if (bannerImage && bannerImage.includes('ibb.co/') && !bannerImage.includes('i.ibb.co/')) {
            setError('Atenção: Use o link direto da imagem (ex: https://i.ibb.co/xxx/foto.png) e não o link da página do ImgBB.');
            setSaving(false);
            return;
        }

        try {
            await Promise.all([
                saveTextRecord(1, bannerTopTag),
                saveTextRecord(2, bannerTitle),
                saveTextRecord(3, bannerDesc),
                saveMediaRecord(6, 'imagem senhora', bannerImage),
                saveTextRecord('Texto do Botao 1', btn1Text),
                saveTextRecord('Link do Botao 1', btn1Link),
                saveTextRecord('Texto do Botao 2', btn2Text),
                saveTextRecord('Link do Botao 2', btn2Link)
            ]);
            await fetchDashboardData();
            setIsBannerModalOpen(false);
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar os dados do Banner.');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveAbout = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await Promise.all([
                saveTextRecord(4, aboutText),
                saveTextRecord(5, aboutWhatsapp),
                saveMediaRecord(7, 'video informativo', aboutImage)
            ]);
            await fetchDashboardData();
            setIsAboutModalOpen(false);
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar os dados do Sobre Nós.');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveValues = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await Promise.all([
                saveTextRecord(6, statDonation),
                saveTextRecord(7, statMembers),
                saveTextRecord(8, statSales)
            ]);
            await fetchDashboardData();
            setIsValuesModalOpen(false);
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar os dados dos Valores.');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveActivity = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        if (selectedActivity.img && selectedActivity.img.includes('ibb.co/') && !selectedActivity.img.includes('i.ibb.co/')) {
            setError('Atenção: Use o link direto da imagem.');
            setSaving(false);
            return;
        }

        try {
            if (selectedActivity.id) {
                await API.put(`/v1/activity/${selectedActivity.id}`, {
                    title: selectedActivity.title,
                    description: selectedActivity.description,
                    link: selectedActivity.link,
                    img: selectedActivity.img
                });
            } else {
                await API.post('/v1/activity', {
                    title: selectedActivity.title,
                    description: selectedActivity.description,
                    link: selectedActivity.link,
                    img: selectedActivity.img
                });
            }
            await fetchDashboardData();
            setIsActivityEditModalOpen(false);
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar a atividade.');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteActivity = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta atividade?')) return;
        setSaving(true);
        try {
            await API.delete(`/v1/activity/${id}`);
            await fetchDashboardData();
        } catch (err) {
            console.error(err);
            alert('Erro ao excluir atividade.');
        } finally {
            setSaving(false);
        }
    };

    const handleSavePost = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            if (selectedPost.id) {
                await API.put(`/v1/post/${selectedPost.id}`, {
                    user_name: selectedPost.user_name,
                    staff: selectedPost.staff,
                    message: selectedPost.message,
                    img: selectedPost.img
                });
            } else {
                await API.post('/v1/post', {
                    user_name: selectedPost.user_name,
                    staff: selectedPost.staff,
                    message: selectedPost.message,
                    img: selectedPost.img
                });
            }
            await fetchDashboardData();
            setIsPostEditModalOpen(false);
        } catch (err) {
            console.error(err);
            setError('Erro ao salvar o testemunho.');
        } finally {
            setSaving(false);
        }
    };

    const handleDeletePost = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este testemunho?')) return;
        setSaving(true);
        try {
            await API.delete(`/v1/post/${id}`);
            await fetchDashboardData();
        } catch (err) {
            console.error(err);
            alert('Erro ao excluir testemunho.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-body">
            {/* Header */}
            <header className="admin-header">
                <div className="container">
                    <div className="admin-logo" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#E84A90" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        <div style={{display: 'flex', flexDirection: 'column', lineHeight: '1.1'}}>
                            <span style={{fontSize: '1.1rem', fontWeight: '800', color: '#E84A90', letterSpacing: '0.5px'}}>AMOR</span>
                            <span style={{fontSize: '1.1rem', fontWeight: '800', color: '#E84A90', letterSpacing: '0.5px'}}>PRÓPRIO</span>
                        </div>
                    </div>
                    
                    <div style={{textAlign: 'left', flex: 1, marginLeft: '60px'}}>
                        <h2 style={{color: '#E84A90', fontSize: '1.4rem', fontWeight: '700', margin: 0}}>Painel Administrativo</h2>
                        <span style={{fontSize: '0.95rem', color: '#FFFFFF', opacity: 0.9}}>Gerencie os conteudos do site</span>
                    </div>

                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <LogOut size={18} /> sair
                    </button>
                </div>
            </header>

            <main className="admin-content-section" style={{paddingBottom: '100px'}}>
                <div className="container">
                    <div className="admin-section-header">
                        <h1>Editar Página Inicial</h1>
                        <p>Edite os conteúdos exibidos na página principal do site.</p>
                    </div>

                    {loading ? (
                        <p style={{textAlign: 'center', padding: '60px', color: '#8A8A9E'}}>Carregando os dados da base de dados...</p>
                    ) : (
                        <div className="admin-editor-grid">
                            
                            {/* Card 1: Banner Principal */}
                            <div className="admin-card">
                                <div className="admin-card-info">
                                    <div className="admin-card-thumbnail" style={{
                                        backgroundImage: `url('${getMediaUrl(6) || 'https://i.ibb.co/208rhqTG/4006155557907369852.png'}')`,
                                        width: '280px', height: '150px', borderRadius: '12px'
                                    }}>
                                        {!getMediaUrl(6) && <ImageIcon size={40} />}
                                    </div>
                                    <div className="admin-card-details" style={{marginLeft: '12px'}}>
                                        <h3 style={{color: '#E84A90', fontWeight: '700', fontSize: '1.5rem', marginBottom: '8px'}}>Banner Principal</h3>
                                        <h4 style={{color: '#FFFFFF', margin: '4px 0', fontSize: '1.2rem', fontWeight: '600'}}>{getTextContent(2, 'Empoderamento e Acolhimento')}</h4>
                                        <p style={{maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.8}}>
                                            {getTextContent(3, 'Carregando descrição...')}
                                        </p>
                                    </div>
                                </div>
                                <div className="admin-card-actions">
                                    <button className="admin-circle-btn" onClick={openBannerModal}>
                                        <Edit3 size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Card 2: Sobre Nós */}
                            <div className="admin-card">
                                <div className="admin-card-info">
                                    <div className="admin-card-thumbnail" style={{
                                        backgroundImage: `url('${getMediaUrl(7) || 'https://i.ibb.co/208rhqTG/4006155557907369852.png'}')`,
                                        width: '280px', height: '150px', borderRadius: '12px'
                                    }}>
                                        {!getMediaUrl(7) && <ImageIcon size={40} />}
                                    </div>
                                    <div className="admin-card-details" style={{marginLeft: '12px'}}>
                                        <h3 style={{color: '#E84A90', fontWeight: '700', fontSize: '1.5rem', marginBottom: '8px'}}>Sobre Nós</h3>
                                        <h4 style={{color: '#FFFFFF', margin: '4px 0', fontSize: '1.2rem', fontWeight: '600'}}>Venha nos conhecer e ajude-nos</h4>
                                        <p style={{maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.8}}>
                                            {getTextContent(4, 'Carregando texto do sobre nós...')}
                                        </p>
                                    </div>
                                </div>
                                <div className="admin-card-actions">
                                    <button className="admin-circle-btn" onClick={openAboutModal}>
                                        <Edit3 size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Card 3: Valores */}
                            <div className="admin-card">
                                <div className="admin-card-info">
                                    <div className="admin-card-thumbnail" style={{width: '280px', height: '150px', backgroundColor: '#202026', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#E84A90', borderRadius: '12px'}}>
                                        <span style={{fontSize: '2rem', fontWeight: 'bold'}}>{getTextContent(6, 'R$ 15k')}</span>
                                        <span style={{fontSize: '1rem', color: '#8A8A9E'}}>Estatísticas</span>
                                    </div>
                                    <div className="admin-card-details" style={{marginLeft: '12px'}}>
                                        <h3 style={{color: '#E84A90', fontWeight: '700', fontSize: '1.5rem', marginBottom: '8px'}}>Valores</h3>
                                        <h4 style={{color: '#FFFFFF', margin: '4px 0', fontSize: '1.2rem', fontWeight: '600'}}>Contadores e Estatísticas</h4>
                                        <p style={{fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.8}}>Gerencie os contadores exibidos na página (Doações: {getTextContent(6, '-')}, Associadas: {getTextContent(7, '-')}, Vendas: {getTextContent(8, '-')}).</p>
                                    </div>
                                </div>
                                <div className="admin-card-actions">
                                    <button className="admin-circle-btn" onClick={openValuesModal}>
                                        <Edit3 size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Card 4: Atividades */}
                            <div className="admin-card">
                                <div className="admin-card-info">
                                    <div className="admin-card-thumbnail" style={{
                                        backgroundImage: `url('${activities[0] ? activities[0].img : ''}')`,
                                        width: '280px', height: '150px', borderRadius: '12px'
                                    }}>
                                        {activities.length === 0 && <ImageIcon size={40} />}
                                    </div>
                                    <div className="admin-card-details" style={{marginLeft: '12px'}}>
                                        <h3 style={{color: '#E84A90', fontWeight: '700', fontSize: '1.5rem', marginBottom: '8px'}}>Atividades</h3>
                                        <h4 style={{color: '#FFFFFF', margin: '4px 0', fontSize: '1.2rem', fontWeight: '600'}}>Gerenciar Atividades</h4>
                                        <p style={{fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.8}}>Gerencie as {activities.length} atividades cadastradas no site.</p>
                                    </div>
                                </div>
                                <div className="admin-card-actions">
                                    <button className="admin-circle-btn" onClick={openActivitiesModal}>
                                        <Edit3 size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Card 5: Testemunhos */}
                            <div className="admin-card">
                                <div className="admin-card-info">
                                    <div className="admin-card-thumbnail" style={{
                                        backgroundImage: `url('${posts[0] ? posts[0].img : ''}')`,
                                        width: '280px', height: '150px', borderRadius: '12px'
                                    }}>
                                        {posts.length === 0 && <Heart size={40} color="#E84A90" />}
                                    </div>
                                    <div className="admin-card-details" style={{marginLeft: '12px'}}>
                                        <h3 style={{color: '#E84A90', fontWeight: '700', fontSize: '1.5rem', marginBottom: '8px'}}>Testemunhos</h3>
                                        <h4 style={{color: '#FFFFFF', margin: '4px 0', fontSize: '1.2rem', fontWeight: '600'}}>Gerenciar Depoimentos</h4>
                                        <p style={{fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.8}}>Gerencie os {posts.length} testemunhos exibidos no carrossel.</p>
                                    </div>
                                </div>
                                <div className="admin-card-actions">
                                    <button className="admin-circle-btn" onClick={openPostsModal}>
                                        <Edit3 size={24} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </main>

            {/* --- MODAIS --- */}

            {/* MODAL 1: BANNER */}
            {isBannerModalOpen && (
                <div className="modal-overlay" style={{display: 'flex'}}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 style={{color: '#E84A90', fontWeight: 'bold'}}>Editar Banner Principal</h2>
                            <button className="modal-close-btn" onClick={() => setIsBannerModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveBanner}>
                            <div className="modal-body">
                                {error && <div className="error-msg">{error}</div>}
                                <div style={{marginBottom: '16px'}}>
                                    <label>Tag Superior</label>
                                    <input type="text" value={bannerTopTag} onChange={e => setBannerTopTag(e.target.value)} required />
                                </div>
                                <div style={{marginBottom: '16px'}}>
                                    <label>Título Principal</label>
                                    <input type="text" value={bannerTitle} onChange={e => setBannerTitle(e.target.value)} required />
                                </div>
                                <div style={{marginBottom: '16px'}}>
                                    <label>Texto</label>
                                    <textarea value={bannerDesc} onChange={e => setBannerDesc(e.target.value)} required style={{minHeight: '100px'}} />
                                </div>
                                <div style={{marginBottom: '24px'}}>
                                    <label>URL da Imagem</label>
                                    <input type="url" value={bannerImage} onChange={e => setBannerImage(e.target.value)} required />
                                </div>
                                <div className="modal-sub-section">
                                    <h3 style={{color: '#E84A90', borderBottom: '1px solid #2A2A35', paddingBottom: '8px'}}>Botões</h3>
                                    <div className="modal-grid-2">
                                        <div className="admin-sub-card">
                                            <h4 style={{color: '#E84A90'}}>Botão 1</h4>
                                            <label>Texto</label>
                                            <input type="text" value={btn1Text} onChange={e => setBtn1Text(e.target.value)} required />
                                            <label>Link</label>
                                            <input type="text" value={btn1Link} onChange={e => setBtn1Link(e.target.value)} required />
                                        </div>
                                        <div className="admin-sub-card">
                                            <h4 style={{color: '#E84A90'}}>Botão 2</h4>
                                            <label>Texto</label>
                                            <input type="text" value={btn2Text} onChange={e => setBtn2Text(e.target.value)} required />
                                            <label>Link</label>
                                            <input type="text" value={btn2Link} onChange={e => setBtn2Link(e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" onClick={() => setIsBannerModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-save" disabled={saving}>{saving ? 'Salvando...' : 'Salvar Alterações'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: SOBRE NÓS */}
            {isAboutModalOpen && (
                <div className="modal-overlay" style={{display: 'flex'}}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 style={{color: '#E84A90', fontWeight: 'bold'}}>Editar Sobre Nós</h2>
                            <button className="modal-close-btn" onClick={() => setIsAboutModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveAbout}>
                            <div className="modal-body">
                                <div style={{marginBottom: '16px'}}>
                                    <label>Texto Informativo</label>
                                    <textarea value={aboutText} onChange={e => setAboutText(e.target.value)} required style={{minHeight: '150px'}} />
                                </div>
                                <div style={{marginBottom: '16px'}}>
                                    <label>Link do WhatsApp</label>
                                    <input type="text" value={aboutWhatsapp} onChange={e => setAboutWhatsapp(e.target.value)} required />
                                </div>
                                <div style={{marginBottom: '16px'}}>
                                    <label>Link do Vídeo Informativo / URL da Imagem</label>
                                    <input type="text" value={aboutImage} onChange={e => setAboutImage(e.target.value)} required />
                                    <small style={{display: 'block', marginTop: '-12px', color: '#8A8A9E', fontSize: '0.8rem'}}>
                                        Cole o link direto do vídeo (ex: Catbox) ou URL de imagem direta.
                                    </small>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" onClick={() => setIsAboutModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-save" disabled={saving}>{saving ? 'Salvando...' : 'Salvar Alterações'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 3: VALORES */}
            {isValuesModalOpen && (
                <div className="modal-overlay" style={{display: 'flex'}}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 style={{color: '#E84A90', fontWeight: 'bold'}}>Editar Estatísticas</h2>
                            <button className="modal-close-btn" onClick={() => setIsValuesModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveValues}>
                            <div className="modal-body">
                                <div style={{marginBottom: '16px'}}>
                                    <label>Valor Doado</label>
                                    <input type="text" value={statDonation} onChange={e => setStatDonation(e.target.value)} required />
                                </div>
                                <div style={{marginBottom: '16px'}}>
                                    <label>Associadas</label>
                                    <input type="text" value={statMembers} onChange={e => setStatMembers(e.target.value)} required />
                                </div>
                                <div style={{marginBottom: '16px'}}>
                                    <label>Produtos Vendidos</label>
                                    <input type="text" value={statSales} onChange={e => setStatSales(e.target.value)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" onClick={() => setIsValuesModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-save" disabled={saving}>{saving ? 'Salvando...' : 'Salvar Alterações'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 4: LISTAR ATIVIDADES */}
            {isActivitiesModalOpen && (
                <div className="modal-overlay" style={{display: 'flex'}}>
                    <div className="modal-container" style={{maxWidth: '750px'}}>
                        <div className="modal-header">
                            <h2 style={{color: '#E84A90', fontWeight: 'bold'}}>Gerenciar Atividades</h2>
                            <button className="modal-close-btn" onClick={() => setIsActivitiesModalOpen(false)}><X size={24} /></button>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-save" style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => openActivityEditModal()}>
                                <Plus size={18} /> Nova Atividade
                            </button>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                                {activities.map(act => (
                                    <div key={act.id} className="admin-card" style={{padding: '16px', backgroundColor: '#202026', borderColor: '#2A2A35'}}>
                                        <div className="admin-card-info">
                                            <div className="admin-card-thumbnail" style={{backgroundImage: `url('${act.img}')`, width: '100px', height: '60px'}}>
                                                {!act.img && <ImageIcon size={20} />}
                                            </div>
                                            <div className="admin-card-details">
                                                <h4 style={{color: '#FFFFFF', fontSize: '1rem', fontWeight: 'bold'}}>{act.title}</h4>
                                                <p style={{fontSize: '0.8rem'}}>{act.description}</p>
                                            </div>
                                        </div>
                                        <div className="admin-card-actions" style={{gap: '8px'}}>
                                            <button className="admin-circle-btn" onClick={() => openActivityEditModal(act)}><Edit3 size={14} /></button>
                                            <button className="admin-circle-btn" style={{backgroundColor: '#FF5A79'}} onClick={() => handleDeleteActivity(act.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 5: EDITAR ATIVIDADE */}
            {isActivityEditModalOpen && (
                <div className="modal-overlay" style={{display: 'flex', zIndex: 1100}}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 style={{color: '#E84A90', fontWeight: 'bold'}}>{selectedActivity.id ? 'Editar Atividade' : 'Nova Atividade'}</h2>
                            <button className="modal-close-btn" onClick={() => setIsActivityEditModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveActivity}>
                            <div className="modal-body">
                                <div style={{marginBottom: '16px'}}><label>Título</label><input type="text" value={selectedActivity.title} onChange={e => setSelectedActivity({...selectedActivity, title: e.target.value})} required /></div>
                                <div style={{marginBottom: '16px'}}><label>Descrição</label><textarea value={selectedActivity.description} onChange={e => setSelectedActivity({...selectedActivity, description: e.target.value})} required /></div>
                                <div style={{marginBottom: '16px'}}><label>Link Externo</label><input type="text" value={selectedActivity.link} onChange={e => setSelectedActivity({...selectedActivity, link: e.target.value})} required /></div>
                                <div style={{marginBottom: '16px'}}><label>URL da Imagem</label><input type="url" value={selectedActivity.img} onChange={e => setSelectedActivity({...selectedActivity, img: e.target.value})} required /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" onClick={() => setIsActivityEditModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-save" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 6: LISTAR TESTEMUNHOS */}
            {isPostsModalOpen && (
                <div className="modal-overlay" style={{display: 'flex'}}>
                    <div className="modal-container" style={{maxWidth: '750px'}}>
                        <div className="modal-header">
                            <h2 style={{color: '#E84A90', fontWeight: 'bold'}}>Gerenciar Testemunhos</h2>
                            <button className="modal-close-btn" onClick={() => setIsPostsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-save" style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => openPostEditModal()}>
                                <Plus size={18} /> Novo Testemunho
                            </button>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                                {posts.map(post => (
                                    <div key={post.id} className="admin-card" style={{padding: '16px', backgroundColor: '#202026', borderColor: '#2A2A35'}}>
                                        <div className="admin-card-info">
                                            <div className="admin-card-thumbnail" style={{backgroundImage: `url('${post.img}')`, width: '100px', height: '60px'}}>
                                                {!post.img && <Heart size={20} />}
                                            </div>
                                            <div className="admin-card-details">
                                                <h4 style={{color: '#FFFFFF', fontSize: '1rem', fontWeight: 'bold'}}>{post.user_name}</h4>
                                                <p style={{fontSize: '0.8rem', fontStyle: 'italic'}}>{post.staff}</p>
                                            </div>
                                        </div>
                                        <div className="admin-card-actions" style={{gap: '8px'}}>
                                            <button className="admin-circle-btn" onClick={() => openPostEditModal(post)}><Edit3 size={14} /></button>
                                            <button className="admin-circle-btn" style={{backgroundColor: '#FF5A79'}} onClick={() => handleDeletePost(post.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 7: EDITAR TESTEMUNHO */}
            {isPostEditModalOpen && (
                <div className="modal-overlay" style={{display: 'flex', zIndex: 1100}}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 style={{color: '#E84A90', fontWeight: 'bold'}}>{selectedPost.id ? 'Editar Testemunho' : 'Novo Testemunho'}</h2>
                            <button className="modal-close-btn" onClick={() => setIsPostEditModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSavePost}>
                            <div className="modal-body">
                                <div style={{marginBottom: '16px'}}><label>Nome da Mulher</label><input type="text" value={selectedPost.user_name} onChange={e => setSelectedPost({...selectedPost, user_name: e.target.value})} required /></div>
                                <div style={{marginBottom: '16px'}}><label>Cargo/Status (ex: Acolhida da ONG)</label><input type="text" value={selectedPost.staff} onChange={e => setSelectedPost({...selectedPost, staff: e.target.value})} required /></div>
                                <div style={{marginBottom: '16px'}}><label>Mensagem/Depoimento</label><textarea value={selectedPost.message} onChange={e => setSelectedPost({...selectedPost, message: e.target.value})} required style={{minHeight: '100px'}} /></div>
                                <div style={{marginBottom: '16px'}}><label>URL da Foto (Avatar)</label><input type="url" value={selectedPost.img} onChange={e => setSelectedPost({...selectedPost, img: e.target.value})} required /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancel" onClick={() => setIsPostEditModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-save" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
