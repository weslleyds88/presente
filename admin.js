// Gerenciador de Fotos
const photoManager = {
    currentPhotos: [],
    previewPhotos: [],

    // Carregar fotos do JSON
    async loadPhotos() {
        // Sempre tentar carregar do arquivo primeiro (fonte principal)
        await this.loadFromFile();
        
        // Se não conseguiu carregar do arquivo, tentar localStorage como fallback
        if (this.currentPhotos.length === 0) {
            try {
                const photosJson = localStorage.getItem('photos_data');
                if (photosJson) {
                    this.currentPhotos = JSON.parse(photosJson);
                }
            } catch (e) {
                console.error('Erro ao carregar fotos do localStorage:', e);
                // Limpar localStorage corrompido
                localStorage.removeItem('photos_data');
            }
        }
        
        this.renderPhotos();
    },

    // Carregar do arquivo JSON (fonte principal)
    async loadFromFile() {
        try {
            const response = await fetch('photos.json');
            if (response.ok) {
                const data = await response.json();
                this.currentPhotos = data.photos || [];
                // Tentar salvar no localStorage como cache (mas não é crítico se falhar)
                this.trySaveToLocalStorage(this.currentPhotos);
            }
        } catch (e) {
            // Arquivo não existe ainda, tudo bem
            console.log('Arquivo photos.json não encontrado');
            this.currentPhotos = [];
        }
    },

    // Tentar salvar no localStorage (sem erro se falhar)
    trySaveToLocalStorage(photos) {
        try {
            const json = JSON.stringify(photos);
            // Verificar tamanho aproximado (base64 aumenta ~33%)
            if (json.length < 4 * 1024 * 1024) { // Menos de 4MB
                localStorage.setItem('photos_data', json);
            } else {
                console.log('Fotos muito grandes para localStorage, usando apenas arquivo JSON');
            }
        } catch (e) {
            // Se falhar (quota excedida), não é problema - usamos o arquivo JSON
            console.log('Não foi possível salvar no localStorage (quota excedida), usando apenas arquivo JSON');
            // Limpar localStorage antigo se estiver corrompido
            try {
                localStorage.removeItem('photos_data');
            } catch (e2) {
                // Ignorar erro ao limpar
            }
        }
    },

    // Comprimir imagem para reduzir tamanho
    compressImage(file, maxWidth = 1920, quality = 0.8) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    // Redimensionar se necessário
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Converter para base64 com qualidade reduzida
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                
                img.onerror = () => {
                    // Se falhar, usar o arquivo original
                    resolve(e.target.result);
                };
                
                img.src = e.target.result;
            };
            
            reader.readAsDataURL(file);
        });
    },

    // Adicionar novas fotos
    async addPhotos(files) {
        const previewContainer = document.getElementById('photosPreview');
        previewContainer.innerHTML = '';
        
        // Mostrar mensagem de processamento
        const processingMsg = document.createElement('div');
        processingMsg.style.cssText = 'text-align: center; padding: 20px; color: white; opacity: 0.8;';
        processingMsg.textContent = '⏳ Processando fotos...';
        previewContainer.appendChild(processingMsg);

        for (const file of files) {
            if (file.size > 10 * 1024 * 1024) {
                alert(`A foto ${file.name} é muito grande (máx. 10MB)`);
                continue;
            }

            try {
                // Comprimir imagem antes de converter para base64
                const compressedBase64 = await this.compressImage(file);
                
                const photoData = {
                    id: Date.now() + Math.random(),
                    src: compressedBase64, // Base64 comprimido
                    caption: '', // Legenda vazia por padrão (pode ser editada depois)
                    date: new Date().toISOString()
                };

                this.previewPhotos.push(photoData);
            } catch (e) {
                console.error('Erro ao processar foto:', e);
                alert(`Erro ao processar ${file.name}. Tente novamente.`);
            }
        }
        
        // Remover mensagem de processamento
        processingMsg.remove();
        this.renderPreview();
    },

    // Renderizar preview das fotos sendo adicionadas
    renderPreview() {
        const previewContainer = document.getElementById('photosPreview');
        previewContainer.innerHTML = '';

        this.previewPhotos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'photo-preview-item';
            
            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption}">
                <div class="photo-caption">
                    <input 
                        type="text" 
                        class="photo-input-group" 
                        placeholder="Legenda da foto..."
                        value="${photo.caption}"
                        onchange="photoManager.updatePreviewCaption(${index}, this.value)"
                        style="width: 100%; padding: 10px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-size: 0.9rem;"
                    >
                </div>
                <button class="delete-btn" onclick="photoManager.removePreview(${index})">×</button>
            `;
            
            previewContainer.appendChild(item);
        });

        if (this.previewPhotos.length > 0) {
            const saveBtn = document.createElement('button');
            saveBtn.className = 'admin-btn';
            saveBtn.textContent = '💾 Salvar Todas as Fotos';
            saveBtn.style.marginTop = '20px';
            saveBtn.style.width = '100%';
            saveBtn.onclick = () => this.savePreviewPhotos();
            previewContainer.appendChild(saveBtn);
        }
    },

    // Atualizar legenda do preview
    updatePreviewCaption(index, caption) {
        if (this.previewPhotos[index]) {
            this.previewPhotos[index].caption = caption;
        }
    },

    // Remover foto do preview
    removePreview(index) {
        this.previewPhotos.splice(index, 1);
        this.renderPreview();
    },

    // Salvar fotos do preview
    savePreviewPhotos() {
        if (this.previewPhotos.length === 0) {
            alert('Nenhuma foto para salvar!');
            return;
        }

        const photosCount = this.previewPhotos.length;

        // Adicionar ao array de fotos existentes
        this.currentPhotos.push(...this.previewPhotos);
        
        // Tentar salvar no localStorage (sem erro se falhar - quota excedida)
        this.trySaveToLocalStorage(this.currentPhotos);
        
        // Sempre fazer download do arquivo JSON (fonte principal)
        this.downloadPhotosJson();

        // Limpar preview
        this.previewPhotos = [];
        document.getElementById('photosPreview').innerHTML = '';
        
        // Atualizar lista
        this.renderPhotos();
        
        // Mostrar mensagem de sucesso
        const successMsg = document.getElementById('successMessage');
        successMsg.textContent = `✅ ${photosCount} foto(s) salva(s) com sucesso! Baixe o arquivo photos.json e coloque na pasta do projeto.`;
        successMsg.classList.add('show');
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    },

    // Renderizar lista de fotos
    renderPhotos() {
        const grid = document.getElementById('photosGrid');
        
        if (!this.currentPhotos || this.currentPhotos.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📷</div>
                    <div class="empty-state-text">Nenhuma foto adicionada ainda</div>
                </div>
            `;
            return;
        }

        grid.innerHTML = '';
        
        this.currentPhotos.forEach((photo, index) => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            
            const date = new Date(photo.date);
            const dateStr = date.toLocaleDateString('pt-BR');
            
            card.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption}">
                <div class="photo-card-info">
                    <div class="caption">${photo.caption || 'Sem legenda'}</div>
                    <div class="date">Adicionada em ${dateStr}</div>
                </div>
                <button class="delete-photo-btn" onclick="photoManager.deletePhoto(${index})" title="Excluir foto">×</button>
            `;
            
            grid.appendChild(card);
        });
    },

    // Deletar foto
    deletePhoto(index) {
        if (confirm('Tem certeza que deseja excluir esta foto?')) {
            this.currentPhotos.splice(index, 1);
            // Tentar salvar no localStorage (sem erro se falhar)
            this.trySaveToLocalStorage(this.currentPhotos);
            // Sempre fazer download do JSON atualizado
            this.downloadPhotosJson();
            this.renderPhotos();
        }
    },

    // Download do arquivo JSON (para commit no git)
    downloadPhotosJson() {
        const data = {
            photos: this.currentPhotos,
            lastUpdated: new Date().toISOString()
        };
        
        try {
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'photos.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log(`✅ Arquivo photos.json gerado com ${this.currentPhotos.length} foto(s)`);
        } catch (e) {
            console.error('Erro ao gerar arquivo JSON:', e);
            alert('Erro ao gerar arquivo JSON. Tente novamente.');
        }
    }
};

// Carregar fotos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    photoManager.loadPhotos();
});

