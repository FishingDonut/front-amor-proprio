# Associação Amor Próprio - Front-end

Este é o repositório do front-end da aplicação da **Associação Amor Próprio de Itajaí**, uma rede de apoio para mulheres na luta contra o câncer de mama, oferecendo apoio emocional, workshops e uma comunidade acolhedora.

A interface foi desenvolvida para ser totalmente responsiva, moderna e alinhada ao design e identidade visual da organização.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias no ecossistema web moderno:

- **[React 19](https://react.dev/)**: Biblioteca para a construção de interfaces de usuário reativas.
- **[Vite](https://vite.dev/)**: Ferramenta de build rápida e servidora de desenvolvimento HMR.
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação da aplicação.
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones modernos e limpos.
- **Vanilla CSS**: Folhas de estilo customizadas para controle total da fidelidade visual e layout flexível.

---

## 📁 Estrutura de Pastas

A estrutura interna em `src/` está organizada da seguinte maneira:

```text
src/
├── assets/         # Imagens estáticas e miniaturas (ex: tumb.png, hero.png)
├── components/     # Componentes estruturais e modulares da Home Page
│   ├── About.jsx        # Seção "Sobre Nós" com player de vídeo integrado
│   ├── Activities.jsx   # Grid assimétrico de projetos e produtos solidários
│   ├── Footer.jsx       # Rodapé de 3 colunas com contatos e redes sociais
│   ├── Hero.jsx         # Banner principal com gradiente e foto integrada
│   ├── Navbar.jsx       # Cabeçalho navegável com menu mobile hambúrguer
│   ├── Stats.jsx        # Estatísticas de vendas, doações e associadas
│   ├── Testimonials.jsx # Carrossel animado de depoimentos das acolhidas
│   └── WhyHelp.jsx      # Seção "Por que nos ajudar" com cards de tópicos
├── pages/          # Páginas principais da aplicação
│   ├── Home.jsx         # Página pública integrando todas as seções e API
│   ├── Login.jsx        # Tela de login administrativo
│   └── Admin.jsx        # Painel interno de gerenciamento de textos, mídias e posts
├── services/       # Conexão com o Back-end
│   └── api.js           # Utilitários fetch e configuração dinâmica de base URL/Vite Proxy
├── index.css       # Estilização global do projeto, variáveis e media queries
└── main.jsx        # Ponto de entrada da aplicação React
```

---

## 🛠️ Configuração e Execução Local

Siga os passos abaixo para executar a aplicação localmente em ambiente de desenvolvimento:

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalação das Dependências
Navegue até o diretório do front-end e execute o comando:
```bash
npm install
```

### 3. Execução em Desenvolvimento
Inicie o servidor local do Vite executando:
```bash
npm run dev
```
O console exibirá o endereço local (geralmente `http://localhost:5173/` ou `http://localhost:5174/`).

### 4. Build de Produção
Para compilar e otimizar os arquivos para o ambiente de produção:
```bash
npm run build
```
Os arquivos gerados serão salvos na pasta `/dist`.

---

## 🔌 Integração com o Back-end (API)

A conexão com a API está centralizada em [src/services/api.js](file:///c:/Users/Danie/projects/Univali/Web/m3/front-end/src/services/api.js):
- **Desenvolvimento Local**: Utiliza o proxy configurado em [vite.config.js](file:///c:/Users/Danie/projects/Univali/Web/m3/front-end/vite.config.js) apontando as chamadas `/public/api` para o servidor de produção, evitando problemas de CORS.
- **Produção**: Conecta-se automaticamente à URL hospedada da aplicação em `https://amorproprio.free.nf/public/api`.
- **Fallbacks Integrados**: Em caso de falha de conexão na API, o front-end carrega dados padrão e recursos locais transparentemente (como textos e imagens estáticas), garantindo que a página nunca fique em branco.
