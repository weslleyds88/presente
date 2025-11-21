// Sistema de Autenticação
const auth = {
    // Credenciais padrão - ALTERE ESTAS SENHAS ANTES DE FAZER DEPLOY!
    credentials: {
        viewer: {
            username: 'presente2025',
            password: 'presente2025' // Altere esta senha!
        },
        admin: {
            username: 'admin',
            password: 'admin123' // Altere esta senha!
        }
    },

    // Verificar se está autenticado
    isAuthenticated() {
        const session = localStorage.getItem('auth_session');
        if (!session) return false;
        
        try {
            const sessionData = JSON.parse(session);
            // Verificar se a sessão não expirou (24 horas)
            if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
                this.logout();
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },

    // Obter tipo de usuário atual
    getUserType() {
        const session = localStorage.getItem('auth_session');
        if (!session) return null;
        
        try {
            const sessionData = JSON.parse(session);
            return sessionData.userType;
        } catch (e) {
            return null;
        }
    },

    // Fazer login
    login(username, password, userType) {
        const creds = this.credentials[userType];
        
        if (creds && username === creds.username && password === creds.password) {
            const sessionData = {
                username: username,
                userType: userType,
                timestamp: Date.now()
            };
            localStorage.setItem('auth_session', JSON.stringify(sessionData));
            return true;
        }
        
        return false;
    },

    // Fazer logout
    logout() {
        localStorage.removeItem('auth_session');
    },

    // Verificar acesso (redireciona para login se não autenticado)
    requireAuth(userType = null) {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        
        if (userType && this.getUserType() !== userType) {
            // Se requer um tipo específico e não é esse tipo, redireciona
            if (userType === 'admin') {
                window.location.href = 'index.html';
            } else {
                window.location.href = 'login.html';
            }
            return false;
        }
        
        return true;
    }
};

