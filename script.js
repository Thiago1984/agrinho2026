/**
 * Script de Lógica do Jogo "Equilíbrio Verde"
 * Tema: Agro forte, futuro sustentável.
 */

"use strict";

// ==========================================
// ESTADO DO JOGO (STATE)
// ==========================================
const state = {
    capital: 150,           // Dinheiro disponível do jogador
    sustainability: 60,     // Nível de sustentabilidade (0 a 100)
    productivity: 40,       // Nível de produtividade da terra (0 a 100)
    isGameOver: false,
    fontSizeStep: 0,        // Contador de acessibilidade de fonte
    targetCapital: 1000     // Objetivo de vitória
};

// ==========================================
// SELETORES DOM
// ==========================================
const elements = {
    capital: document.getElementById('val-capital'),
    sustainability: document.getElementById('val-sustainability'),
    productivity: document.getElementById('val-productivity'),
    barSustainability: document.getElementById('bar-sustainability'),
    barProductivity: document.getElementById('bar-productivity'),
    logContent: document.getElementById('log-content'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalMessage: document.getElementById('modal-message'),
    btnRestart: document.getElementById('btn-restart'),
    btnContrast: document.getElementById('btn-contrast'),
    btnFontPlus: document.getElementById('btn-font-plus'),
    btnFontMinus: document.getElementById('btn-font-minus'),
    // Botões de Ação
    btnHarvest: document.getElementById('btn-harvest'),
    btnBio: document.getElementById('btn-bio'),
    btnReforest: document.getElementById('btn-reforest'),
    btnTech: document.getElementById('btn-tech'),
    btnChemical: document.getElementById('btn-chemical')
};

// ==========================================
// SINTETIZADOR DE ÁUDIO DE ACESSIBILIDADE
// ==========================================
// Gera pequenos tons sonoros por código para feedback imediato das ações
function playTone(freq, type, duration) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = type || 'sine';
        oscillator.frequency.value = freq;
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn("Audio Context não suportado pelo navegador ou necessita de interação.");
    }
}

// ==========================================
// FUNÇÕES AUXILIARES / RENDERIZADORES
// ==========================================

// Adiciona entradas ao histórico (Log) de forma dinâmica
function addLog(text, type = 'system-msg') {
    const entry = document.createElement('p');
    entry.className = `log-entry ${type}`;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    entry.textContent = `[${timeStr}] ${text}`;
    
    elements.logContent.appendChild(entry);
    // Auto-scroll para acompanhar a última mensagem
    elements.logContent.scrollTop = elements.logContent.scrollHeight;
}

// Atualiza visualmente toda a interface do usuário com base no estado atual
function updateUI() {
    // Formatação de Capital
    elements.capital.textContent = `R$ ${state.capital.toFixed(2)}`;
    
    // Atualização das Barras e Textos de Porcentagem
    elements.sustainability.textContent = `${state.sustainability}%`;
    elements.barSustainability.style.width = `${state.sustainability}%`;
    elements.barSustainability.setAttribute('aria-valuenow', state.sustainability);

    elements.productivity.textContent = `${state.productivity}%`;
    elements.barProductivity.style.width = `${state.productivity}%`;
    elements.barProductivity.setAttribute('aria-valuenow', state.productivity);

    // Verificação de Condições de Fim de Jogo
    checkGameStatus();
}

// Controla limites de variáveis para não exceder 100% ou descer abaixo de 0%
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// ==========================================
// LOGICA DE NEGÓCIOS / AÇÕES DO JOGO
// ==========================================

function harvestCrop() {
    if (state.isGameOver) return;

    // A rentabilidade baseia-se diretamente no valor atual de produtividade
    const profit = Math.round(state.productivity * 1.5);
    
    if (profit <= 0) {
        addLog("Solo infértil! A colheita não gerou lucros. Melhore a terra primeiro.", "negative");
        playTone(150, 'sawtooth', 0.3);
        return;
    }

    state.capital += profit;
    // Colheita intensiva degrada levemente o solo se não houver investimento agroecológico
    state.sustainability = clamp(state.sustainability - 3, 0, 100);
    
    addLog(`Colheita realizada! Faturamento: +R$ ${profit},00. (-3% Sustentabilidade)`, "positive");
    playTone(600, 'sine', 0.15);
    updateUI();
}

function applyBioinputs() {
    if (state.isGameOver) return;
    const cost = 30;

    if (state.capital >= cost) {
        state.capital -= cost;
        state.sustainability = clamp(state.sustainability + 15, 0, 100);
        state.productivity = clamp(state.productivity + 5, 0, 100);
        addLog(`Bioinsumos aplicados. Custo: -R$ ${cost},00. (+15% Sust., +5% Prod.)`, "positive");
        playTone(440, 'sine', 0.2);
    } else {
        addLog("Saldo insuficiente para comprar bioinsumos!", "negative");
        playTone(200, 'triangle', 0.25);
    }
    updateUI();
}

function reforest() {
    if (state.isGameOver) return;
    const cost = 50;

    if (state.capital >= cost) {
        state.capital -= cost;
        state.sustainability = clamp(state.sustainability + 35, 0, 100);
        addLog(`Reflorestamento executado com sucesso! Custo: -R$ ${cost},00. (+35% Sustentabilidade)`, "positive");
        playTone(520, 'sine', 0.25);
    } else {
        addLog("Saldo insuficiente para reflorestar!", "negative");
        playTone(200, 'triangle', 0.25);
    }
    updateUI();
}

function installDrip() {
    if (state.isGameOver) return;
    const cost = 80;

    if (state.capital >= cost) {
        state.capital -= cost;
        state.productivity = clamp(state.productivity + 20, 0, 100);
        state.sustainability = clamp(state.sustainability + 10, 0, 100);
        addLog(`Irrigação gota a gota ativa. Custo: -R$ ${cost},00. (+20% Prod., +10% Sust.)`, "positive");
        playTone(650, 'sine', 0.25);
    } else {
        addLog("Saldo insuficiente para tecnologia de irrigação!", "negative");
        playTone(200, 'triangle', 0.25);
    }
    updateUI();
}

function applyChemical() {
    if (state.isGameOver) return;
    const cost = 20;

    if (state.capital >= cost) {
        state.capital -= cost;
        state.productivity = clamp(state.productivity + 25, 0, 100);
        state.sustainability = clamp(state.sustainability - 20, 0, 100);
        addLog(`Adubo Químico Intensivo aplicado! Custo: -R$ ${cost},00. (+25% Prod. | -20% Sust.)`, "negative");
        playTone(300, 'sawtooth', 0.3);
    } else {
        addLog("Saldo insuficiente para adubos químicos!", "negative");
        playTone(200, 'triangle', 0.25);
    }
    updateUI();
}

// ==========================================
// CONTROLE DO ESTADO DE JOGO (WIN/LOSE)
// ==========================================

function checkGameStatus() {
    // Condição de Derrota 1: Colapso Ecológico
    if (state.sustainability <= 0) {
        triggerGameOver(false, "Colapso Ecológico! A degradação contínua do ecossistema tornou suas terras inférteis e inviáveis para produção. O meio ambiente perdeu o equilíbrio.");
    }
    // Condição de Derrota 2: Falência Técnica (Sem caixa e sem produtividade para reerguer)
    else if (state.capital < 20 && state.productivity < 10 && state.sustainability < 20) {
        triggerGameOver(false, "Falência! Seus recursos financeiros esgotaram e a terra não produz o suficiente para recuperação.");
    }
    // Condição de Vitória: Atingir meta financeira mantendo sustentabilidade alta
    else if (state.capital >= state.targetCapital && state.sustainability >= 50) {
        triggerGameOver(true, `Parabéns! Você alcançou o equilíbrio ideal. Comprovou que é possível ter um Agro Forte e rentável preservando a biodiversidade e garantindo um futuro sustentável.`);
    }
}

function triggerGameOver(isVictory, message) {
    state.isGameOver = true;
    clearInterval(gameTickInterval);

    elements.modalTitle.textContent = isVictory ? "Vitória Sustentável! 🎉" : "Fim de Jogo ❌";
    elements.modalMessage.textContent = message;
    elements.modalOverlay.classList.remove('hidden');
    elements.modalOverlay.focus();

    if (isVictory) {
        playTone(880, 'sine', 0.5);
    } else {
        playTone(120, 'sawtooth', 0.6);
    }
}

function restartGame() {
    state.capital = 150;
    state.sustainability = 60;
    state.productivity = 40;
    state.isGameOver = false;

    elements.modalOverlay.classList.add('hidden');
    elements.logContent.innerHTML = "";
    addLog("Jogo Reiniciado. Desenvolva sua fazenda com inteligência ecológica!", "system-msg");
    
    // Reinicia o loop temporal do jogo
    clearInterval(gameTickInterval);
    gameTickInterval = setInterval(gameTick, 4000);

    updateUI();
}

// Loop Temporal do Jogo (Simulação de desgaste do solo a cada 4 segundos)
function gameTick() {
    if (state.isGameOver) return;
    
    // Queda passiva natural na sustentabilidade
    state.sustainability = clamp(state.sustainability - 2, 0, 100);
    addLog("Ciclo do solo: O desgaste natural reduziu a sustentabilidade em 2%.", "system-msg");
    updateUI();
}

let gameTickInterval = setInterval(gameTick, 4000);

// ==========================================
// ACESSIBILIDADE E RECURSOS EXTRAS
// ==========================================

// Controle de Alto Contraste
elements.btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    const hasContrast = document.body.classList.contains('high-contrast');
    addLog(`Alto contraste ${hasContrast ? 'Ativado' : 'Desativado'}.`, "system-msg");
});

// Aumentar Fonte
elements.btnFontPlus.addEventListener('click', () => {
    if (state.fontSizeStep < 4) {
        state.fontSizeStep += 2;
        document.documentElement.style.setProperty('--font-step', `${state.fontSizeStep}px`);
    }
});

// Diminuir Fonte
elements.btnFontMinus.addEventListener('click', () => {
    if (state.fontSizeStep > -4) {
        state.fontSizeStep -= 2;
        document.documentElement.style.setProperty('--font-step', `${state.fontSizeStep}px`);
    }
});

// ==========================================
// CAPTURA DE EVENTOS (TECLADO & MOUSE)
// ==========================================

// Cliques nos Botões de Ação
elements.btnHarvest.addEventListener('click', harvestCrop);
elements.btnBio.addEventListener('click', applyBioinputs);
elements.btnReforest.addEventListener('click', reforest);
elements.btnTech.addEventListener('click', installDrip);
elements.btnChemical.addEventListener('click', applyChemical);
elements.btnRestart.addEventListener('click', restartGame);

// Evento de Teclado (Acessibilidade e Usabilidade Dinâmica)
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    
    // Previne comportamento padrão de teclas quando o foco não está em inputs
    if (["H", "B", "R", "T", "Q"].includes(key)) {
        event.preventDefault();
    }

    switch(key) {
        case 'H':
            harvestCrop();
            break;
        case 'B':
            applyBioinputs();
            break;
        case 'R':
            reforest();
            break;
        case 'T':
            installDrip();
            break;
        case 'Q':
            applyChemical();
            break;
        default:
            break;
    }
});

// Inicialização da interface
updateUI();
