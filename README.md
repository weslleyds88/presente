# 💕 Presente de 3 Anos de Namoro - Versão Super Elaborada

Um presente digital **SUPER ELABORADO** e interativo criado com HTML, CSS e JavaScript para celebrar 3 anos de relacionamento!

## 🔐 Sistema de Login e Admin

Agora o projeto inclui um sistema completo de autenticação:
- **Login para visualizador**: Para ela ver o presente especial
- **Login para admin**: Para você adicionar e gerenciar fotos
- **Área de administração**: Interface completa para upload de fotos
- **Armazenamento de fotos**: Fotos salvas em JSON para fácil deploy

## ✨ Recursos Incríveis:

### 🎨 Design e Visual
- **Partículas animadas** no fundo
- **Gradientes dinâmicos** e cores vibrantes
- **Animações suaves** em todos os elementos
- **Efeitos de glassmorphism** (vidro fosco)
- **Timeline interativa** mostrando a jornada de 3 anos
- **Navegação fixa** com efeito de scroll
- **Design totalmente responsivo** para mobile e desktop

### ⏱️ Contador de Tempo
- Contador em **tempo real** mostrando dias, horas, minutos e segundos juntos
- Atualização automática a cada segundo
- Design elegante com efeitos de brilho

### 📸 Galeria de Fotos
- **Lightbox interativo** para visualizar fotos em tela cheia
- Navegação entre fotos com setas ou teclado (← →)
- Efeitos de hover e zoom
- Suporte para múltiplas fotos

### 🎯 Quiz Interativo
- Quiz personalizado sobre o relacionamento
- Barra de progresso visual
- Efeitos de confete ao acertar
- Animações de feedback visual

### 💌 Mensagens Especiais
- Botão que mostra mensagens românticas aleatórias
- **20+ mensagens** pré-configuradas
- Efeito de corações flutuantes ao clicar

### 📊 Estatísticas
- Cards com números do relacionamento
- Animações ao passar o mouse
- Design moderno e elegante

### 🎵 Música de Fundo (Opcional)
- Botão para tocar/pausar música
- Fácil de adicionar sua música favorita

## 🚀 Como Usar:

### ⚡ Início Rápido (Recomendado)

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor local**:
   ```bash
   npm start
   ```
   
   Isso vai:
   - Iniciar um servidor local na porta 3000
   - Abrir automaticamente o navegador em `http://localhost:3000/login.html`
   - Recarregar automaticamente quando você fizer mudanças nos arquivos

3. **Pronto!** Agora você pode:
   - Fazer login como admin para adicionar fotos
   - Fazer login como visualizador para ver o presente
   - Todas as mudanças são salvas automaticamente

### 🔑 Login e Credenciais

**IMPORTANTE**: Antes de fazer deploy, altere as senhas padrão no arquivo `auth.js`!

**Credenciais padrão** (ALTERE ANTES DO DEPLOY):
- **Visualizador**: 
  - Usuário: `ela`
  - Senha: `amor123` ⚠️ **ALTERE ESTA SENHA!**
- **Admin**: 
  - Usuário: `admin`
  - Senha: `admin123` ⚠️ **ALTERE ESTA SENHA!**

Para alterar as senhas, edite o arquivo `auth.js` na seção `credentials`.

### 📝 Passo a Passo (Método Manual):

Se preferir não usar npm, você pode:

1. **Abra o arquivo `login.html`** no seu navegador
   - Duplo clique no arquivo ou
   - Clique com botão direito > Abrir com > Navegador

2. **Faça login como Admin**:
   - Selecione "Admin" no seletor de tipo de usuário
   - Use as credenciais de admin
   - Você será redirecionado para a área de administração

3. **Adicione fotos**:
   - Na área de admin, clique ou arraste fotos na área de upload
   - Adicione legendas para cada foto
   - Clique em "Salvar Todas as Fotos"
   - Um arquivo `photos.json` será baixado automaticamente
   - **IMPORTANTE**: Coloque o arquivo `photos.json` na pasta do projeto antes de fazer commit

4. **Personalize a data**:
   - Abra `script.js`
   - Encontre: `const START_DATE = new Date('2022-11-23T00:00:00');`
   - Altere para a data que vocês começaram a namorar

4. **Personalize as mensagens**:
   - No arquivo `script.js`, edite o array `loveMessages` com suas próprias mensagens
   - Edite a seção de mensagem no `index.html` para escrever sua mensagem especial

5. **Personalize o Quiz**:
   - No arquivo `script.js`, edite o array `quizQuestions`
   - Adicione suas próprias perguntas e respostas
   - Ajuste o índice `correct` para indicar a resposta correta (0 = primeira, 1 = segunda, etc.)

6. **Personalize a Timeline**:
   - No arquivo `index.html`, encontre a seção `.timeline-item`
   - Edite os textos e anos para refletir sua história

7. **Adicione música (opcional)**:
   - Coloque um arquivo de música na pasta (ex: `musica.mp3`)
   - No `index.html`, descomente a linha dentro de `<audio>` e ajuste o caminho

## 🎨 Personalização Avançada:

### Cores
No arquivo `style.css`, você pode alterar as cores principais:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --accent-color: #f8b500;
    --dark-purple: #6c5ce7;
    --light-purple: #a29bfe;
}
```

### Animações
Todas as animações estão no `style.css` e podem ser ajustadas:
- Velocidade das partículas
- Efeitos de hover
- Transições e transformações

## 📱 Compatibilidade:

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile (iOS e Android)

## ☁️ Deploy no Cloudflare Pages

### Passo a Passo para Deploy:

1. **Crie um repositório no GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Presente de 3 anos"
   git remote add origin https://github.com/seu-usuario/presente-3-anos.git
   git push -u origin main
   ```

2. **Configure no Cloudflare Pages**:
   - Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Vá em "Pages" > "Create a project"
   - Conecte seu repositório do GitHub
   - Configure:
     - **Build command**: (deixe vazio - é um site estático)
     - **Build output directory**: `/` (raiz)
     - **Root directory**: `/` (raiz)

3. **Após o deploy**:
   - Faça login como admin no site publicado
   - Adicione suas fotos através da interface admin
   - Baixe o arquivo `photos.json` gerado
   - Faça commit do `photos.json` no repositório
   - Faça push para atualizar o site

4. **Compartilhe o link**:
   - Compartilhe o link do Cloudflare Pages com ela
   - Ela pode fazer login como visualizador para ver o presente

### 📁 Estrutura de Arquivos para Deploy:

```
projeto/
├── index.html          # Página principal (requer login)
├── login.html          # Página de login
├── admin.html          # Área de admin (requer login admin)
├── style.css           # Estilos
├── script.js           # JavaScript principal
├── auth.js             # Sistema de autenticação
├── admin.js            # Lógica de administração
├── photos.json         # Fotos (gerado pelo admin)
├── _redirects          # Configuração Cloudflare Pages
├── wrangler.toml       # Configuração Cloudflare Workers (opcional)
├── .gitignore          # Arquivos ignorados pelo git
└── README.md           # Este arquivo
```

## 💡 Dicas:

- **Use `npm start`** para rodar tudo de uma vez (muito mais fácil!)
- **Teste tudo** antes de apresentar o presente
- **Altere as senhas** antes de fazer deploy!
- **Adicione fotos reais** através da área de admin
- **Personalize as mensagens** com memórias específicas de vocês
- **Use um navegador moderno** para melhor experiência
- **O arquivo photos.json** deve ser commitado no git para que as fotos apareçam no site publicado
- **O servidor recarrega automaticamente** quando você salva mudanças nos arquivos

## 🎁 Estrutura de Arquivos:

```
projeto/
├── index.html      # Página principal (requer login)
├── login.html      # Página de login
├── admin.html      # Área de admin
├── style.css       # Estilos e animações
├── script.js       # Funcionalidades JavaScript
├── auth.js         # Sistema de autenticação
├── admin.js        # Lógica de administração
├── photos.json     # Fotos (gerado pelo admin)
├── music.json      # Músicas (gerado pelo admin)
├── package.json    # Configuração npm e scripts
├── _redirects      # Configuração Cloudflare Pages
├── wrangler.toml   # Configuração Cloudflare Workers
├── .gitignore      # Arquivos ignorados
└── README.md       # Este arquivo
```

## 🔒 Segurança:

⚠️ **IMPORTANTE**: Este sistema de autenticação é básico e adequado para uso pessoal. Para aplicações mais críticas, considere implementar autenticação mais robusta com backend.

- As senhas são armazenadas em texto plano no código (adequado para uso pessoal)
- A sessão expira após 24 horas
- As fotos são armazenadas em base64 no JSON (pode gerar arquivos grandes)

## ❤️ Espero que Vocês Gostem!

Este presente foi feito com muito carinho e atenção aos detalhes. Cada elemento foi pensado para criar uma experiência especial e memorável.

**Aproveitem e celebrem muitos anos juntos!** 💕

---

**Feito com ❤️ usando HTML5, CSS3 e JavaScript puro**

