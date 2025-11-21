# 📸 Como Adicionar Fotos e Fazer Deploy

## ✅ Sim, as fotos vão junto no deploy!

Mas você precisa seguir estes passos:

## 🔄 Processo Completo:

### 1. Adicionar Fotos Localmente

1. Rode o projeto: `npm start`
2. Acesse `http://localhost:3000/login.html`
3. Faça login como **admin**
4. Adicione suas fotos na área de admin
5. Clique em "Salvar Todas as Fotos"
6. **IMPORTANTE**: O arquivo `photos.json` será baixado automaticamente

### 2. Colocar o Arquivo no Projeto

1. **Mova o arquivo `photos.json` baixado** para a pasta do projeto
2. Substitua o arquivo antigo se já existir

### 3. Fazer Commit no Git

No terminal, na pasta do projeto:

```bash
# Adicionar o arquivo photos.json
git add photos.json

# Fazer commit
git commit -m "Adicionar fotos"

# Enviar para o GitHub
git push
```

### 4. Deploy Automático

- O Cloudflare Pages vai detectar o push automaticamente
- Vai fazer deploy em alguns minutos
- As fotos vão aparecer no site publicado! 🎉

## 📋 Checklist:

- [ ] Fotos adicionadas via admin
- [ ] Arquivo `photos.json` baixado
- [ ] Arquivo `photos.json` colocado na pasta do projeto
- [ ] Commit feito no git (`git add photos.json && git commit -m "Fotos" && git push`)
- [ ] Aguardar deploy automático no Cloudflare

## 💡 Dicas:

- **Sempre que adicionar novas fotos**, repita o processo (baixar JSON → commit → push)
- O arquivo `photos.json` contém **todas as fotos** em base64
- Se o arquivo ficar muito grande (>100MB), o GitHub pode reclamar
- Nesse caso, considere usar menos fotos ou comprimir mais

## ⚠️ Importante:

- O arquivo `photos.json` **DEVE** estar na pasta do projeto
- Ele **NÃO** está no `.gitignore` (é proposital - precisa ser commitado)
- Sem fazer commit do `photos.json`, as fotos não vão aparecer no site publicado

## 🆘 Problemas?

- **Fotos não aparecem no site publicado?**
  → Verifique se fez commit do `photos.json`
  → Verifique se o arquivo está na raiz do projeto

- **Arquivo muito grande?**
  → As fotos são comprimidas automaticamente
  → Se ainda assim ficar grande, adicione menos fotos por vez

---

**Resumo**: Sim, as fotos vão junto! Basta fazer commit do `photos.json` no git. 🚀

