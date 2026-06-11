# Plano de Integração: Frontend & Backend - Amor Próprio

Este documento detalha as etapas necessárias para garantir que o projeto Amor Próprio esteja 100% integrado com o backend, permitindo o gerenciamento completo de todos os conteúdos dinâmicos através do painel administrativo.

## 1. Ajustes no Frontend (Página Home)

### 1.1 Padronização de Rotas da API
- Atualizar todas as chamadas `API.get` no `Home.jsx` para utilizarem o prefixo `/v1/`.
  - `/text` -> `/v1/text`
  - `/media` -> `/v1/media`
  - `/activity` -> `/v1/activity`
  - `/post` -> `/v1/post`

### 1.2 Manutenção do Vídeo Local
- Conforme solicitado, o componente `About.jsx` permanecerá utilizando o arquivo `videoamorproprio.mp4` localizado em `assets/`. Nenhuma alteração de integração será feita neste ponto.

## 2. Expansão do Painel Administrativo (Página Admin)

### 2.1 Gerenciamento Completo de Testemunhos (Posts)
- **Novo Card no Dashboard:** Adicionar um card "Testemunhos" para acesso ao gerenciamento.
- **Modal de Listagem:** Exibir todos os depoimentos cadastrados (Nome, Cargo e Mensagem).
- **CRUD Completo:**
  - Implementar a funcionalidade de **Criar** novo depoimento.
  - Implementar a funcionalidade de **Editar** depoimento existente.
  - Implementar a funcionalidade de **Excluir** depoimento.
- **Endpoints:** Utilizar a rota `/v1/post`.

### 2.2 Melhoria no Gerenciamento de Atividades
- **Criação e Exclusão:** Atualmente o Admin apenas permite editar atividades existentes.
- **Novas Funcionalidades:**
  - Adicionar botão para **Criar** nova atividade.
  - Adicionar botão para **Excluir** atividade existente.
- **Endpoints:** Utilizar a rota `/v1/activity`.

### 2.3 Limpeza da Interface
- Remover o campo de edição de "URL do Vídeo" no modal de "Sobre Nós", visto que o vídeo será mantido localmente e não deve ser alterado via Admin.

## 3. Próximos Passos
1. **Fase de Implementação:** Executar as alterações nos arquivos `src/pages/Home.jsx` e `src/pages/Admin.jsx`.
2. **Fase de Testes:** Verificar se as criações/edições no Admin refletem imediatamente na Home.
3. **Validação Final:** Garantir que não existam dados estáticos (hardcoded) que devessem ser dinâmicos.

---
*Plano gerado por Gemini CLI em 10/06/2026.*
