import React, { useState, useEffect } from 'react';
import { User, Lock, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [logoUrl, setLogoUrl] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        // Load logo
        API.get('/public/media').then(res => {
            const media = res.data || [];
            const logoItem = media.find(item => item.title.toLowerCase().includes('logo'));
            if (logoItem && logoItem.url) {
                setLogoUrl(logoItem.url);
            }
        }).catch(err => console.error("Erro ao buscar logo", err));
    }, []);

    const showToast = (message, type) => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await API.post('/auth/login', { email, password });
            if (data && data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                showToast('Login realizado com sucesso!', 'success');
                setTimeout(() => {
                    navigate('/admin');
                }, 1000);
            } else {
                throw new Error('Formato de resposta inválido');
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Credenciais inválidas. Tente novamente.');
            const card = document.querySelector('.login-card');
            if (card) {
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = 'shake 0.4s ease-in-out';
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-body">
            <div className="login-card">
                <div className="login-logo">
                    <img src={logoUrl || "/logo-pura.png"} alt="Logo Amor Próprio" style={{ height: '120px', objectFit: 'contain' }} />
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div id="login-error" style={{ backgroundColor: '#FED7D7', color: '#C53030', padding: '12px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '20px', border: '1px solid #FEB2B2' }}>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Nome</label>
                        <div className="input-icon-wrapper">
                            <User className="input-icon" />
                            <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu nome" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <div className="input-icon-wrapper">
                            <Lock className="input-icon" />
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" required autoComplete="current-password" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                    
                    <Link to="/" className="login-back-link">Voltar</Link>
                </form>
            </div>

            <div id="toast" className={`toast ${toast.visible ? 'show' : ''} toast-${toast.type}`}>
                {toast.type === 'success' ? <CheckCircle /> : <AlertCircle />}
                <span id="toast-message">{toast.message}</span>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
            `}</style>
        </div>
    );
}
