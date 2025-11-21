# 🚀 Guia de Deploy - Cloudflare Pages

Este guia vai te ajudar a fazer o deploy do presente no Cloudflare Pages.

## 📋 Pré-requisitos

1. Node.js instalado (para rodar localmente) - [Download aqui](https://nodejs.org/)
2. Conta no GitHub (gratuita)
3. Conta no Cloudflare (gratuita)
4. Git instalado no seu computador

## 🔧 Passo a Passo

### 1. Preparar o Projeto Localmente

1. **Instale as dependências e rode localmente**:
   ```bash
   npm install
   npm start
   ```
   Isso vai abrir o navegador automaticamente em `http://localhost:3000/login.html`

2. **Altere as senhas padrão**:
   - Abra o arquivo `auth.js`
   - Encontre a seção `credentials`
   - Altere as senhas para algo seguro:
     ```javascript
     credentials: {
         viewer: {
             username: 'ela',
             password: 'SUA_SENHA_AQUI' // Altere!
         },
         admin: {
             username: 'admin',
             password: 'SUA_SENHA_ADMIN_AQUI' // Altere!
         }
     }
     ```

3. **Adicione fotos inicialmente (opcional)**:
   - Com o servidor rodando (`npm start`), faça login como admin
   - Adicione algumas fotos de teste
   - Baixe o arquivo `photos.json` gerado
   - Coloque o `photos.json` na pasta do projeto

### 2. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository" (ou o botão "+" no canto superior direito)
3. Configure:
   - **Repository name**: `presente-3-anos` (ou outro nome)
   - **Description**: "Presente especial de 3 anos"
   - **Visibility**: Private (recomendado) ou Public
   - **NÃO** marque "Initialize with README" (já temos um)
4. Clique em "Create repository"

### 3. Fazer Upload do Código

No terminal/PowerShell, na pasta do projeto:

```bash
# Inicializar git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Presente de 3 anos - versão inicial"

# Adicionar o repositório remoto (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/presente-3-anos.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 4. Configurar Cloudflare Pages

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com/)
2. Faça login na sua conta
3. No menu lateral, clique em **"Pages"**
4. Clique em **"Create a project"**
5. Clique em **"Connect to Git"**
6. Autorize o Cloudflare a acessar seu GitHub (se necessário)
7. Selecione o repositório `presente-3-anos`
8. Clique em **"Begin setup"**

### 5. Configurar Build Settings

Configure assim:

- **Project name**: `presente-3-anos` (ou outro nome)
- **Production branch**: `main`
- **Framework preset**: `None` ou `Plain HTML`
- **Build command**: (deixe vazio)
- **Build output directory**: `/` (raiz)
- **Root directory**: `/` (raiz)

### 6. Deploy

1. Clique em **"Save and Deploy"**
2. Aguarde alguns minutos enquanto o Cloudflare faz o build
3. Quando terminar, você verá um link tipo: `presente-3-anos.pages.dev`

### 7. Testar o Site

1. Acesse o link fornecido pelo Cloudflare
2. Você será redirecionado para a página de login
3. Teste fazer login como:
   - **Visualizador**: Para ver o site
   - **Admin**: Para adicionar fotos

### 8. Adicionar Fotos Após Deploy

**⚠️ IMPORTANTE**: As fotos são salvas no arquivo `photos.json`. Para aparecerem no site publicado, você precisa fazer commit deste arquivo!

**Processo:**

1. **Opção A - Adicionar fotos localmente (recomendado)**:
   - Rode `npm start` localmente
   - Faça login como admin
   - Adicione fotos
   - Baixe o `photos.json` gerado
   - Coloque na pasta do projeto
   - Faça commit e push

2. **Opção B - Adicionar fotos no site publicado**:
   - Acesse o site publicado
   - Faça login como admin
   - Adicione fotos
   - Baixe o `photos.json` gerado
   - Coloque na pasta do projeto
   - Faça commit e push

**Fazer commit das fotos:**

```bash
# 1. Coloque o photos.json baixado na pasta do projeto
# 2. Adicione ao git
git add photos.json

# 3. Faça commit
git commit -m "Adicionar fotos"

# 4. Envie para o GitHub
git push
```

6. O Cloudflare vai fazer deploy automático em alguns minutos
7. As fotos vão aparecer no site! 🎉

### 9. Personalizar o Domínio (Opcional)

Se quiser usar um domínio próprio:

1. No Cloudflare Pages, clique no projeto
2. Vá em **"Custom domains"**
3. Adicione seu domínio
4. Siga as instruções para configurar o DNS

## 🔄 Atualizações Futuras

Sempre que você fizer mudanças:

1. Edite os arquivos localmente
2. Faça commit e push:
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push
   ```
3. O Cloudflare vai fazer deploy automático em alguns minutos

## ⚠️ Importante

- **Sempre altere as senhas** antes de fazer deploy público
- **O arquivo photos.json** deve ser commitado no git para que as fotos apareçam no site
- **Teste tudo** antes de compartilhar o link
- O sistema de autenticação é básico - adequado para uso pessoal

## 🆘 Problemas Comuns

### Fotos não aparecem no site publicado
- Certifique-se de que o arquivo `photos.json` está no repositório
- Verifique se fez commit e push do arquivo

### Erro 404 ao acessar páginas
- Verifique se o arquivo `_redirects` está na raiz do projeto
- Certifique-se de que está fazendo commit de todos os arquivos

### Login não funciona
- Verifique se alterou as senhas no `auth.js`
- Certifique-se de que o arquivo `auth.js` está no repositório

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs no Cloudflare Pages
2. Teste localmente primeiro (abrindo login.html no navegador)
3. Verifique se todos os arquivos estão no repositório

---

**Boa sorte com o deploy! 🚀💕**

