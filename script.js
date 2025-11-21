// CONFIGURAÇÃO: Altere esta data para a data que vocês começaram a namorar
const START_DATE = new Date('2022-11-23T00:00:00'); // Formato: YYYY-MM-DD

// Mensagens românticas para a seção de mensagens aleatórias
const loveMessages = [
    "Você é a razão do meu sorriso todos os dias ❤️",
    "Amo cada momento que passamos juntos 💕",
    "Você transformou minha vida de uma forma incrível ✨",
    "Seu amor é o maior presente que já recebi 🎁",
    "Cada dia ao seu lado é uma nova aventura 🌟",
    "Você é minha pessoa favorita no mundo inteiro 🌍",
    "Amo como você me faz rir até doer a barriga 😂",
    "Você é minha casa, meu porto seguro 🏠",
    "Amo como você me conhece melhor que eu mesmo 💭",
    "Você é a melhor parte do meu dia, todos os dias ☀️",
    "Amo nossos momentos de silêncio confortável 🤗",
    "Você me faz querer ser uma pessoa melhor cada dia 🌱",
    "Amo como você me apoia em tudo que faço 💪",
    "Você é minha melhor amiga e meu grande amor 💑",
    "Amo como você me faz sentir especial todos os dias ⭐",
    "Você é minha inspiração para ser melhor a cada dia 🌸",
    "Amo como você entende meus silêncios e meus sorrisos 💫",
    "Você é o sol que ilumina meus dias mais escuros ☀️",
    "Amo como você me faz sentir em casa, não importa onde estejamos 🏡",
    "Você é a pessoa que eu escolheria novamente, sempre e sempre 💖"
];

// Promessas e Sonhos (personalize com seus próprios sonhos!)
const promises = [
    {
        icon: "🏠",
        title: "Nossa Casa",
        description: "Sonho em construir nosso lar juntos, cheio de amor e memórias especiais"
    },
    {
        icon: "✈️",
        title: "Viajar pelo Mundo",
        description: "Explorar novos lugares e criar aventuras inesquecíveis ao seu lado"
    },
    {
        icon: "💍",
        title: "Nosso Futuro",
        description: "Continuar escrevendo nossa história de amor, sempre juntos"
    },
    {
        icon: "🌅",
        title: "Todos os Dias",
        description: "Amar você mais a cada dia que passa, sem nunca parar"
    },
    {
        icon: "🎉",
        title: "Celebrar Tudo",
        description: "Comemorar cada conquista, grande ou pequena, sempre juntos"
    },
    {
        icon: "💕",
        title: "Crescer Juntos",
        description: "Apoiar um ao outro em todos os sonhos e desafios da vida"
    }
];

// Perguntas do quiz (personalize com suas próprias perguntas)
const quizQuestions = [
    {
        question: "Quando começamos a namorar?",
        options: [
            "23 de Novembro de 2022",
            "20 de Dezembro de 2022",
            "15 de Janeiro de 2022",
            "10 de Fevereiro de 2022"
        ],
        correct: 0 // Índice da resposta correta
    },
    {
        question: "Qual foi nosso primeiro encontro?",
        options: [
            "No Shopping",
            "No Vila Lobos",
            "No Sesc",
            "Na SAI"
        ],
        correct: 0
    },
    {
        question: "Oque eu mais gosto em você ?",
        options: [
            "Sorriso",
            "Cabelos",
            "Boca",
            "Pernas"
        ],
        correct: 0
    }
];

// Estado do quiz
let currentQuestionIndex = 0;
let quizAnswered = false;
let quizScore = 0; // Pontuação do quiz
let currentPhotoIndex = 0;
let galleryPhotos = [];

// Estado do player de música
let musicList = [];
let currentMusicIndex = -1;
let isPlaying = false;
let audioPlayer = null;
let youtubePlayer = null;
let isYouTubeVideo = false;
let youtubeAPIReady = false;

// Estado do player de fundo
let backgroundMusicPlayer = null;
let backgroundMusicIndex = 0;
let backgroundMusicPlaying = false;
let isPlanosPlaying = false;

// Função chamada quando a API do YouTube está pronta (deve ser global)
window.onYouTubeIframeAPIReady = function() {
    youtubeAPIReady = true;
    console.log('YouTube API pronta');
    
    // Se já tem uma música selecionada e é YouTube, inicializar
    if (currentMusicIndex >= 0 && isYouTubeVideo && musicList[currentMusicIndex]) {
        const music = musicList[currentMusicIndex];
        const videoId = extractYouTubeId(music.url || music.src);
        if (videoId) {
            initYouTubePlayer(videoId);
        }
    }
};

// Criar partículas de fundo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Atualizar contador de tempo
function updateTimer() {
    const now = new Date();
    const diff = now - START_DATE;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Adicionar zeros à esquerda
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    // Atualizar estatísticas
    document.getElementById('statDays').textContent = days;
    document.getElementById('statHours').textContent = Math.floor(days * 24 + hours);
    document.getElementById('statMinutes').textContent = Math.floor((days * 24 + hours) * 60 + minutes);
}

// Scroll suave para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navHeight;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Navegação fixa com efeito de scroll
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Carregar galeria de fotos
async function loadGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Limpar galeria
    
    let photoData = [];
    
    // Sempre tentar carregar do arquivo JSON primeiro (fonte principal)
    try {
        const response = await fetch('photos.json');
        if (response.ok) {
            const data = await response.json();
            photoData = data.photos || [];
        }
    } catch (e) {
        console.log('Arquivo photos.json não encontrado, tentando localStorage...');
    }
    
    // Se não conseguiu carregar do arquivo, tentar localStorage como fallback
    if (photoData.length === 0) {
        try {
            const photosJson = localStorage.getItem('photos_data');
            if (photosJson) {
                photoData = JSON.parse(photosJson);
            }
        } catch (e) {
            console.error('Erro ao carregar fotos do localStorage:', e);
            // Limpar localStorage corrompido
            try {
                localStorage.removeItem('photos_data');
            } catch (e2) {
                // Ignorar erro ao limpar
            }
        }
    }
    
    // Se ainda não houver fotos, mostrar mensagem
    if (photoData.length === 0) {
        gallery.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; opacity: 0.7;">
                <div style="font-size: 4rem; margin-bottom: 20px;">📷</div>
                <div style="font-size: 1.3rem;">Nenhuma foto adicionada ainda</div>
                <div style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">Faça login como admin para adicionar fotos</div>
            </div>
        `;
        return;
    }
    
    // Renderizar fotos com efeitos especiais
    console.log('Carregando', photoData.length, 'fotos');
    photoData.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.cssText += 'position: relative !important; overflow: hidden !important; display: flex !important; opacity: 1 !important; visibility: visible !important;';
        item.onclick = () => openLightbox(index);
        
        // Badge especial para algumas fotos - sempre visível
        if (index === 0) {
            const badge = document.createElement('div');
            badge.className = 'gallery-item-badge';
            badge.textContent = '⭐ Primeira Foto';
            badge.style.cssText = 'position: absolute; top: 15px; left: 15px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; color: white !important; z-index: 15; box-shadow: 0 4px 15px rgba(245, 87, 108, 0.6); border: 2px solid rgba(255, 255, 255, 0.6); pointer-events: none; text-shadow: 0 2px 5px rgba(0,0,0,0.7); opacity: 1 !important; visibility: visible !important; display: block !important;';
            item.appendChild(badge);
        }
        
        // Ícone de foto - sempre visível
        const icon = document.createElement('div');
        icon.className = 'gallery-item-icon';
        icon.textContent = '📸';
        icon.style.cssText = 'position: absolute; top: 15px; right: 15px; background: rgba(255, 255, 255, 0.95) !important; border-radius: 50%; width: 45px; height: 45px; display: flex !important; align-items: center; justify-content: center; font-size: 1.3rem; z-index: 15; border: 2px solid rgba(255, 215, 0, 0.8); box-shadow: 0 4px 15px rgba(0,0,0,0.4); pointer-events: none; opacity: 1 !important; visibility: visible !important;';
        item.appendChild(icon);
        
        const img = document.createElement('img');
        img.src = photo.src; // Pode ser base64 ou URL
        img.alt = photo.caption || 'Nossa memória especial';
        img.loading = 'lazy'; // Lazy loading para performance
        img.style.cssText = 'width: 100% !important; height: 100% !important; object-fit: cover !important; display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: 1 !important; opacity: 1 !important; visibility: visible !important;';
        img.onload = function() {
            console.log('Imagem carregada:', photo.caption || index);
            this.style.opacity = '1';
            this.style.visibility = 'visible';
        };
        img.onerror = function() {
            console.error('Erro ao carregar imagem:', photo.caption, photo.src ? photo.src.substring(0, 50) : 'sem src');
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-text';
            placeholder.textContent = photo.caption || 'Foto';
            placeholder.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 5; font-size: 1.3rem; text-align: center; padding: 20px; color: rgba(255,255,255,0.8);';
            item.appendChild(placeholder);
        };
        
        // Adicionar efeito parallax na imagem
        img.onload = function() {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                
                img.style.transform = `scale(1.15) translate(${moveX}px, ${moveY}px)`;
            });
            
            item.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1.15)';
            });
        };
        
        item.appendChild(img);
        
        // Overlay com informações - sempre visível
        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';
        overlay.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 40%, transparent 100%); padding: 25px 20px 20px; z-index: 10; pointer-events: none; opacity: 1 !important; visibility: visible !important;';
        
        const caption = document.createElement('div');
        caption.className = 'gallery-item-caption';
        // Só mostrar caption se não estiver vazia e não for um nome de arquivo
        const displayCaption = photo.caption && !photo.caption.match(/^(IMG_|DSC_|PICT|photo|image)/i) 
            ? photo.caption 
            : 'Nossa memória especial';
        caption.textContent = displayCaption;
        caption.style.cssText = 'color: white !important; font-size: 1.1rem; font-weight: 600; margin-bottom: 6px; text-shadow: 0 2px 8px rgba(0,0,0,0.8); opacity: 1 !important;';
        overlay.appendChild(caption);
        
        item.appendChild(overlay);
        gallery.appendChild(item);
        galleryPhotos.push(photo);
    });
}

// Lightbox para fotos
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (galleryPhotos[index]) {
        lightboxImage.src = galleryPhotos[index].src;
        const photo = galleryPhotos[index];
        // Filtrar nomes de arquivo (IMG_, DSC_, etc)
        const displayCaption = photo.caption && !photo.caption.match(/^(IMG_|DSC_|PICT|photo|image)/i) 
            ? photo.caption 
            : 'Nossa memória especial';
        lightboxCaption.textContent = displayCaption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        lightbox.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
    // Garantir que o conteúdo principal esteja visível
    const mainContent = document.querySelector('main') || document.body;
    mainContent.style.display = 'block';
    mainContent.style.visibility = 'visible';
    mainContent.style.opacity = '1';
}

function changePhoto(direction) {
    currentPhotoIndex += direction;
    
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = galleryPhotos.length - 1;
    } else if (currentPhotoIndex >= galleryPhotos.length) {
        currentPhotoIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (galleryPhotos[currentPhotoIndex]) {
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = galleryPhotos[currentPhotoIndex].src;
            const photo = galleryPhotos[currentPhotoIndex];
            // Filtrar nomes de arquivo (IMG_, DSC_, etc)
            const displayCaption = photo.caption && !photo.caption.match(/^(IMG_|DSC_|PICT|photo|image)/i) 
                ? photo.caption 
                : 'Nossa memória especial';
            lightboxCaption.textContent = displayCaption;
            lightboxImage.style.opacity = '1';
        }, 200);
    }
}

// Fechar lightbox com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        changePhoto(-1);
    } else if (e.key === 'ArrowRight') {
        changePhoto(1);
    }
});

// Inicializar quiz
function initQuiz() {
    if (quizQuestions.length === 0) return;
    
    const question = quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('quizOptions');
    const progressBar = document.querySelector('.progress-bar::after');
    const progressText = document.getElementById('progressText');
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Atualizar barra de progresso
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.querySelector('.progress-bar').style.setProperty('--progress', progress + '%');
    const progressBarAfter = document.querySelector('.progress-bar');
    progressBarAfter.style.background = `linear-gradient(to right, rgba(245, 87, 108, 0.8) 0%, rgba(245, 87, 108, 0.8) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`;
    
    progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
    
    document.getElementById('quiz-result').textContent = '';
    quizAnswered = false;
}

// Verificar resposta do quiz
function checkAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const question = quizQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.quiz-btn');
    const resultDiv = document.getElementById('quiz-result');
    
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selectedIndex === question.correct) {
        quizScore++; // Incrementar pontuação
        resultDiv.textContent = '🎉 Parabéns! Você acertou! 🎉';
        resultDiv.style.color = '#4caf50';
        
        // Criar confete
        createConfetti();
        
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                initQuiz();
            } else {
                // Quiz completo - mostrar resultado final
                showQuizResult();
            }
        }, 2000);
    } else {
        resultDiv.textContent = '😊 Quase lá! Tente novamente!';
        resultDiv.style.color = '#f44336';
        
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                initQuiz();
            } else {
                // Quiz completo mesmo errando a última
                showQuizResult();
            }
        }, 2000);
    }
}

// Mostrar resultado final do quiz com ranking
function showQuizResult() {
    const quizContainer = document.getElementById('quiz-container');
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    
    // Determinar mensagem e emoji baseado na pontuação
    let rankTitle, rankMessage, rankEmoji, rankColor;
    
    if (percentage === 100) {
        rankTitle = '🏆 PERFEITO! 🏆';
        rankMessage = 'Você conhece nossa história perfeitamente! Você é incrível!';
        rankEmoji = '💯';
        rankColor = '#ffd700';
    } else if (percentage >= 80) {
        rankTitle = '⭐ EXCELENTE! ⭐';
        rankMessage = 'Você conhece muito bem nossa história! Estou impressionado!';
        rankEmoji = '🌟';
        rankColor = '#ffd700';
    } else if (percentage >= 60) {
        rankTitle = '💕 MUITO BOM! 💕';
        rankMessage = 'Você conhece bem nossa história! Continue assim!';
        rankEmoji = '✨';
        rankColor = '#ff6b9d';
    } else if (percentage >= 40) {
        rankTitle = '💖 BOM! 💖';
        rankMessage = 'Você está aprendendo nossa história! Vamos continuar criando memórias!';
        rankEmoji = '💗';
        rankColor = '#c44569';
    } else {
        rankTitle = '💝 CONTINUE TENTANDO! 💝';
        rankMessage = 'Cada dia juntos é uma nova oportunidade de aprender sobre nós!';
        rankEmoji = '🌱';
        rankColor = '#6c5ce7';
    }
    
    // Criar HTML do resultado
    quizContainer.innerHTML = `
        <div class="quiz-result-final">
            <div class="quiz-result-icon">${rankEmoji}</div>
            <h2 class="quiz-result-title" style="color: ${rankColor};">${rankTitle}</h2>
            <div class="quiz-result-score">
                <div class="score-circle">
                    <div class="score-value">${quizScore}</div>
                    <div class="score-total">/${totalQuestions}</div>
                </div>
                <div class="score-percentage">${percentage}%</div>
            </div>
            <p class="quiz-result-message">${rankMessage}</p>
            <div class="quiz-result-stats">
                <div class="stat-item">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${quizScore}</div>
                    <div class="stat-label">Acertos</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value">${percentage}%</div>
                    <div class="stat-label">Precisão</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">💕</div>
                    <div class="stat-value">${totalQuestions}</div>
                    <div class="stat-label">Perguntas</div>
                </div>
            </div>
            <button class="quiz-restart-btn" onclick="restartQuiz()">
                <span>🔄</span>
                <span>Fazer Novamente</span>
            </button>
        </div>
    `;
    
    // Criar confete especial
    createConfetti();
    
    // Animações especiais
    setTimeout(() => {
        const resultFinal = document.querySelector('.quiz-result-final');
        if (resultFinal) {
            resultFinal.style.animation = 'fadeInUp 0.8s ease-out';
        }
    }, 100);
}

// Reiniciar quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    initQuiz();
}

// Criar efeito de confete (melhorado)
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#6c5ce7', '#a29bfe', '#4facfe', '#ffd700'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Adicionar animação de confete ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mostrar mensagem aleatória
function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    const messageDiv = document.getElementById('random-message');
    messageDiv.innerHTML = `<p>${loveMessages[randomIndex]}</p>`;
    messageDiv.style.animation = 'none';
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
    
    // Criar corações flutuantes
    createFloatingHearts();
}

// Criar corações flutuantes
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '💞'];
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = `floatHeart 3s ease-out forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// Animações de timeline ao scroll
function handleTimelineScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < windowHeight - 100 && !item.classList.contains('visible')) {
            item.classList.add('visible');
        }
    });
}

// Toggle música de fundo
let musicPlaying = false;
function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const audio = document.getElementById('backgroundMusic');
    
    if (musicPlaying) {
        audio.pause();
        musicToggle.classList.remove('playing');
        musicPlaying = false;
    } else {
        // Descomente se tiver um arquivo de música
        // audio.play();
        musicToggle.classList.add('playing');
        musicPlaying = true;
    }
}

// Atualizar data no rodapé
function updateFooterDate() {
    const footerDate = document.getElementById('footer-date');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    footerDate.textContent = `Criado em ${now.toLocaleDateString('pt-BR', options)}`;
}

// Carregar músicas
async function loadMusic() {
    let musicData = [];
    
    // Tentar carregar do arquivo JSON primeiro
    try {
        const response = await fetch('music.json');
        if (response.ok) {
            const data = await response.json();
            musicData = data.music || [];
        }
    } catch (e) {
        console.log('Arquivo music.json não encontrado');
    }
    
    // Se não conseguiu carregar do arquivo, tentar localStorage
    if (musicData.length === 0) {
        try {
            const musicJson = localStorage.getItem('music_data');
            if (musicJson) {
                musicData = JSON.parse(musicJson);
            }
        } catch (e) {
            console.error('Erro ao carregar músicas do localStorage:', e);
        }
    }
    
    musicList = musicData;
    renderMusicList();
    
    // Se houver músicas, iniciar player de fundo automático
    if (musicList.length > 0) {
        // Iniciar player de fundo automático
        initBackgroundMusic();
    } else {
        showEmptyMusicState();
    }
}

// Inicializar player de fundo automático
function initBackgroundMusic() {
    if (musicList.length === 0) return;
    
    // Criar player de fundo separado
    backgroundMusicPlayer = new Audio();
    backgroundMusicPlayer.volume = 0.2; // Volume mais baixo para fundo (20%)
    backgroundMusicPlayer.loop = false;
    
    // Quando uma música terminar, tocar a próxima
    backgroundMusicPlayer.addEventListener('ended', () => {
        if (!isPlanosPlaying) {
            playNextBackgroundMusic();
        }
    });
    
    // Iniciar com a primeira música
    backgroundMusicIndex = 0;
    playBackgroundMusic(backgroundMusicIndex);
    
    // Atualizar widget
    updateBackgroundMusicWidget();
}

// Tocar música de fundo
function playBackgroundMusic(index) {
    if (musicList.length === 0 || isPlanosPlaying) return;
    
    if (index < 0) index = musicList.length - 1;
    if (index >= musicList.length) index = 0;
    
    backgroundMusicIndex = index;
    const music = musicList[index];
    
    // Verificar se é "Planos do BK" - não tocar no player de fundo
    if (music.title && music.title.toLowerCase().includes('planos')) {
        playNextBackgroundMusic();
        return;
    }
    
    if (!backgroundMusicPlayer) return;
    
    backgroundMusicPlayer.src = music.url || music.src;
    backgroundMusicPlayer.load();
    
    backgroundMusicPlayer.play().catch(e => {
        console.error('Erro ao tocar música de fundo:', e);
        playNextBackgroundMusic();
    });
    
    backgroundMusicPlaying = true;
    updateBackgroundMusicWidget();
}

// Tocar próxima música de fundo
function playNextBackgroundMusic() {
    if (musicList.length === 0) return;
    
    let nextIndex = backgroundMusicIndex + 1;
    
    // Pular "Planos" se encontrar
    while (nextIndex < musicList.length && 
           musicList[nextIndex].title && 
           musicList[nextIndex].title.toLowerCase().includes('planos')) {
        nextIndex++;
    }
    
    if (nextIndex >= musicList.length) {
        nextIndex = 0;
        // Pular "Planos" se for a primeira
        if (musicList[nextIndex].title && 
            musicList[nextIndex].title.toLowerCase().includes('planos')) {
            nextIndex = 1;
        }
    }
    
    playBackgroundMusic(nextIndex);
}

// Atualizar widget de música de fundo
function updateBackgroundMusicWidget() {
    if (musicList.length === 0) return;
    
    const music = musicList[backgroundMusicIndex];
    const titleEl = document.getElementById('bgMusicTitle');
    const artistEl = document.getElementById('bgMusicArtist');
    const toggleEl = document.getElementById('bgMusicToggle');
    
    if (titleEl) {
        titleEl.textContent = music.title || 'Sem título';
    }
    if (artistEl) {
        artistEl.textContent = music.artist || 'Artista desconhecido';
    }
    if (toggleEl) {
        toggleEl.textContent = backgroundMusicPlaying ? '⏸️' : '▶️';
    }
}

// Toggle música de fundo
function toggleBackgroundMusic() {
    if (!backgroundMusicPlayer || musicList.length === 0) return;
    
    if (backgroundMusicPlaying) {
        backgroundMusicPlayer.pause();
        backgroundMusicPlaying = false;
    } else {
        if (backgroundMusicPlayer.src) {
            backgroundMusicPlayer.play();
        } else {
            playBackgroundMusic(backgroundMusicIndex);
        }
        backgroundMusicPlaying = true;
    }
    
    updateBackgroundMusicWidget();
}

// Renderizar lista de músicas (só mostrar Planos na seção principal)
function renderMusicList() {
    const musicListContainer = document.getElementById('musicList');
    
    if (!musicListContainer) return;
    
    if (musicList.length === 0) {
        showEmptyMusicState();
        return;
    }
    
    musicListContainer.innerHTML = '';
    
    // Encontrar e mostrar só "Planos" - busca mais flexível
    const planosIndex = musicList.findIndex(music => {
        const title = (music.title || '').toLowerCase();
        return title.includes('planos') || title.includes('plano');
    });
    
    if (planosIndex === -1) {
        // Se não encontrar Planos, mostrar mensagem ao invés de todas as músicas
        showEmptyMusicState();
        console.log('Música "Planos" não encontrada. Músicas disponíveis:', musicList.map(m => m.title));
        return;
    }
    
    // Mostrar só Planos de forma especial
    const planosMusic = musicList[planosIndex];
    createPlanosSpecialItem(musicListContainer, planosMusic, planosIndex);
}

// Criar item de música normal
function createMusicItem(container, music, index) {
    const item = document.createElement('div');
    item.className = 'music-item';
    if (index === currentMusicIndex) {
        item.classList.add('active');
    }
    
    item.onclick = () => playMusic(index);
    
    const duration = formatTime(music.duration || 0);
    
    item.innerHTML = `
        <div class="music-item-icon">🎵</div>
        <div class="music-item-info">
            <div class="music-item-title">${music.title || 'Sem título'}</div>
            <div class="music-item-artist">${music.artist || 'Artista desconhecido'}</div>
        </div>
        <div class="music-item-duration">${duration}</div>
    `;
    
    container.appendChild(item);
}

// Criar item especial para Planos
function createPlanosSpecialItem(container, music, index) {
    const item = document.createElement('div');
    item.className = 'planos-special-card';
    item.onclick = () => playMusic(index);
    
    item.innerHTML = `
        <div class="planos-card-content">
            <div class="planos-card-icon">💕</div>
            <div class="planos-card-info">
                <div class="planos-card-title">${music.title || 'Planos'}</div>
                <div class="planos-card-artist">${music.artist || 'BK'}</div>
                <div class="planos-card-subtitle">Nossa música especial</div>
            </div>
            <div class="planos-card-play">▶️</div>
        </div>
        <div class="planos-card-glow"></div>
    `;
    
    container.appendChild(item);
}

// Mostrar estado vazio
function showEmptyMusicState() {
    const musicListContainer = document.getElementById('musicList');
    if (musicListContainer) {
        musicListContainer.innerHTML = `
            <div class="music-empty-state">
                <div class="music-empty-state-icon">🎵</div>
                <div class="music-empty-state-text">Nenhuma música adicionada ainda</div>
                <div style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">Faça login como admin para adicionar músicas</div>
            </div>
        `;
    }
}

// Configurar player de áudio
function setupAudioPlayer() {
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        updateTotalTime();
    });
    
    audioPlayer.addEventListener('timeupdate', () => {
        updateProgress();
    });
    
    audioPlayer.addEventListener('ended', () => {
        if (isPlanosPlaying) {
            // Se era Planos, já foi tratado em playPlanosMusic
            return;
        }
        // Tocar próxima música automaticamente
        changeMusic(1);
        
        // Se não estava tocando música de fundo, voltar a tocar
        if (!backgroundMusicPlaying && backgroundMusicPlayer) {
            playNextBackgroundMusic();
        }
    });
    
    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });
    
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
}

// Extrair ID do vídeo do YouTube
function extractYouTubeId(url) {
    if (!url) return null;
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Verificar se é link do YouTube
function isYouTubeUrl(url) {
    return extractYouTubeId(url) !== null;
}

// Inicializar player do YouTube
function initYouTubePlayer(videoId) {
    const container = document.getElementById('youtubePlayer');
    if (!container) return;
    
    // Se já existe um player, destruir primeiro
    if (youtubePlayer) {
        try {
            youtubePlayer.destroy();
        } catch (e) {
            console.log('Erro ao destruir player anterior:', e);
        }
    }
    
    // Criar novo player
    youtubePlayer = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'enablejsapi': 1,
            'fs': 0,
            'iv_load_policy': 3,
            'modestbranding': 1,
            'playsinline': 1,
            'rel': 0
        },
        events: {
            'onReady': onYouTubePlayerReady,
            'onStateChange': onYouTubePlayerStateChange,
            'onError': onYouTubePlayerError
        }
    });
}

// Callback quando o player do YouTube está pronto
function onYouTubePlayerReady(event) {
    console.log('YouTube player pronto');
    isPlaying = true;
    updatePlayPauseButton();
    updateYouTubeProgress();
}

// Callback quando o estado do player muda
function onYouTubePlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        updatePlayPauseButton();
        updateYouTubeProgress();
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        updatePlayPauseButton();
    } else if (event.data === YT.PlayerState.ENDED) {
        // Tocar próxima música automaticamente
        changeMusic(1);
    }
}

// Callback de erro do YouTube
function onYouTubePlayerError(event) {
    console.error('Erro no player do YouTube:', event.data);
    alert('Erro ao carregar vídeo do YouTube. Verifique se o link está correto.');
}

// Atualizar progresso do YouTube
function updateYouTubeProgress() {
    if (!youtubePlayer || !isYouTubeVideo) return;
    
    try {
        const currentTime = youtubePlayer.getCurrentTime();
        const duration = youtubePlayer.getDuration();
        
        if (duration > 0) {
            const progress = (currentTime / duration) * 100;
            const progressBar = document.getElementById('playerProgress');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            const currentTimeEl = document.getElementById('currentTime');
            if (currentTimeEl) {
                currentTimeEl.textContent = formatTime(currentTime);
            }
            
            const totalTimeEl = document.getElementById('totalTime');
            if (totalTimeEl) {
                totalTimeEl.textContent = formatTime(duration);
            }
        }
        
        // Continuar atualizando
        if (isPlaying) {
            setTimeout(updateYouTubeProgress, 1000);
        }
    } catch (e) {
        console.error('Erro ao atualizar progresso do YouTube:', e);
    }
}

// Tocar música
function playMusic(index) {
    if (index < 0 || index >= musicList.length) return;
    
    currentMusicIndex = index;
    const music = musicList[index];
    const musicUrl = music.url || music.src;
    
    // Verificar se é "Planos do BK" - efeito especial!
    const isPlanos = music.title && music.title.toLowerCase().includes('planos');
    
    if (isPlanos) {
        // Pausar música de fundo
        if (backgroundMusicPlayer) {
            backgroundMusicPlayer.pause();
            backgroundMusicPlaying = false;
        }
        isPlanosPlaying = true;
        
        // Mostrar efeito especial
        showPlanosEffect();
        
        // Aguardar um pouco antes de tocar
        setTimeout(() => {
            playPlanosMusic(music, musicUrl);
        }, 2000);
    } else {
        // Música normal - pausar fundo temporariamente
        if (backgroundMusicPlayer && backgroundMusicPlaying) {
            backgroundMusicPlayer.pause();
        }
        isPlanosPlaying = false;
        playNormalMusic(music, musicUrl);
    }
    
    // Atualizar lista
    renderMusicList();
}

// Tocar música normal
function playNormalMusic(music, musicUrl) {
    // Usar player de áudio normal
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    
    audioPlayer.src = musicUrl;
    audioPlayer.load();
    
    // Tocar
    audioPlayer.play().catch(e => {
        console.error('Erro ao tocar música:', e);
        alert('Erro ao tocar música. Verifique se o arquivo está correto.');
    });
}

// Tocar música Planos com efeito especial
function playPlanosMusic(music, musicUrl) {
    
    // Usar player de áudio normal
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    
    audioPlayer.src = musicUrl;
    audioPlayer.load();
    
    // Tocar
    audioPlayer.play().catch(e => {
        console.error('Erro ao tocar música:', e);
        alert('Erro ao tocar música. Verifique se o arquivo está correto.');
    });
    
    // Quando terminar, esconder efeito e voltar música de fundo
    audioPlayer.addEventListener('ended', function onPlanosEnded() {
        isPlanosPlaying = false;
        hidePlanosEffect();
        
        // Voltar música de fundo
        if (backgroundMusicPlayer && !backgroundMusicPlaying) {
            playNextBackgroundMusic();
        }
        
        audioPlayer.removeEventListener('ended', onPlanosEnded);
    }, { once: true });
}

// Mostrar efeito especial Planos
function showPlanosEffect() {
    const effect = document.getElementById('planosEffect');
    if (effect) {
        effect.classList.add('show');
        
        // Criar confete especial
        createPlanosConfetti();
        
        // Criar partículas contínuas
        startPlanosParticles();
        
        // Criar corações flutuantes contínuos
        startPlanosHearts();
    }
}

// Esconder efeito especial Planos
function hidePlanosEffect() {
    const effect = document.getElementById('planosEffect');
    if (effect) {
        effect.classList.remove('show');
        stopPlanosAnimations();
    }
}

// Fechar efeito Planos (botão)
function closePlanosEffect() {
    if (audioPlayer && isPlanosPlaying) {
        audioPlayer.pause();
        isPlanosPlaying = false;
    }
    hidePlanosEffect();
    
    // Voltar música de fundo
    if (backgroundMusicPlayer && !backgroundMusicPlaying) {
        playNextBackgroundMusic();
    }
}

// Iniciar partículas contínuas
let planosParticlesInterval = null;
function startPlanosParticles() {
    const container = document.getElementById('planosParticles');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Criar partículas continuamente
    planosParticlesInterval = setInterval(() => {
        createPlanosParticle();
    }, 300);
    
    // Criar algumas iniciais
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createPlanosParticle(), i * 100);
    }
}

// Criar uma partícula
function createPlanosParticle() {
    const container = document.getElementById('planosParticles');
    if (!container) return;
    
    const particle = document.createElement('div');
    particle.className = 'planos-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-20px';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
    
    // Cores variadas
    const colors = ['rgba(255, 215, 0, 0.8)', 'rgba(255, 107, 157, 0.8)', 'rgba(248, 181, 0, 0.8)', 'rgba(255, 105, 180, 0.8)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // Remover após animação
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 8000);
}

// Iniciar corações flutuantes contínuos
let planosHeartsInterval = null;
function startPlanosHearts() {
    // Criar corações continuamente
    planosHeartsInterval = setInterval(() => {
        createFloatingHeart();
    }, 2000);
    
    // Criar alguns iniciais
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFloatingHeart(), i * 400);
    }
}

// Criar coração flutuante
function createFloatingHeart() {
    const hearts = ['💖', '💕', '💗', '💝', '💞', '❤️', '🧡', '💛'];
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 25) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10000';
    heart.style.animation = `floatHeart ${Math.random() * 2 + 3}s ease-out forwards`;
    heart.style.opacity = '0';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Parar animações
function stopPlanosAnimations() {
    if (planosParticlesInterval) {
        clearInterval(planosParticlesInterval);
        planosParticlesInterval = null;
    }
    if (planosHeartsInterval) {
        clearInterval(planosHeartsInterval);
        planosHeartsInterval = null;
    }
    
    // Limpar partículas
    const container = document.getElementById('planosParticles');
    if (container) {
        container.innerHTML = '';
    }
}

// Criar confete especial para Planos
function createPlanosConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffd700', '#ff69b4', '#ff1493'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '15px';
            confetti.style.height = '15px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 20);
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (musicList.length === 0) return;
    
    if (currentMusicIndex === -1) {
        // Se nenhuma música está selecionada, tocar a primeira
        playMusic(0);
        return;
    }
    
    // Controlar áudio normal
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
}

// Atualizar botão play/pause
function updatePlayPauseButton() {
    const btn = document.getElementById('playPauseBtn');
    if (!btn) return;
    
    if (isPlaying) {
        btn.textContent = '⏸️';
        btn.classList.add('playing');
    } else {
        btn.textContent = '▶️';
        btn.classList.remove('playing');
    }
}

// Trocar de música
function changeMusic(direction) {
    if (musicList.length === 0) return;
    
    let newIndex = currentMusicIndex + direction;
    
    if (newIndex < 0) {
        newIndex = musicList.length - 1; // Voltar para a última
    } else if (newIndex >= musicList.length) {
        newIndex = 0; // Ir para a primeira
    }
    
    playMusic(newIndex);
}

// Atualizar progresso
function updateProgress() {
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    const progressBar = document.getElementById('playerProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    
    updateCurrentTime();
}

// Atualizar tempo atual
function updateCurrentTime() {
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    const timeEl = document.getElementById('currentTime');
    if (timeEl) {
        timeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

// Atualizar tempo total
function updateTotalTime() {
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    const timeEl = document.getElementById('totalTime');
    if (timeEl) {
        timeEl.textContent = formatTime(audioPlayer.duration);
    }
}

// Formatar tempo (segundos para MM:SS)
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// Buscar posição na música
function seekMusic(event) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer || !audioPlayer.duration) return;
    
    const newTime = percentage * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
}

// Controlar volume
function setVolume(value) {
    const volumeValue = document.getElementById('volumeValue');
    if (volumeValue) {
        volumeValue.textContent = value + '%';
    }
    
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    
    audioPlayer.volume = value / 100;
}

// Confetti especial ao abrir a página
function createWelcomeConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#6c5ce7', '#a29bfe', '#ffd700'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 12 + 6}px;
                height: ${Math.random() * 12 + 6}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                opacity: ${Math.random() * 0.6 + 0.4};
                z-index: 9999;
                pointer-events: none;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${Math.random() * 4 + 3}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 7000);
        }, i * 15);
    }
}

// Corações que seguem o mouse (sutil e especial)
let mouseHeartTimeout;
let lastHeartTime = 0;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastHeartTime < 500) return; // Limitar frequência
    
    clearTimeout(mouseHeartTimeout);
    
    mouseHeartTimeout = setTimeout(() => {
        if (Math.random() > 0.97) { // 3% de chance - mais raro e especial
            lastHeartTime = now;
            const heart = document.createElement('div');
            const hearts = ['💖', '💕', '💗', '💝', '💞', '✨', '⭐'];
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                font-size: ${Math.random() * 12 + 12}px;
                pointer-events: none;
                z-index: 9998;
                animation: heartFollowMouse ${Math.random() * 1.5 + 1}s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2500);
        }
    }, 150);
});

// Carregar seção de Promessas
function loadPromises() {
    const promisesGrid = document.getElementById('promisesGrid');
    if (!promisesGrid) return;
    
    promisesGrid.innerHTML = '';
    
    promises.forEach((promise, index) => {
        const card = document.createElement('div');
        card.className = 'promise-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="promise-icon">${promise.icon}</div>
            <h3 class="promise-title">${promise.title}</h3>
            <p class="promise-description">${promise.description}</p>
        `;
        promisesGrid.appendChild(card);
    });
}

// Criar corações flutuantes contínuos em toda a página
let globalHeartsInterval = null;
function startGlobalFloatingHearts() {
    // Criar corações continuamente
    globalHeartsInterval = setInterval(() => {
        createGlobalFloatingHeart();
    }, 3000); // A cada 3 segundos
    
    // Criar alguns iniciais
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createGlobalFloatingHeart();
        }, i * 500);
    }
}

// Criar coração flutuante global
function createGlobalFloatingHeart() {
    const hearts = ['💖', '💕', '💗', '💝', '💞', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    heart.style.opacity = '0';
    heart.style.animation = `floatHeart ${Math.random() * 3 + 4}s ease-out forwards`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createWelcomeConfetti(); // Confetti especial ao abrir
    startGlobalFloatingHearts(); // Corações voando em toda a página
    updateTimer();
    setInterval(updateTimer, 1000);
    loadGallery();
    loadMusic();
    loadPromises(); // Carregar promessas
    initQuiz();
    updateFooterDate();
    
    // Event listeners
    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        handleTimelineScroll();
    });
    
    // Inicializar timeline
    handleTimelineScroll();
    
    // Adicionar efeito parallax suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const particles = document.getElementById('particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Adicionar animação aos cards quando visíveis
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.message-card, .stat-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
});

// Adicionar efeito de cursor personalizado (opcional)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        customCursor.style.left = e.clientX - 10 + 'px';
        customCursor.style.top = e.clientY - 10 + 'px';
    }
});

