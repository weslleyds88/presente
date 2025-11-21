// Gerenciador de Músicas no Admin
const musicManager = {
    currentMusic: [],
    previewMusic: null,
    previewCover: null,

    // Carregar músicas
    async loadMusic() {
        try {
            // Tentar carregar do arquivo primeiro
            const response = await fetch('music.json');
            if (response.ok) {
                const data = await response.json();
                this.currentMusic = data.music || [];
            } else {
                // Tentar localStorage como fallback
                const musicJson = localStorage.getItem('music_data');
                if (musicJson) {
                    this.currentMusic = JSON.parse(musicJson);
                }
            }
        } catch (e) {
            // Tentar localStorage
            try {
                const musicJson = localStorage.getItem('music_data');
                if (musicJson) {
                    this.currentMusic = JSON.parse(musicJson);
                }
            } catch (e2) {
                console.error('Erro ao carregar músicas:', e2);
                this.currentMusic = [];
            }
        }
        
        this.renderMusicList();
    },

    // Processar arquivo de música
    handleMusicFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 20 * 1024 * 1024) {
            alert('Arquivo muito grande! Máximo 20MB.');
            return;
        }
        
        if (!file.type.includes('audio')) {
            alert('Por favor, selecione um arquivo de áudio (MP3)!');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewMusic = {
                file: file,
                base64: e.target.result,
                name: file.name
            };
            this.updateMusicPreview();
        };
        reader.readAsDataURL(file);
    },
    
    // Processar arquivo de capa
    async handleCoverFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) {
            alert('Imagem muito grande! Máximo 5MB.');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione uma imagem!');
            return;
        }
        
        // Comprimir imagem (usar função do admin.js se disponível)
        try {
            const compressed = await this.compressImage(file);
            this.previewCover = compressed;
            this.updateCoverPreview();
        } catch (e) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewCover = e.target.result;
                this.updateCoverPreview();
            };
            reader.readAsDataURL(file);
        }
    },
    
    // Comprimir imagem
    compressImage(file, maxWidth = 800, quality = 0.8) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                
                img.onerror = () => {
                    resolve(e.target.result);
                };
                
                img.src = e.target.result;
            };
            
            reader.readAsDataURL(file);
        });
    },
    
    // Atualizar preview da música
    updateMusicPreview() {
        const preview = document.getElementById('musicFilePreview');
        if (!preview || !this.previewMusic) return;
        
        const sizeMB = (this.previewMusic.file.size / (1024 * 1024)).toFixed(2);
        preview.innerHTML = `
            <div style="background: rgba(76, 175, 80, 0.2); border: 2px solid rgba(76, 175, 80, 0.5); padding: 15px; border-radius: 10px; display: flex; align-items: center; gap: 15px;">
                <span style="font-size: 2rem;">🎵</span>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #c8e6c9;">${this.previewMusic.name}</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">${sizeMB} MB</div>
                </div>
                <button onclick="musicManager.removeMusicPreview()" style="background: rgba(244, 67, 54, 0.8); border: none; border-radius: 50%; width: 30px; height: 30px; color: white; cursor: pointer;">×</button>
            </div>
        `;
    },
    
    // Atualizar preview da capa
    updateCoverPreview() {
        const preview = document.getElementById('coverFilePreview');
        if (!preview || !this.previewCover) return;
        
        preview.innerHTML = `
            <div style="background: rgba(76, 175, 80, 0.2); border: 2px solid rgba(76, 175, 80, 0.5); padding: 15px; border-radius: 10px; display: flex; align-items: center; gap: 15px;">
                <img src="${this.previewCover}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #c8e6c9;">Capa adicionada</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">Imagem comprimida</div>
                </div>
                <button onclick="musicManager.removeCoverPreview()" style="background: rgba(244, 67, 54, 0.8); border: none; border-radius: 50%; width: 30px; height: 30px; color: white; cursor: pointer;">×</button>
            </div>
        `;
    },
    
    // Remover preview da música
    removeMusicPreview() {
        this.previewMusic = null;
        document.getElementById('musicFilePreview').innerHTML = '';
        document.getElementById('musicFileInput').value = '';
    },
    
    // Remover preview da capa
    removeCoverPreview() {
        this.previewCover = null;
        document.getElementById('coverFilePreview').innerHTML = '';
        document.getElementById('coverFileInput').value = '';
    },
    
    // Adicionar música
    addMusic() {
        const title = document.getElementById('musicTitle').value.trim();
        const artist = document.getElementById('musicArtist').value.trim();

        if (!title || !artist) {
            alert('Por favor, preencha Título e Artista!');
            return;
        }
        
        if (!this.previewMusic) {
            alert('Por favor, adicione um arquivo de música (MP3)!');
            return;
        }

        const musicData = {
            id: Date.now() + Math.random(),
            title: title,
            artist: artist,
            url: this.previewMusic.base64, // Base64 do arquivo MP3
            cover: this.previewCover || null,
            duration: 0,
            date: new Date().toISOString()
        };

        this.currentMusic.push(musicData);
        
        // Tentar salvar no localStorage
        this.trySaveToLocalStorage();
        
        // Sempre fazer download do JSON
        this.downloadMusicJson();

        // Limpar formulário
        document.getElementById('musicTitle').value = '';
        document.getElementById('musicArtist').value = '';
        this.previewMusic = null;
        this.previewCover = null;
        document.getElementById('musicFilePreview').innerHTML = '';
        document.getElementById('coverFilePreview').innerHTML = '';
        document.getElementById('musicFileInput').value = '';
        document.getElementById('coverFileInput').value = '';

        // Atualizar lista
        this.renderMusicList();

        // Mostrar mensagem de sucesso
        const successMsg = document.getElementById('musicSuccessMessage');
        successMsg.textContent = `✅ Música "${title}" adicionada com sucesso! Baixe o arquivo music.json e coloque na pasta do projeto.`;
        successMsg.classList.add('show');
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    },

    // Renderizar lista de músicas
    renderMusicList() {
        const container = document.getElementById('musicListAdmin');
        if (!container) return;

        if (!this.currentMusic || this.currentMusic.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎵</div>
                    <div class="empty-state-text">Nenhuma música adicionada ainda</div>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        
        this.currentMusic.forEach((music, index) => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.style.cssText = 'display: flex; align-items: center; gap: 20px; padding: 20px;';
            
            const date = new Date(music.date);
            const dateStr = date.toLocaleDateString('pt-BR');
            
            card.innerHTML = `
                <div style="font-size: 3rem; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; background: var(--gradient-2); border-radius: 15px; flex-shrink: 0;">
                    🎵
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 1.2rem; font-weight: 600; color: #ffd700; margin-bottom: 5px;">
                        ${music.title || 'Sem título'}
                    </div>
                    <div style="font-size: 1rem; opacity: 0.9; margin-bottom: 5px;">
                        ${music.artist || 'Artista desconhecido'}
                    </div>
                    <div style="font-size: 0.85rem; opacity: 0.7;">
                        Adicionada em ${dateStr}
                    </div>
                    ${music.url && music.url.startsWith('data:') ? `<div style="font-size: 0.8rem; opacity: 0.6; margin-top: 5px;">Arquivo MP3 (base64)</div>` : ''}
                </div>
                <button class="delete-photo-btn" onclick="musicManager.deleteMusic(${index})" title="Excluir música">×</button>
            `;
            
            container.appendChild(card);
        });
    },

    // Deletar música
    deleteMusic(index) {
        if (confirm('Tem certeza que deseja excluir esta música?')) {
            this.currentMusic.splice(index, 1);
            this.trySaveToLocalStorage();
            this.downloadMusicJson();
            this.renderMusicList();
        }
    },

    // Tentar salvar no localStorage
    trySaveToLocalStorage() {
        try {
            const json = JSON.stringify(this.currentMusic);
            if (json.length < 4 * 1024 * 1024) { // Menos de 4MB
                localStorage.setItem('music_data', json);
            }
        } catch (e) {
            console.log('Não foi possível salvar no localStorage, usando apenas arquivo JSON');
        }
    },

    // Download do arquivo JSON
    downloadMusicJson() {
        const data = {
            music: this.currentMusic,
            lastUpdated: new Date().toISOString()
        };
        
        try {
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'music.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log(`✅ Arquivo music.json gerado com ${this.currentMusic.length} música(s)`);
        } catch (e) {
            console.error('Erro ao gerar arquivo JSON:', e);
            alert('Erro ao gerar arquivo JSON. Tente novamente.');
        }
    }
};

// Carregar músicas quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    musicManager.loadMusic();
});

