import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Stats from '../components/Stats';
import WhyHelp from '../components/WhyHelp';
import Activities from '../components/Activities';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
    const [texts, setTexts] = useState({});
    const [media, setMedia] = useState({
        logo: '',
        hero: '',
        icons: {}
    });
    const [activities, setActivities] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [textsRes, mediaRes, activityRes, postRes] = await Promise.all([
                    API.get('/public/text?limit=100').catch(() => ({ data: [] })),
                    API.get('/public/media?limit=100').catch(() => ({ data: [] })),
                    API.get('/public/activity?limit=100').catch(() => ({ data: [] })),
                    API.get('/public/post?limit=100').catch(() => ({ data: [] }))
                ]);

                const getItems = (res) => {
                    if (!res) return [];
                    if (Array.isArray(res)) return res;
                    if (res.data && Array.isArray(res.data)) return res.data;
                    return [];
                };

                const rawTexts = getItems(textsRes);
                const rawMedia = getItems(mediaRes);
                const rawActivities = getItems(activityRes);
                const rawPosts = getItems(postRes);

                // 1. Process Texts
                const mappedTexts = {};
                const findTextContent = (name, id) => {
                    let found = rawTexts.find(t => t.name && t.name.trim().toLowerCase() === name.trim().toLowerCase());
                    if (!found && id !== undefined) {
                        found = rawTexts.find(t => Number(t.id) === id);
                    }
                    return found ? found.content : null;
                };

                mappedTexts.heroTag = findTextContent('Titulo da area informativa', 1) || 'Apoio a Mulher com Câncer de mama';
                mappedTexts.heroTitle = findTextContent('Sub-Titulo da area informativa', 2) || 'Emponderamento e Acolhimento';
                mappedTexts.heroDesc = findTextContent('Texto da area informativa', 3) || 'Bem-vinda à rede Amor Próprio. Juntas somos mais fortes. Oferecemos Apoio emocional, workshops e uma comunidade acolhedora.';
                mappedTexts.btn1Text = findTextContent('Texto do Botao 1') || 'Saiba Mais';
                mappedTexts.btn1Link = findTextContent('Link do Botao 1') || '#sobre-nos';
                mappedTexts.btn2Text = findTextContent('Texto do Botao 2') || 'Como Ajudar';
                mappedTexts.btn2Link = findTextContent('Link do Botao 2') || '#como-ajudar';
                mappedTexts.aboutText = findTextContent('Texto da area sobre nos', 4) || 'Amor Próprio é dedicada a apoiar mulheres na luta contra o câncer. Oferecemos acolhimento, informações sobre acesso a tratamentos e recursos essenciais. assista ao vídeo para entender nossa missão e como podemos ajudar.';
                mappedTexts.whatsappLink = findTextContent('Link watts area sobre nos', 5) || 'https://wa.me/5547999782324';
                mappedTexts.statDonation = findTextContent('Valor doado no mês', 6) || 'R$ 15.000';
                mappedTexts.statMembers = findTextContent('Associadas', 7) || '450 +';
                mappedTexts.statSales = findTextContent('Produtos vendidos', 8) || '1.200+';
                mappedTexts.whyTitle = findTextContent('Titulo da area como ajudar', 9) || 'Por que nos ajudar';
                mappedTexts.why1 = findTextContent('Apoio Psicossocial', 10) || 'Terapia e grupos de apoio para pacientes e familiares';
                mappedTexts.why2 = findTextContent('Recursos Práticos', 11) || 'Auxilio na busca de um medico ideal para você';
                mappedTexts.why3 = findTextContent('Pesquisa e Diagnóstico', 12) || 'Cálculo e fornecimento de kits pós-mastectomia, lenços e produtos.';
                mappedTexts.why4 = findTextContent('Educação e Consientização', 13) || 'Cálculo e fornecimento de kits pós-mastectomia, lenços e produtos.';
                mappedTexts.testSubtitle = findTextContent('Texto da area atividades', 15) || 'Historias reais de mulheres e apoiadores que fazem parte da nossa missão. Cada palavra nos inspira a continuar acolhendo, cuidando e transformando vidas';
                mappedTexts.address = findTextContent('Endereco da area de contato', 16) || 'Itajaí, Santa Catarina';
                mappedTexts.phone = findTextContent('Telefone de contato', 17) || '(47) 99999-9999';
                mappedTexts.email = findTextContent('Email', 18) || 'contato@amorproprioitajai.org.br';
                mappedTexts.instaLink = findTextContent('Link instagram', 19) || 'https://www.instagram.com/associacaoamorproprio/';
                mappedTexts.fbLink = findTextContent('Link facebook', 20) || 'https://www.facebook.com/associacaoamorproprio/';
                mappedTexts.copyright = findTextContent('Texto roda pé', 21) || '© 2026 Amor Próprio de Itajaí. Todos os direitos reservados.';

                if (mappedTexts.heroTitle && mappedTexts.heroTitle.toLowerCase().includes('acolhimento')) {
                    mappedTexts.heroTitle = mappedTexts.heroTitle.replace(/acolhimento/i, '<br/><span class="pink-text">Acolhimento</span>');
                }

                // 2. Process Media
                const getMediaUrl = (id) => {
                    const found = rawMedia.find(m => Number(m.id) === id);
                    return found ? found.url : null;
                };

                // Add video to mapped texts BEFORE setTexts
                mappedTexts.aboutVideo = getMediaUrl(7);
                
                setTexts(mappedTexts);

                const mappedMedia = {
                    logo: getMediaUrl(1) || '/assets/amor-proprio-sem-fundo.png',
                    hero: getMediaUrl(6) || '/assets/velha-com-fundo-recortado.png',
                    icons: {
                        why1: getMediaUrl(2),
                        why2: getMediaUrl(3),
                        why3: getMediaUrl(4),
                        why4: getMediaUrl(5)
                    }
                };

                setMedia(mappedMedia);

                // 3. Process Activities & Testimonials
                let finalActivities = rawActivities;
                if (finalActivities.length === 0) {
                    finalActivities = [
                        { id: 1, title: "Caneca Solidaria", description: "Compre e ajude", img: "https://i.ibb.co/KxShd8kf/Sem-t-tulo.png", link: "https://www.instagram.com/associacaoamorproprio/" },
                        { id: 2, title: "Aulas de Bordado Terapêutico", description: "Aprenda e conecte-se", img: "https://i.ibb.co/5Xr2xScj/Sem-t-tulo2.png", link: "https://www.instagram.com/associacaoamorproprio/" },
                        { id: 3, title: "Outubro Rosa", description: "Conscientizando", img: "https://i.ibb.co/Z6H14kZQ/Sem-t-tulo3.png", link: "https://www.instagram.com/associacaoamorproprio/" },
                        { id: 4, title: "Brecho solidário", description: "Venda de produtos para arrecadação", img: "https://i.ibb.co/LD146S8c/Sem-t-tulo4.png", link: "https://www.instagram.com/associacaoamorproprio/" },
                        { id: 5, title: "Produtos unicos", description: "Nossa camiseta exclusiva", img: "https://i.ibb.co/xqT9wMKG/Sem-t-tulo5.png", link: "https://www.instagram.com/associacaoamorproprio/" }
                    ];
                }
                setActivities(finalActivities);

                let finalPosts = rawPosts;
                if (finalPosts.length === 0) {
                    finalPosts = [
                        { id: 1, user_name: "Juliana Moura da Silva Costa", staff: "Acolhida da ONG", message: "“O Amor Próprio de Itajai foi um abraço quando mais precisei. Encontrei acolhimento, apoio e mulheres incriveis que me mostraram que eu não estava sozinha nessa caminhada.”", img: "https://i.ibb.co/pvsDZJKN/Sem-t-tulo6.png" },
                        { id: 2, user_name: "Sandra Regina de Castro", staff: "Voluntária do Brechó", message: "“Poder contribuir com o brechó solidário e ver como cada doação se transforma em ajuda real para mulheres enfrentando o câncer de mama é a minha maior alegria.”", img: "https://i.ibb.co/pvsDZJKN/Sem-t-tulo6.png" },
                        { id: 3, user_name: "Beatriz Nogueira Lima", staff: "Paciente em Tratamento", message: "“Os grupos de apoio psicológico foram fundamentais para mim. Aqui eu ganhei não só orientação médica, mas uma nova família que me dá forças para lutar todos os dias.”", img: "https://i.ibb.co/pvsDZJKN/Sem-t-tulo6.png" }
                    ];
                }
                setTestimonials(finalPosts);

            } catch (err) {
                console.error("Erro ao carregar dados do backend:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit'}}>Carregando...</div>;

    return (
        <div>
            <Navbar logoUrl={media.logo} donateLink={texts.btn2Link} />
            <Hero texts={{...texts, heroImage: media.hero}} />
            <About texts={texts} />
            <Stats texts={texts} />
            <WhyHelp texts={texts} icons={media.icons} />
            <Activities activities={activities} />
            <Testimonials texts={texts} testimonials={testimonials} />
            <Footer texts={texts} logoUrl={media.logo} />
        </div>
    );
}
