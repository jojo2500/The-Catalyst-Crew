/* ============================================
   ScentMatch Pro - Complete JavaScript
   L'Oréal Brandstorm 2024
   ============================================ */

// ============ APP STATE ============
const APP = {
    currentPage: 'home',
    theme: 'light',
    quizIndex: 0,
    quizAnswers: {},
    savedBlends: [],
    history: [],
    currentMix: {
        floral: 0,
        citrus: 0,
        woody: 0,
        oriental: 0,
        fresh: 0,
        spicy: 0
    },
    vizMode: 'waves',
    vizActive: false,
    vizAudio: false,
    currentVisualizedScent: null,
    audioCtx: null,
    speechRate: 1,
    autoAudio: false,
    quizResults: null,
    vizCanvas: null,
    vizCtx: null,
    animationId: null
};

// ============ NOTE DEFINITIONS ============
const NOTES = {
    floral: {
        name: 'Floral',
        emoji: '🌸',
        ingredients: ['Rose', 'Jasmine', 'Lily', 'Peony', 'Iris'],
        colors: ['#FF6B9D', '#C850C0', '#FFB6C1', '#FF69B4'],
        gradient: 'linear-gradient(135deg, #FF6B9D, #C850C0)',
        description: 'Soft, romantic, and elegant like a blooming garden',
        tactile: 'Smooth as silk petals, gentle and warm on the skin',
        emotional: 'Evokes love, romance, femininity, and tenderness',
        memory: 'Walking through a sunlit rose garden in spring'
    },
    citrus: {
        name: 'Citrus',
        emoji: '🍋',
        ingredients: ['Lemon', 'Bergamot', 'Orange', 'Grapefruit', 'Lime'],
        colors: ['#F9D423', '#FF4E50', '#FFD700', '#FFA500'],
        gradient: 'linear-gradient(135deg, #F9D423, #FF4E50)',
        description: 'Bright, zesty, and uplifting like sunshine in a bottle',
        tactile: 'Tingling and electric, like tiny sparks of energy on skin',
        emotional: 'Brings joy, energy, optimism, and a burst of happiness',
        memory: 'Squeezing fresh oranges on a warm summer morning'
    },
    woody: {
        name: 'Woody',
        emoji: '🪵',
        ingredients: ['Sandalwood', 'Cedar', 'Vetiver', 'Patchouli', 'Oak'],
        colors: ['#8B6914', '#D4A574', '#654321', '#A0522D'],
        gradient: 'linear-gradient(135deg, #8B6914, #D4A574)',
        description: 'Grounding, sophisticated, like a forest after rain',
        tactile: 'Warm bark texture, rough yet comforting and substantial',
        emotional: 'Creates stability, confidence, maturity, and depth',
        memory: 'Walking through an ancient forest on a crisp autumn day'
    },
    oriental: {
        name: 'Oriental',
        emoji: '🔥',
        ingredients: ['Amber', 'Vanilla', 'Oud', 'Benzoin', 'Myrrh'],
        colors: ['#6B1D5E', '#E94560', '#8B0000', '#FF1493'],
        gradient: 'linear-gradient(135deg, #6B1D5E, #E94560)',
        description: 'Rich, opulent, and mysterious like an exotic bazaar',
        tactile: 'Velvety warmth that wraps around you like cashmere',
        emotional: 'Evokes mystery, sensuality, luxury, and allure',
        memory: 'An exotic market filled with spices and glowing lanterns'
    },
    fresh: {
        name: 'Fresh',
        emoji: '💧',
        ingredients: ['Mint', 'Green Tea', 'Cucumber', 'Bamboo', 'Aloe'],
        colors: ['#11998e', '#38ef7d', '#00CED1', '#20B2AA'],
        gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
        description: 'Clean, invigorating, like a cool mountain stream',
        tactile: 'Cool water droplets on skin, crisp and refreshing',
        emotional: 'Brings clarity, peace, renewal, and fresh starts',
        memory: 'Standing by a waterfall surrounded by green nature'
    },
    spicy: {
        name: 'Spicy',
        emoji: '🌶️',
        ingredients: ['Pepper', 'Cinnamon', 'Cardamom', 'Ginger', 'Clove'],
        colors: ['#FF416C', '#FF4B2B', '#DC143C', '#B22222'],
        gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
        description: 'Bold, daring, and electrifying with warm heat',
        tactile: 'Warm tingling sensation, like gentle heat radiating',
        emotional: 'Ignites passion, courage, excitement, and boldness',
        memory: 'A cozy kitchen filled with holiday baking aromas'
    }
};

// ============ FRAGRANCE LIBRARY ============
const LIBRARY = [
    {
        name: 'Midnight Rose',
        family: 'floral',
        mix: { floral: 45, oriental: 25, woody: 15, spicy: 10, citrus: 5, fresh: 0 },
        description: 'A deep romantic bouquet with mysterious undertones',
        visual: 'Deep crimson waves flowing with gold sparkles',
        tactile: 'Like touching velvet in candlelight, warm and smooth',
        emotional: 'Deep love, mystery, midnight romance',
        memory: 'A moonlit garden with roses in full bloom'
    },
    {
        name: 'Ocean Breeze',
        family: 'fresh',
        mix: { fresh: 40, citrus: 30, woody: 15, floral: 10, spicy: 5, oriental: 0 },
        description: 'Crisp and clean like a morning by the sea',
        visual: 'Turquoise waves with white foam particles',
        tactile: 'Cool sea spray on warm skin, invigorating',
        emotional: 'Freedom, clarity, infinite possibilities',
        memory: 'Walking barefoot on a pristine beach at dawn'
    },
    {
        name: 'Royal Oud',
        family: 'oriental',
        mix: { oriental: 40, woody: 30, spicy: 15, floral: 10, fresh: 5, citrus: 0 },
        description: 'Majestic and powerful with deep warmth',
        visual: 'Dark purple nebula with golden lightning',
        tactile: 'Rich velvet and warm amber stones',
        emotional: 'Power, luxury, ancient wisdom',
        memory: 'A grand palace with incense burning at dusk'
    },
    {
        name: 'Citrus Garden',
        family: 'fresh',
        mix: { citrus: 40, fresh: 25, floral: 20, woody: 10, spicy: 5, oriental: 0 },
        description: 'Bright and cheerful like a Mediterranean morning',
        visual: 'Golden sunbursts with green leaf patterns',
        tactile: 'Sparkling and electric, like morning dew',
        emotional: 'Joy, optimism, summer happiness',
        memory: 'A lemon grove overlooking the Mediterranean sea'
    },
    {
        name: 'Dark Forest',
        family: 'woody',
        mix: { woody: 45, fresh: 20, oriental: 15, spicy: 10, floral: 5, citrus: 5 },
        description: 'Deep and grounding like an ancient woodland',
        visual: 'Deep green waves with earthy brown particles',
        tactile: 'Cool bark and damp earth, grounding and solid',
        emotional: 'Wisdom, strength, inner peace',
        memory: 'Walking through a misty ancient forest at dawn'
    },
    {
        name: 'Spice Market',
        family: 'oriental',
        mix: { spicy: 35, oriental: 25, woody: 20, citrus: 10, floral: 5, fresh: 5 },
        description: 'Vibrant and warm like an exotic bazaar',
        visual: 'Warm orange and red swirls with golden dust',
        tactile: 'Warm spice powder between fingers, tingling',
        emotional: 'Adventure, excitement, cultural richness',
        memory: 'Exploring a vibrant Moroccan spice market'
    },
    {
        name: 'Spring Bloom',
        family: 'floral',
        mix: { floral: 35, fresh: 25, citrus: 20, woody: 10, oriental: 5, spicy: 5 },
        description: 'Light and airy like the first days of spring',
        visual: 'Pastel pink and green floating petals',
        tactile: 'Soft breeze carrying flower petals across skin',
        emotional: 'Hope, new beginnings, gentle happiness',
        memory: 'A cherry blossom garden in gentle spring rain'
    },
    {
        name: 'Velvet Night',
        family: 'oriental',
        mix: { oriental: 35, spicy: 25, woody: 20, floral: 10, citrus: 5, fresh: 5 },
        description: 'Seductive and dark like a starlit evening',
        visual: 'Deep indigo with silver star particles',
        tactile: 'Soft velvet and warm skin by firelight',
        emotional: 'Seduction, confidence, mysterious allure',
        memory: 'A glamorous evening under a canopy of stars'
    }
];

// ============ QUIZ QUESTIONS ============
const QUIZ = [
    {
        category: 'Personality',
        question: 'Which word best describes you?',
        options: [
            { text: '🌹 Romantic & Gentle', traits: { floral: 3, oriental: 1 } },
            { text: '⚡ Bold & Adventurous', traits: { spicy: 3, citrus: 1 } },
            { text: '🌊 Calm & Peaceful', traits: { fresh: 3, woody: 1 } },
            { text: '✨ Mysterious & Elegant', traits: { oriental: 3, woody: 1 } }
        ]
    },
    {
        category: 'Lifestyle',
        question: 'Your ideal weekend activity?',
        options: [
            { text: '🏔️ Hiking in nature', traits: { woody: 3, fresh: 2 } },
            { text: '🎨 Art gallery or museum', traits: { floral: 2, oriental: 2 } },
            { text: '🏖️ Beach day', traits: { citrus: 3, fresh: 2 } },
            { text: '🍷 Dinner at a fancy restaurant', traits: { oriental: 2, spicy: 2 } }
        ]
    },
    {
        category: 'Season',
        question: 'Which season speaks to your soul?',
        options: [
            { text: '🌸 Spring – Fresh & blooming', traits: { floral: 3, fresh: 2 } },
            { text: '☀️ Summer – Bright & warm', traits: { citrus: 3, fresh: 1 } },
            { text: '🍂 Autumn – Cozy & rich', traits: { woody: 2, spicy: 2, oriental: 1 } },
            { text: '❄️ Winter – Cool & elegant', traits: { oriental: 2, woody: 2 } }
        ]
    },
    {
        category: 'Mood',
        question: 'How do you want to feel today?',
        options: [
            { text: '💪 Confident & powerful', traits: { woody: 2, spicy: 2 } },
            { text: '😌 Relaxed & at peace', traits: { fresh: 3, floral: 1 } },
            { text: '🔥 Passionate & alive', traits: { oriental: 2, spicy: 2 } },
            { text: '😊 Happy & playful', traits: { citrus: 3, floral: 1 } }
        ]
    },
    {
        category: 'Style',
        question: 'Pick your fashion vibe:',
        options: [
            { text: '👗 Classic & timeless', traits: { floral: 2, woody: 2 } },
            { text: '🧥 Streetwear & edgy', traits: { spicy: 2, citrus: 2 } },
            { text: '👘 Bohemian & free', traits: { fresh: 2, floral: 2 } },
            { text: '🤵 Luxury & high-end', traits: { oriental: 3, woody: 1 } }
        ]
    },
    {
        category: 'Color',
        question: 'Which color palette draws you in?',
        options: [
            { text: '💜 Deep purples & golds', traits: { oriental: 3, spicy: 1 } },
            { text: '💚 Greens & teals', traits: { fresh: 3, woody: 1 } },
            { text: '💗 Pinks & corals', traits: { floral: 3, citrus: 1 } },
            { text: '🧡 Oranges & reds', traits: { citrus: 2, spicy: 2 } }
        ]
    },
    {
        category: 'Texture',
        question: 'Which texture feels most "you"?',
        options: [
            { text: '🧶 Soft cashmere', traits: { oriental: 2, floral: 2 } },
            { text: '🪨 Cool marble', traits: { fresh: 2, woody: 2 } },
            { text: '🌿 Fresh linen', traits: { fresh: 3, citrus: 1 } },
            { text: '🔥 Warm leather', traits: { woody: 2, spicy: 2 } }
        ]
    },
    {
        category: 'Travel',
        question: 'Dream vacation destination?',
        options: [
            { text: '🗼 Paris, France', traits: { floral: 3, oriental: 1 } },
            { text: '🏝️ Bali, Indonesia', traits: { fresh: 2, citrus: 2 } },
            { text: '🕌 Marrakech, Morocco', traits: { spicy: 2, oriental: 2 } },
            { text: '🌲 Swiss Alps', traits: { woody: 3, fresh: 1 } }
        ]
    },
    {
        category: 'Music',
        question: 'What music sets your mood?',
        options: [
            { text: '🎵 Classical / Jazz', traits: { floral: 2, woody: 2 } },
            { text: '🎸 Rock / Alternative', traits: { spicy: 3, woody: 1 } },
            { text: '🎧 Electronic / Dance', traits: { citrus: 2, fresh: 2 } },
            { text: '🎤 R&B / Soul', traits: { oriental: 3, floral: 1 } }
        ]
    },
    {
        category: 'Time',
        question: 'When do you feel most yourself?',
        options: [
            { text: '🌅 Early morning', traits: { fresh: 3, citrus: 1 } },
            { text: '☀️ Sunny afternoon', traits: { citrus: 2, floral: 2 } },
            { text: '🌆 Golden hour / sunset', traits: { woody: 2, oriental: 1, floral: 1 } },
            { text: '🌙 Late night', traits: { oriental: 3, spicy: 1 } }
        ]
    },
    {
        category: 'Element',
        question: 'Which element resonates with you?',
        options: [
            { text: '🔥 Fire – Passion & energy', traits: { spicy: 3, oriental: 1 } },
            { text: '💧 Water – Flow & calm', traits: { fresh: 3, citrus: 1 } },
            { text: '🌍 Earth – Grounded & stable', traits: { woody: 3, oriental: 1 } },
            { text: '🌬️ Air – Free & light', traits: { floral: 2, citrus: 2 } }
        ]
    },
    {
        category: 'Final',
        question: 'How do you want others to remember your scent?',
        options: [
            { text: '💋 Unforgettable & seductive', traits: { oriental: 3, spicy: 1 } },
            { text: '🌻 Warm & approachable', traits: { floral: 2, citrus: 2 } },
            { text: '🏔️ Strong & mysterious', traits: { woody: 2, oriental: 2 } },
            { text: '🌈 Fresh & unique', traits: { fresh: 2, citrus: 1, floral: 1 } }
        ]
    }
];

// ============ PRESETS ============
const PRESETS = {
    romantic: { floral: 40, oriental: 25, woody: 10, citrus: 10, fresh: 10, spicy: 5 },
    fresh: { fresh: 35, citrus: 30, floral: 15, woody: 10, spicy: 5, oriental: 5 },
    mysterious: { oriental: 35, woody: 25, spicy: 20, floral: 10, citrus: 5, fresh: 5 },
    energetic: { citrus: 35, fresh: 25, spicy: 20, floral: 10, woody: 5, oriental: 5 },
    cozy: { woody: 30, oriental: 25, spicy: 20, floral: 15, citrus: 5, fresh: 5 },
    elegant: { floral: 30, oriental: 25, woody: 20, citrus: 10, fresh: 10, spicy: 5 }
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    // Hide splash screen
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
    }, 2500);

    initApp();
});

function initApp() {
    initNavigation();
    initQuiz();
    initMixer();
    initVisualizer();
    initLibrary();
    initProfile();
    animateStats();
    loadSavedData();
    setupEventListeners();
}

// ============ NAVIGATION ============
function initNavigation() {
    // Desktop nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => goTo(btn.dataset.section));
    });

    // Mobile nav
    document.querySelectorAll('.mob-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => goTo(btn.dataset.section));
    });
}

function goTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show target page
    const target = document.getElementById(page);
    if (target) {
        target.classList.add('active');
        APP.currentPage = page;
    }

    // Update nav buttons
    document.querySelectorAll('.nav-btn, .mob-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === page);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page-specific actions
    if (page === 'visualizer' && APP.currentVisualizedScent) {
        startVisualization();
    }

    // Audio cue if enabled
    if (APP.autoAudio) {
        const pageNames = {
            home: 'Home page',
            quiz: 'Scent Quiz',
            mixer: 'Scent Creator',
            visualizer: 'Scent Visualizer',
            profile: 'Your Profile'
        };
        speak(`Navigated to ${pageNames[page] || page}`);
    }
}

// ============ THEME & ACCESSIBILITY ============
function toggleTheme() {
    APP.theme = APP.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', APP.theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = APP.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    showToast(`${APP.theme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode enabled`, 'info');
    saveToLocalStorage('theme', APP.theme);
}

function toggleAccessibility() {
    const panel = document.getElementById('a11y-panel');
    if (panel) {
        panel.classList.toggle('open');
    }
}

function applyA11y() {
    const hc = document.getElementById('highContrast')?.checked || false;
    const lt = document.getElementById('largeText')?.checked || false;
    const rm = document.getElementById('reduceMotion')?.checked || false;
    APP.autoAudio = document.getElementById('audioDesc')?.checked || false;

    document.body.classList.toggle('high-contrast', hc);
    document.body.classList.toggle('large-text', lt);
    document.body.classList.toggle('reduce-motion', rm);

    saveToLocalStorage('accessibility', { hc, lt, rm, autoAudio: APP.autoAudio });
}

function updateVoiceSpeed() {
    const slider = document.getElementById('voiceSpeed');
    if (slider) {
        APP.speechRate = parseFloat(slider.value);
        saveToLocalStorage('speechRate', APP.speechRate);
    }
}

function readPage() {
    const page = document.querySelector('.page.active');
    if (!page) return;
    
    const headings = page.querySelectorAll('h1, h2, h3');
    const text = Array.from(headings).map(h => h.textContent).join('. ');
    speak(text.substring(0, 500));
}

function speak(text) {
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported');
        return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = APP.speechRate || 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

// ============ STATS ANIMATION ============
function animateStats() {
    document.querySelectorAll('.hstat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString();
        }, 30);
    });
}

// ============ QUIZ FUNCTIONALITY ============
function initQuiz() {
    const totalEl = document.getElementById('qTotal');
    if (totalEl) {
        totalEl.textContent = QUIZ.length;
    }
    loadQuizQuestion(0);
}

function startEnhancedQuiz() {
    APP.quizIndex = 0;
    APP.quizAnswers = {};
    goTo('quiz');
    loadQuizQuestion(0);
    
    if (APP.autoAudio) {
        speak('Starting scent personality quiz. Answer the questions to discover your perfect fragrance match.');
    }
}

function loadQuizQuestion(index) {
    if (index >= QUIZ.length) {
        showQuizResults();
        return;
    }

    const q = QUIZ[index];
    APP.quizIndex = index;

    // Update UI elements
    const categoryEl = document.getElementById('qCategory');
    const numEl = document.getElementById('qNum');
    const titleEl = document.getElementById('qTitle');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (categoryEl) categoryEl.textContent = q.category;
    if (numEl) numEl.textContent = index + 1;
    if (titleEl) titleEl.textContent = q.question;

    // Update progress
    updateQuizProgress(index);

    // Load options
    const optContainer = document.getElementById('qOptions');
    if (optContainer) {
        optContainer.innerHTML = '';
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'q-option';
            div.textContent = opt.text;
            div.addEventListener('click', () => selectQuizOption(index, i, div));

            if (APP.quizAnswers[index] === i) {
                div.classList.add('selected');
            }
            optContainer.appendChild(div);
        });
    }

    // Update navigation
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) {
        nextBtn.disabled = APP.quizAnswers[index] === undefined;
        nextBtn.innerHTML = index === QUIZ.length - 1 ? 
            'See Results <i class="fas fa-check"></i>' : 
            'Next <i class="fas fa-arrow-right"></i>';
    }

    // Auto-read if enabled
    if (APP.autoAudio) {
        speak(`Question ${index + 1} of ${QUIZ.length}. ${q.question}`);
    }
}

function updateQuizProgress(index) {
    const pct = (index / QUIZ.length) * 100;
    const ringText = document.getElementById('ringText');
    const progressRing = document.getElementById('progressRing');
    
    if (ringText) {
        ringText.textContent = Math.round(pct) + '%';
    }
    
    if (progressRing) {
        const circumference = 326.73;
        const offset = circumference - (pct / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

function selectQuizOption(qIndex, optIndex, element) {
    // Deselect all options
    document.querySelectorAll('.q-option').forEach(o => o.classList.remove('selected'));
    
    // Select clicked option
    element.classList.add('selected');
    APP.quizAnswers[qIndex] = optIndex;

    // Enable next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = false;

    // Update analysis
    updateAnalysisTags();

    // Audio feedback
    if (APP.autoAudio) {
        speak(`Selected: ${element.textContent}`);
    }
}

function updateAnalysisTags() {
    const traits = calculateTraits();
    const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1]);
    const container = document.getElementById('analysisTags');

    if (container) {
        container.innerHTML = sorted
            .filter(([_, val]) => val > 0)
            .slice(0, 5)
            .map(([key, val]) => {
                const note = NOTES[key];
                return `<span class="atag">${note.emoji} ${note.name}: ${val} pts</span>`;
            }).join('');
    }
}

function calculateTraits() {
    const traits = { floral: 0, citrus: 0, woody: 0, oriental: 0, fresh: 0, spicy: 0 };
    
    Object.entries(APP.quizAnswers).forEach(([qIndex, optIndex]) => {
        const question = QUIZ[parseInt(qIndex)];
        const option = question?.options[optIndex];
        
        if (option?.traits) {
            Object.entries(option.traits).forEach(([trait, points]) => {
                if (traits.hasOwnProperty(trait)) {
                    traits[trait] += points;
                }
            });
        }
    });
    
    return traits;
}

function quizPrev() {
    if (APP.quizIndex > 0) {
        loadQuizQuestion(APP.quizIndex - 1);
    }
}

function quizNext() {
    if (APP.quizIndex < QUIZ.length - 1) {
        loadQuizQuestion(APP.quizIndex + 1);
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const traits = calculateTraits();
    const recommendations = generateRecommendations(traits);
    
    APP.quizResults = {
        traits,
        recommendations,
        completedAt: new Date().toISOString()
    };
    
    displayQuizResults(APP.quizResults);
    updateProfileWithResults(APP.quizResults);
    
    // Save to history
    APP.history.push({
        type: 'quiz',
        date: new Date().toISOString(),
        results: APP.quizResults
    });
    
    saveAppState();
}

function generateRecommendations(traits) {
    // Find top 3 traits
    const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1]);
    const topTraits = sorted.slice(0, 3);
    
    // Find matching fragrances
    const matches = LIBRARY
        .map(fragrance => {
            let score = 0;
            Object.entries(fragrance.mix).forEach(([note, percentage]) => {
                const traitScore = traits[note] || 0;
                score += (percentage / 100) * traitScore;
            });
            return { ...fragrance, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    return {
        topTraits,
        matches,
        dominantFamily: sorted[0][0]
    };
}

function displayQuizResults(results) {
    const modal = document.getElementById('resultsModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const topMatch = results.recommendations.matches[0];
    
    modalBody.innerHTML = `
        <div class="results-content">
            <div class="results-header">
                <h2>🎉 Your Scent DNA Revealed!</h2>
                <p>Based on your personality, here's your perfect fragrance match</p>
            </div>
            
            <div class="top-match">
                <div class="match-visual">
                    <div class="scent-preview" style="background: ${createScentGradient(topMatch.mix)}"></div>
                </div>
                <div class="match-info">
                    <h3>${topMatch.name}</h3>
                    <p class="match-family">${topMatch.family.charAt(0).toUpperCase() + topMatch.family.slice(1)} Family</p>
                    <p class="match-description">${topMatch.description}</p>
                </div>
            </div>
            
            <div class="trait-breakdown">
                <h4>Your Scent Personality</h4>
                <div class="traits-grid">
                    ${results.recommendations.topTraits.map(([trait, score]) => {
                        const note = NOTES[trait];
                        const percentage = Math.round((score / Math.max(...Object.values(results.traits))) * 100);
                        return `
                            <div class="trait-item">
                                <div class="trait-header">
                                    <span class="trait-emoji">${note.emoji}</span>
                                    <span class="trait-name">${note.name}</span>
                                    <span class="trait-score">${percentage}%</span>
                                </div>
                                <div class="trait-bar">
                                    <div class="trait-fill" style="width: ${percentage}%; background: ${note.gradient}"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="other-matches">
                <h4>You might also love:</h4>
                <div class="matches-grid">
                    ${results.recommendations.matches.slice(1).map(match => `
                        <div class="match-card" onclick="applyMixFromLibrary('${match.name}')">
                            <div class="mini-preview" style="background: ${createScentGradient(match.mix)}"></div>
                            <h5>${match.name}</h5>
                            <p>${match.family}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="results-actions">
                <button class="btn-primary" onclick="applyMixFromLibrary('${topMatch.name}'); closeModal();">
                    <i class="fas fa-sliders-h"></i> Create This Blend
                </button>
                <button class="btn-secondary" onclick="visualizeScent('${topMatch.name}'); closeModal();">
                    <i class="fas fa-eye"></i> Visualize Scent
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    if (APP.autoAudio) {
        speak(`Your perfect scent match is ${topMatch.name}, a ${topMatch.family} fragrance. ${topMatch.description}`);
    }
}

// ============ MIXER FUNCTIONALITY ============
function initMixer() {
    // Initialize sliders
    Object.keys(NOTES).forEach(note => {
        const slider = document.getElementById(`${note}Slider`);
        if (slider) {
            slider.addEventListener('input', updateMix);
            // Set custom slider colors
            updateSliderStyle(slider, NOTES[note].gradient);
        }
    });
    
    updateMix(); // Initial update
}

function updateSliderStyle(slider, gradient) {
    const value = slider.value;
    slider.style.background = `linear-gradient(to right, ${gradient} 0%, ${gradient} ${value}%, var(--bg3) ${value}%, var(--bg3) 100%)`;
}

function updateMix() {
    let total = 0;
    
    // Update current mix and UI
    Object.keys(NOTES).forEach(note => {
        const slider = document.getElementById(`${note}Slider`);
        const percent = document.getElementById(`${note}Percent`);
        const dropsCount = document.getElementById(`${note}Drops`);
        const dropsVis = document.getElementById(`${note}DropsVis`);
        
        if (slider) {
            const value = parseInt(slider.value);
            APP.currentMix[note] = value;
            total += value;
            
            // Update displays
            if (percent) percent.textContent = value + '%';
            
            // Update drops (1 drop per 5%)
            const drops = Math.floor(value / 5);
            if (dropsCount) dropsCount.textContent = drops;
            
            // Update drops visual
            if (dropsVis) {
                dropsVis.innerHTML = '';
                for (let i = 0; i < Math.min(drops, 20); i++) {
                    const drop = document.createElement('div');
                    drop.className = 'drop';
                    drop.style.background = NOTES[note].colors[0];
                    dropsVis.appendChild(drop);
                }
            }
            
            // Update slider style
            updateSliderStyle(slider, NOTES[note].gradient);
        }
    });
    
    // Update total bar
    updateTotalBar(total);
    
    // Update bottle visualization
    updateBottleVisualization();
    
    // Update blend description
    updateBlendDescription();
    
    // Update canvas visualization
    updateCanvasVisualization();
}

function updateTotalBar(total) {
    const totalPercent = document.getElementById('totalPercent');
    const totalFill = document.getElementById('totalFill');
    const totalWarning = document.getElementById('totalWarning');
    
    if (totalPercent) totalPercent.textContent = total + '%';
    
    if (totalFill) {
        totalFill.style.width = Math.min(total, 100) + '%';
        
        // Change color based on total
        if (total > 100) {
            totalFill.style.background = 'var(--error-color, #EF4444)';
        } else if (total > 80) {
            totalFill.style.background = 'var(--warning-color, #F59E0B)';
        } else {
            totalFill.style.background = 'var(--grad1)';
        }
    }
    
    if (totalWarning) {
        if (total > 100) {
            totalWarning.textContent = `⚠️ Over limit by ${total - 100}%`;
            totalWarning.classList.add('active');
        } else if (total === 0) {
            totalWarning.textContent = 'Select notes to create your blend';
            totalWarning.classList.add('active');
        } else {
            totalWarning.classList.remove('active');
        }
    }
}

function updateBottleVisualization() {
    const liquid = document.getElementById('liquidFill');
    const aura = document.getElementById('scentAura');
    
    if (!liquid) return;
    
    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    const height = Math.min(total, 100);
    
    liquid.style.height = height + '%';
    
    // Update layers
    let currentHeight = 0;
    Object.entries(APP.currentMix).forEach(([note, percentage], index) => {
        const layer = document.getElementById(`layer${index + 1}`);
        if (layer && percentage > 0) {
            const layerHeight = (percentage / total) * 100;
            layer.style.height = layerHeight + '%';
            layer.style.bottom = currentHeight + '%';
            layer.style.background = NOTES[note].gradient;
            layer.style.opacity = '0.8';
            currentHeight += layerHeight;
        } else if (layer) {
            layer.style.opacity = '0';
        }
    });
    
    // Update aura
    if (aura && total > 0) {
        aura.classList.add('active');
        aura.style.background = createScentGradient(APP.currentMix);
    } else if (aura) {
        aura.classList.remove('active');
    }
}

function updateBlendDescription() {
    const title = document.getElementById('blendTitle');
    const description = document.getElementById('blendDescription');
    
    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    
    if (total === 0) {
        if (title) title.textContent = 'Your Custom Blend';
        if (description) description.textContent = 'Adjust the sliders to create your signature scent';
        return;
    }
    
    // Find dominant notes
    const dominant = Object.entries(APP.currentMix)
        .filter(([_, val]) => val > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);
    
    if (dominant.length === 0) return;
    
    const [primaryNote] = dominant[0];
    const [secondaryNote] = dominant[1] || [null];
    
    let name = `${NOTES[primaryNote].name}`;
    if (secondaryNote && APP.currentMix[secondaryNote] >= 15) {
        name += ` & ${NOTES[secondaryNote].name}`;
    }
    name += ' Blend';
    
    let desc = `A custom ${total}% blend featuring ${NOTES[primaryNote].description.toLowerCase()}`;
    if (secondaryNote) {
        desc += ` with hints of ${NOTES[secondaryNote].description.toLowerCase()}`;
    }
    
    if (title) title.textContent = name;
    if (description) description.textContent = desc;
}

function updateCanvasVisualization() {
    const canvas = document.getElementById('vizCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    if (total === 0) return;
    
    // Create animated visualization
    const time = Date.now() * 0.001;
    
    Object.entries(APP.currentMix).forEach(([note, percentage], index) => {
        if (percentage === 0) return;
        
        const colors = NOTES[note].colors;
        const intensity = percentage / 100;
        const noteIndex = Object.keys(NOTES).indexOf(note);
        
        // Create flowing effect
        for (let i = 0; i < 20; i++) {
            const x = (width / 20) * i + Math.sin(time + noteIndex + i * 0.5) * 30;
            const y = height - (height * intensity * 0.8) + Math.cos(time * 0.8 + i * 0.3) * 20;
            const size = 5 + intensity * 15 + Math.sin(time + i) * 3;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, colors[0] + '80');
            gradient.addColorStop(1, colors[0] + '00');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function createScentGradient(mix) {
    const activeNotes = Object.entries(mix)
        .filter(([_, val]) => val > 0)
        .sort((a, b) => b[1] - a[1]);
    
    if (activeNotes.length === 0) return 'transparent';
    
    const colors = activeNotes.slice(0, 3).map(([note]) => NOTES[note].colors[0]);
    return `linear-gradient(135deg, ${colors.join(', ')})`;
}

function applyPreset(presetName) {
    const preset = PRESETS[presetName];
    if (!preset) return;
    
    // Apply preset values to sliders
    Object.entries(preset).forEach(([note, value]) => {
        const slider = document.getElementById(`${note}Slider`);
        if (slider) {
            slider.value = value;
        }
    });
    
    updateMix();
    showToast(`Applied ${presetName} preset! 🎨`, 'success');
    
    if (APP.autoAudio) {
        speak(`Applied ${presetName} preset to your blend`);
    }
}

function resetMix() {
    Object.keys(NOTES).forEach(note => {
        const slider = document.getElementById(`${note}Slider`);
        if (slider) {
            slider.value = 0;
        }
    });
    
    APP.currentMix = { floral: 0, citrus: 0, woody: 0, oriental: 0, fresh: 0, spicy: 0 };
    updateMix();
    showToast('Mix reset! 🔄', 'info');
}

function saveMix() {
    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        showToast('Create a blend first! 💡', 'warning');
        return;
    }
    
    const blend = {
        id: Date.now(),
        name: document.getElementById('blendTitle')?.textContent || 'Custom Blend',
        mix: { ...APP.currentMix },
        createdAt: new Date().toISOString(),
        totalPercentage: total
    };
    
    APP.savedBlends.push(blend);
    saveAppState();
    updateProfileStats();
    
    showToast('Blend saved! 💾', 'success');
    
    if (APP.autoAudio) {
        speak('Your custom blend has been saved to your profile');
    }
}

function shareMix() {
    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        showToast('Create a blend first! 💡', 'warning');
        return;
    }
    
    const blendName = document.getElementById('blendTitle')?.textContent || 'My Custom Blend';
    const activeNotes = Object.entries(APP.currentMix)
        .filter(([_, val]) => val > 0)
        .map(([note, val]) => `${NOTES[note].name}: ${val}%`)
        .join(', ');
    
    const shareText = `Check out my custom fragrance blend: ${blendName}\n\nFormula: ${activeNotes}\n\nCreated with ScentMatch by L'Oréal #ScentMatch #Fragrance`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Custom Fragrance',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('Blend copied to clipboard! 📋', 'success');
        });
    }
}

function mixAndVisualize() {
    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        showToast('Create a blend first! 💡', 'warning');
        return;
    }
    
    // Create custom scent for visualization
    const customScent = {
        name: document.getElementById('blendTitle')?.textContent || 'Your Custom Blend',
        mix: { ...APP.currentMix },
        description: document.getElementById('blendDescription')?.textContent || 'Your custom creation',
        visual: 'Custom blend visualization with flowing colors',
        tactile: 'A unique texture that represents your personal style',
        emotional: 'The emotional signature of your personality',
        memory: 'A scent memory that will be uniquely yours'
    };
    
    APP.currentVisualizedScent = customScent;
    goTo('visualizer');
    startVisualization();
}

// ============ VISUALIZER FUNCTIONALITY ============
function initVisualizer() {
    const canvas = document.getElementById('mainVizCanvas');
    if (canvas) {
        APP.vizCanvas = canvas;
        APP.vizCtx = canvas.getContext('2d');
        
        // Set up canvas size
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = Math.min(rect.height, 600);
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    }
}

function startVisualization() {
    if (!APP.currentVisualizedScent || !APP.vizCanvas) return;
    
    // Hide overlay
    const overlay = document.getElementById('vizOverlay');
    if (overlay) overlay.classList.add('hidden');
    
    // Update description
    updateVisualizationDescription(APP.currentVisualizedScent);
    
    // Start animation
    APP.vizActive = true;
    if (APP.animationId) {
        cancelAnimationFrame(APP.animationId);
    }
    animate();
}

function stopVisualization() {
    APP.vizActive = false;
    if (APP.animationId) {
        cancelAnimationFrame(APP.animationId);
        APP.animationId = null;
    }
    
    // Show overlay
    const overlay = document.getElementById('vizOverlay');
    if (overlay) overlay.classList.remove('hidden');
}

function animate() {
    if (!APP.vizActive || !APP.vizCtx) return;
    
    const ctx = APP.vizCtx;
    const canvas = APP.vizCanvas;
    const width = canvas.width;
    const height = canvas.height;
    const time = Date.now() * 0.001;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Create background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0a0a0a');
    bgGradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    if (APP.currentVisualizedScent?.mix) {
        renderVisualizationMode(ctx, width, height, time, APP.currentVisualizedScent.mix);
    }
    
    APP.animationId = requestAnimationFrame(animate);
}

function renderVisualizationMode(ctx, width, height, time, mix) {
    switch (APP.vizMode) {
        case 'waves':
            renderWaves(ctx, width, height, time, mix);
            break;
        case 'particles':
            renderParticles(ctx, width, height, time, mix);
            break;
        case 'aurora':
            renderAurora(ctx, width, height, time, mix);
            break;
        case 'nebula':
            renderNebula(ctx, width, height, time, mix);
            break;
        default:
            renderWaves(ctx, width, height, time, mix);
    }
}

function renderWaves(ctx, width, height, time, mix) {
    Object.entries(mix).forEach(([note, percentage], index) => {
        if (percentage === 0) return;
        
        const colors = NOTES[note].colors;
        const intensity = percentage / 100;
        const noteIndex = Object.keys(NOTES).indexOf(note);
        
        // Create wave layers
        for (let layer = 0; layer < 3; layer++) {
            ctx.beginPath();
            
            for (let x = 0; x <= width; x += 2) {
                const wave1 = Math.sin(x * 0.01 + time * 2 + noteIndex + layer * 0.5) * 50 * intensity;
                const wave2 = Math.sin(x * 0.005 + time * 1.5 + noteIndex) * 30 * intensity;
                const y = height * 0.5 + wave1 + wave2 + (layer - 1) * 20;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.strokeStyle = colors[layer % colors.length] + Math.floor(intensity * 255 * 0.6).toString(16).padStart(2, '0');
            ctx.lineWidth = 2 + intensity * 3;
            ctx.stroke();
        }
    });
}

function renderParticles(ctx, width, height, time, mix) {
    Object.entries(mix).forEach(([note, percentage], noteIndex) => {
        if (percentage === 0) return;
        
        const colors = NOTES[note].colors;
        const intensity = percentage / 100;
        const particleCount = Math.floor(intensity * 50);
        
        for (let i = 0; i < particleCount; i++) {
            const x = width * 0.5 + Math.sin(time + noteIndex + i * 0.1) * 200 * intensity;
            const y = height * 0.5 + Math.cos(time * 0.8 + noteIndex + i * 0.1) * 150 * intensity;
            const size = 2 + intensity * 8 + Math.sin(time * 2 + i) * 2;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, colors[i % colors.length] + 'CC');
            gradient.addColorStop(1, colors[i % colors.length] + '00');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function renderAurora(ctx, width, height, time, mix) {
    Object.entries(mix).forEach(([note, percentage], noteIndex) => {
        if (percentage === 0) return;
        
        const colors = NOTES[note].colors;
        const intensity = percentage / 100;
        
        for (let i = 0; i < 5; i++) {
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, colors[0] + '00');
            gradient.addColorStop(0.5, colors[i % colors.length] + Math.floor(intensity * 255 * 0.3).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, colors[1] + '00');
            
            ctx.fillStyle = gradient;
            
            ctx.beginPath();
            for (let x = 0; x <= width; x += 10) {
                const wave = Math.sin(x * 0.02 + time + noteIndex + i) * 100 * intensity;
                const y = height * (0.3 + i * 0.1) + wave;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
        }
    });
}

function renderNebula(ctx, width, height, time, mix) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    
    Object.entries(mix).forEach(([note, percentage], noteIndex) => {
        if (percentage === 0) return;
        
        const colors = NOTES[note].colors;
        const intensity = percentage / 100;
        const radius = 50 + intensity * 150;
        
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX + Math.sin(time + noteIndex) * 50,
            centerY + Math.cos(time + noteIndex) * 50,
            radius
        );
        
        gradient.addColorStop(0, colors[0] + Math.floor(intensity * 255 * 0.8).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, colors[1] + Math.floor(intensity * 255 * 0.4).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, colors[2] + '00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
            centerX + Math.sin(time * 0.5 + noteIndex) * 30,
            centerY + Math.cos(time * 0.5 + noteIndex) * 30,
            radius,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
}

function updateVisualizationDescription(scent) {
    const elements = {
        vizScentName: scent.name || 'Unknown Scent',
        vizVisualDesc: scent.visual || 'Beautiful flowing colors',
        vizTactileDesc: scent.tactile || 'Smooth and pleasant texture',
        vizEmotionalDesc: scent.emotional || 'Evokes positive emotions',
        vizMemoryDesc: scent.memory || 'Creates lasting memories'
    };
    
    Object.entries(elements).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });
}

function setVizMode(mode) {
    APP.vizMode = mode;
    
    // Update active button
    document.querySelectorAll('.vbtn[data-mode]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    showToast(`Switched to ${mode} mode! 🎨`, 'info');
}

function toggleVizAudio() {
    APP.vizAudio = !APP.vizAudio;
    const icon = document.getElementById('vizAudioIcon');
    
    if (icon) {
        icon.className = APP.vizAudio ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
    
    showToast(`Audio ${APP.vizAudio ? 'enabled' : 'disabled'}! 🔊`, 'info');
}

function captureViz() {
    if (!APP.vizCanvas) return;
    
    const link = document.createElement('a');
    link.download = `scent-visualization-${Date.now()}.png`;
    link.href = APP.vizCanvas.toDataURL();
    link.click();
    
    showToast('Visualization captured! 📸', 'success');
}

function speakDescription() {
    const scent = APP.currentVisualizedScent;
    if (!scent) return;
    
    const description = `${scent.name}. Visual: ${scent.visual}. Tactile: ${scent.tactile}. Emotional: ${scent.emotional}. Memory: ${scent.memory}`;
    speak(description);
}

// ============ LIBRARY FUNCTIONALITY ============
function initLibrary() {
    loadLibraryGrid();
    setupLibraryFilters();
}

function loadLibraryGrid() {
    const grid = document.getElementById('libGrid');
    if (!grid) return;
    
    grid.innerHTML = LIBRARY.map(fragrance => `
        <div class="lib-item" onclick="visualizeScent('${fragrance.name}')" data-family="${fragrance.family}">
            <div class="lib-preview" style="background: ${createScentGradient(fragrance.mix)}; height: 60px; border-radius: 8px; margin-bottom: 0.75rem;"></div>
            <h4>${fragrance.name}</h4>
            <span class="family">${fragrance.family}</span>
            <p>${fragrance.description}</p>
        </div>
    `).join('');
}

function setupLibraryFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter || btn.textContent.toLowerCase();
            filterLibrary(filter);
        });
    });
}

function filterLibrary(family) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnFilter = btn.dataset.filter || btn.textContent.toLowerCase();
        btn.classList.toggle('active', btnFilter === family);
    });
    
    // Filter items
    document.querySelectorAll('.lib-item').forEach(item => {
        const itemFamily = item.dataset.family;
        const show = family === 'all' || itemFamily === family;
        item.style.display = show ? 'block' : 'none';
    });
}

function visualizeScent(scentName) {
    const scent = LIBRARY.find(s => s.name === scentName);
    if (!scent) return;
    
    APP.currentVisualizedScent = scent;
    goTo('visualizer');
    startVisualization();
    
    if (APP.autoAudio) {
        speak(`Now visualizing ${scentName}, ${scent.description}`);
    }
}

function applyMixFromLibrary(scentName) {
    const scent = LIBRARY.find(s => s.name === scentName);
    if (!scent) return;
    
    // Apply the scent's mix to the mixer
    Object.entries(scent.mix).forEach(([note, value]) => {
        const slider = document.getElementById(`${note}Slider`);
        if (slider) {
            slider.value = value;
        }
    });
    
    APP.currentMix = { ...scent.mix };
    updateMix();
    goTo('mixer');
    
    showToast(`Applied ${scentName} formula! 🧪`, 'success');
    
    if (APP.autoAudio) {
        speak(`Applied ${scentName} formula to the scent mixer`);
    }
}

// ============ PROFILE FUNCTIONALITY ============
function initProfile() {
    updateProfileStats();
}

function updateProfileWithResults(results) {
    const profileDNA = document.getElementById('profileDNA');
    if (!profileDNA || !results?.recommendations) return;

    const topMatch = results.recommendations.matches?.[0];
    const dominantKey = results.recommendations.dominantFamily;
    const dominant = NOTES[dominantKey] || NOTES.floral;
    const topScore = Math.max(...Object.values(results.traits || {}), 1);

    profileDNA.innerHTML = `
        <div class="dna-results">
            <div class="dna-visualization">
                <div class="dna-helix">
                    ${results.recommendations.topTraits.map(([trait, score], index) => {
                        const note = NOTES[trait];
                        const size = Math.max(20, (score / topScore) * 100);
                        return `
                            <div class="dna-strand" style="
                                width: ${size}%;
                                background: ${note.gradient};
                                animation-delay: ${index * 0.2}s;
                            ">
                                <span>${note.emoji} ${note.name}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="dna-info">
                <h3>Your Scent DNA Analysis</h3>
                <div class="dna-traits">
                    <div class="dominant-trait">
                        <h4>Dominant Family: ${dominant.name}</h4>
                        <p>${dominant.description}</p>
                    </div>
                    ${topMatch ? `
                        <div class="perfect-match">
                            <h4>Top Match: ${topMatch.name}</h4>
                            <p>${topMatch.description}</p>
                            <div class="match-actions" style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                <button class="btn-secondary" onclick="applyMixFromLibrary('${topMatch.name}')">
                                    <i class="fas fa-flask"></i> Apply Formula
                                </button>
                                <button class="btn-secondary" onclick="visualizeScent('${topMatch.name}')">
                                    <i class="fas fa-eye"></i> Visualize
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function updateProfileStats() {
    const pTriedCount = document.getElementById('pTriedCount');
    const pMatchCount = document.getElementById('pMatchCount');
    const pSavedCount = document.getElementById('pSavedCount');

    const quizAttempts = APP.history.filter(item => item.type === 'quiz').length;
    const matchesCount = quizAttempts > 0 ? quizAttempts : 0;
    const savedCount = APP.savedBlends.length;
    const triedCount = Math.max(savedCount, quizAttempts);

    if (pTriedCount) pTriedCount.textContent = String(triedCount);
    if (pMatchCount) pMatchCount.textContent = String(matchesCount);
    if (pSavedCount) pSavedCount.textContent = String(savedCount);

    renderSavedBlends();
}

function renderSavedBlends() {
    const savedGrid = document.getElementById('savedGrid');
    const savedEmpty = document.getElementById('savedEmpty');
    if (!savedGrid || !savedEmpty) return;

    if (!APP.savedBlends.length) {
        savedGrid.innerHTML = '';
        savedEmpty.classList.remove('hidden');
        return;
    }

    savedEmpty.classList.add('hidden');
    const blends = [...APP.savedBlends].sort((a, b) => b.id - a.id);

    savedGrid.innerHTML = blends.map(blend => {
        const notes = Object.entries(blend.mix)
            .filter(([_, value]) => value > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([note, value]) => `${NOTES[note].name} ${value}%`)
            .join(' • ');

        return `
            <div class="saved-blend">
                <h4>${blend.name}</h4>
                <p class="date">${new Date(blend.createdAt).toLocaleDateString()}</p>
                <div class="preview" style="background: ${createScentGradient(blend.mix)}"></div>
                <p class="notes">${notes}</p>
                <div class="match-actions" style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="btn-secondary" onclick="applySavedBlend(${blend.id})">
                        <i class="fas fa-sliders-h"></i> Load
                    </button>
                    <button class="btn-secondary" onclick="deleteSavedBlend(${blend.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function applySavedBlend(blendId) {
    const blend = APP.savedBlends.find(b => b.id === blendId);
    if (!blend) return;

    Object.entries(blend.mix).forEach(([note, value]) => {
        const slider = document.getElementById(`${note}Slider`);
        if (slider) slider.value = value;
    });

    APP.currentMix = { ...blend.mix };
    updateMix();
    goTo('mixer');
    showToast(`Loaded ${blend.name} ✨`, 'success');
}

function deleteSavedBlend(blendId) {
    const before = APP.savedBlends.length;
    APP.savedBlends = APP.savedBlends.filter(b => b.id !== blendId);
    if (APP.savedBlends.length === before) return;

    saveAppState();
    updateProfileStats();
    showToast('Blend removed', 'info');
}

function switchProfileTab(tab) {
    const map = {
        saved: 'savedTab',
        history: 'historyTab',
        share: 'shareTab'
    };

    document.querySelectorAll('.ptab').forEach(btn => {
        const isActive = btn.textContent.toLowerCase().includes(tab);
        btn.classList.toggle('active', isActive);
    });

    Object.values(map).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const target = document.getElementById(map[tab]);
    if (target) target.classList.remove('hidden');

    if (tab === 'history') renderHistory();
}

function renderHistory() {
    const historyTab = document.getElementById('historyTab');
    if (!historyTab) return;

    const quizHistory = APP.history
        .filter(item => item.type === 'quiz' && item.results?.recommendations?.matches?.[0])
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (!quizHistory.length) {
        historyTab.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <p>Your journey begins with the quiz</p>
            </div>
        `;
        return;
    }

    historyTab.innerHTML = `
        <div class="saved-grid">
            ${quizHistory.map(item => {
                const top = item.results.recommendations.matches[0];
                return `
                    <div class="saved-blend">
                        <h4>${top.name}</h4>
                        <p class="date">${new Date(item.date).toLocaleString()}</p>
                        <div class="preview" style="background: ${createScentGradient(top.mix)}"></div>
                        <p class="notes">${top.description}</p>
                        <div class="match-actions" style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <button class="btn-secondary" onclick="visualizeScent('${top.name}')">
                                <i class="fas fa-eye"></i> Visualize
                            </button>
                            <button class="btn-secondary" onclick="applyMixFromLibrary('${top.name}')">
                                <i class="fas fa-flask"></i> Apply
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function shareToSocial(platform) {
    const shareText = encodeURIComponent('I discovered my scent DNA with ScentMatch ✨ #ScentMatch #Fragrance');
    const pageUrl = encodeURIComponent(window.location.href);

    const urls = {
        instagram: `https://www.instagram.com/`,
        twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`
    };

    const target = urls[platform];
    if (!target) return;

    window.open(target, '_blank', 'noopener,noreferrer,width=700,height=600');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => showToast('Link copied to clipboard! 🔗', 'success'))
        .catch(() => showToast('Could not copy link', 'warning'));
}

// ============ STORAGE ============
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.warn('Failed to save data:', err);
    }
}

function getFromLocalStorage(key, defaultValue = null) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function saveAppState() {
    saveToLocalStorage('savedBlends', APP.savedBlends);
    saveToLocalStorage('history', APP.history);
    if (APP.quizResults) saveToLocalStorage('quizResults', APP.quizResults);
}

function loadSavedData() {
    APP.theme = getFromLocalStorage('theme', APP.theme);
    APP.speechRate = getFromLocalStorage('speechRate', APP.speechRate);
    APP.savedBlends = getFromLocalStorage('savedBlends', []);
    APP.history = getFromLocalStorage('history', []);
    APP.quizResults = getFromLocalStorage('quizResults', null);

    const a11y = getFromLocalStorage('accessibility', null);

    document.documentElement.setAttribute('data-theme', APP.theme);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = APP.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    if (a11y) {
        const hc = document.getElementById('highContrast');
        const lt = document.getElementById('largeText');
        const rm = document.getElementById('reduceMotion');
        const ad = document.getElementById('audioDesc');
        if (hc) hc.checked = !!a11y.hc;
        if (lt) lt.checked = !!a11y.lt;
        if (rm) rm.checked = !!a11y.rm;
        if (ad) ad.checked = !!a11y.autoAudio;
        applyA11y();
    }

    const speed = document.getElementById('voiceSpeed');
    const speedVal = document.getElementById('speedVal');
    if (speed) speed.value = String(APP.speechRate);
    if (speedVal) speedVal.textContent = `${APP.speechRate.toFixed(1)}x`;

    if (APP.quizResults) {
        updateProfileWithResults(APP.quizResults);
    }

    updateProfileStats();
}

// ============ MODAL & TOAST ============
function closeModal() {
    const modal = document.getElementById('resultsModal');
    if (modal) modal.classList.remove('active');
}

function showToast(message, type = 'info', duration = 2600) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconMap = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };
    toast.innerHTML = `
        <i class="toast-icon fas ${iconMap[type] || iconMap.info}"></i>
        <span class="toast-text">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

// ============ GLOBAL EVENTS ============
function setupEventListeners() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal();
            const panel = document.getElementById('a11y-panel');
            if (panel?.classList.contains('open')) panel.classList.remove('open');
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && APP.vizActive) {
            stopVisualization();
        }
    });

    window.addEventListener('beforeunload', saveAppState);
}

// ============ COMPATIBILITY LAYER (NEW UI) ============
function getEl(...ids) {
    for (const id of ids) {
        const el = document.getElementById(id);
        if (el) return el;
    }
    return null;
}

function normalizePageName(page) {
    const map = {
        quiz: 'personality',
        mixer: 'lab',
        visualizer: 'experience'
    };
    return map[page] || page;
}

function bootstrapCompatibility() {
    const a11yPanel = getEl('accessibility-panel', 'a11y-panel');
    if (a11yPanel) a11yPanel.classList.add('a11y-panel');

    const resultsModal = getEl('resultsModal');
    if (resultsModal) {
        resultsModal.classList.add('modal');
        const container = resultsModal.querySelector('.modal-container');
        if (container) container.classList.add('modal-box');
    }

    const welcome = getEl('welcomeScreen');
    const questionCard = getEl('questionCard');
    if (welcome && questionCard) {
        welcome.classList.remove('hidden');
        questionCard.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', bootstrapCompatibility);

function goTo(page) {
    const normalizedPage = normalizePageName(page);

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const target = document.getElementById(normalizedPage);
    if (target) {
        target.classList.add('active');
        APP.currentPage = normalizedPage;
    }

    document.querySelectorAll('.nav-btn, .mob-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === normalizedPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (normalizedPage === 'experience' && APP.currentVisualizedScent) {
        startVisualization();
    }
}

function toggleAccessibility() {
    const panel = getEl('accessibility-panel', 'a11y-panel');
    if (panel) panel.classList.toggle('open');
}

function applyAccessibility() {
    applyA11y();
}

function applyA11y() {
    const hc = getEl('highContrast')?.checked || false;
    const lt = getEl('largeText')?.checked || false;
    const rm = getEl('reduceMotion')?.checked || false;
    APP.autoAudio = getEl('audioDesc', 'audioDescriptions')?.checked || false;

    document.body.classList.toggle('high-contrast', hc);
    document.body.classList.toggle('large-text', lt);
    document.body.classList.toggle('reduce-motion', rm);

    saveToLocalStorage('accessibility', { hc, lt, rm, autoAudio: APP.autoAudio });
}

function updateVoiceSpeed(value) {
    const slider = getEl('voiceSpeed');
    if (slider && value !== undefined) slider.value = value;

    const speedValue = slider ? parseFloat(slider.value) : 1;
    APP.speechRate = speedValue;

    const speedVal = getEl('speedVal', 'speedDisplay');
    if (speedVal) speedVal.textContent = `${speedValue.toFixed(1)}x`;

    saveToLocalStorage('speechRate', APP.speechRate);
}

function readCurrentPage() {
    readPage();
}

function startScentDNA() {
    goTo('personality');
    startPersonalityQuiz();
}

function startPersonalityQuiz() {
    const welcome = getEl('welcomeScreen');
    const questionCard = getEl('questionCard');
    if (welcome) welcome.classList.add('hidden');
    if (questionCard) questionCard.classList.remove('hidden');
    startEnhancedQuiz();
}

function initQuiz() {
    const totalEl = getEl('qTotal', 'totalQuestions');
    if (totalEl) totalEl.textContent = String(QUIZ.length);
    updateQuestionIndicators();
    loadQuizQuestion(0);
}

function updateQuestionIndicators() {
    const container = getEl('questionIndicators');
    if (!container) return;

    container.innerHTML = QUIZ.map((_, i) => {
        const done = APP.quizAnswers[i] !== undefined;
        const active = i === APP.quizIndex;
        return `<span class="q-dot ${active ? 'active' : ''} ${done ? 'done' : ''}"></span>`;
    }).join('');
}

function loadQuizQuestion(index) {
    if (index >= QUIZ.length) {
        showQuizResults();
        return;
    }

    const q = QUIZ[index];
    APP.quizIndex = index;

    const categoryEl = getEl('qCategory', 'questionCategory');
    const numEl = getEl('qNum', 'currentQuestion');
    const titleEl = getEl('qTitle', 'questionTitle');
    const prevBtn = getEl('prevBtn');
    const nextBtn = getEl('nextBtn');

    if (categoryEl) categoryEl.textContent = q.category;
    if (numEl) numEl.textContent = String(index + 1);
    if (titleEl) titleEl.textContent = q.question;

    updateQuizProgress(index);

    const optContainer = getEl('qOptions', 'questionOptions');
    if (optContainer) {
        optContainer.innerHTML = '';
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'q-option question-option';
            div.textContent = opt.text;
            div.addEventListener('click', () => selectQuizOption(index, i, div));
            if (APP.quizAnswers[index] === i) div.classList.add('selected');
            optContainer.appendChild(div);
        });
    }

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) {
        nextBtn.disabled = APP.quizAnswers[index] === undefined;
        nextBtn.innerHTML = index === QUIZ.length - 1
            ? 'See Results <i class="fas fa-check"></i>'
            : 'Next <i class="fas fa-arrow-right"></i>';
    }

    updateQuestionIndicators();
}

function updateQuizProgress(index) {
    const pct = (index / QUIZ.length) * 100;
    const ringText = getEl('ringText', 'progressPercentage');
    const progressRing = getEl('progressRing');

    if (ringText) ringText.textContent = Math.round(pct) + '%';
    if (progressRing) {
        const radius = parseFloat(progressRing.getAttribute('r') || '52');
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (pct / 100) * circumference;
        progressRing.style.strokeDasharray = circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

function previousQuestion() {
    quizPrev();
}

function nextQuestion() {
    quizNext();
}

function updateAnalysisTags() {
    const traits = calculateTraits();
    const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1]);
    const container = getEl('analysisTags', 'traitsContainer');
    if (!container) return;

    container.innerHTML = sorted
        .filter(([_, val]) => val > 0)
        .slice(0, 5)
        .map(([key, val]) => {
            const note = NOTES[key];
            return `<span class="atag">${note.emoji} ${note.name}: ${val}</span>`;
        }).join('') || '<div class="trait-placeholder">Complete questions to reveal traits</div>';
}

function updateMix() {
    let total = 0;

    Object.keys(NOTES).forEach(note => {
        const slider = getEl(`${note}Slider`);
        const percent = getEl(`${note}Percent`, `${note}Percentage`);
        if (!slider) return;

        const value = parseInt(slider.value);
        APP.currentMix[note] = value;
        total += value;
        if (percent) percent.textContent = value + '%';

        updateSliderStyle(slider, NOTES[note].gradient);
    });

    updateTotalBar(total);
    updateBottleVisualization();
    updateBlendDescription();
    updateCanvasVisualization();

    const hasBlend = total > 0;
    const testSprayBtn = getEl('testSprayBtn');
    const createBlendBtn = getEl('createBlendBtn');
    if (testSprayBtn) testSprayBtn.disabled = !hasBlend;
    if (createBlendBtn) createBlendBtn.disabled = !hasBlend;
}

function updateTotalBar(total) {
    const totalPercent = getEl('totalPercent', 'totalBlendPercentage');
    const totalFill = getEl('totalFill', 'blendPercentageFill');
    const totalWarning = getEl('totalWarning');

    if (totalPercent) totalPercent.textContent = total + '%';
    if (totalFill) totalFill.style.width = Math.min(total, 100) + '%';

    if (totalWarning) {
        if (total > 100) {
            totalWarning.textContent = `⚠️ Over limit by ${total - 100}%`;
            totalWarning.classList.add('active');
        } else if (total === 0) {
            totalWarning.textContent = 'Select notes to create your blend';
            totalWarning.classList.add('active');
        } else {
            totalWarning.classList.remove('active');
        }
    }
}

function updateBottleVisualization() {
    const oldBottle = getEl('liquidFill');
    if (oldBottle) {
        const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
        oldBottle.style.height = Math.min(total, 100) + '%';
    }

    const chamber = getEl('blendVisualization');
    const emptyState = getEl('emptyBlendState');
    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);

    if (chamber) {
        chamber.style.background = createScentGradient(APP.currentMix);
        chamber.style.opacity = total > 0 ? '1' : '0.3';
    }
    if (emptyState) emptyState.style.display = total > 0 ? 'none' : 'flex';
}

function updateBlendDescription() {
    const title = getEl('blendTitle', 'blendName');
    const description = getEl('blendDescription', 'blendMood');

    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        if (title) title.textContent = 'Your Custom Blend';
        if (description) description.textContent = 'Adjust the sliders to create your signature scent';
        return;
    }

    const dominant = Object.entries(APP.currentMix)
        .filter(([_, val]) => val > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

    if (!dominant.length) return;
    const [primary] = dominant[0];
    const [secondary] = dominant[1] || [null];

    let name = NOTES[primary].name;
    if (secondary && APP.currentMix[secondary] >= 10) name += ` & ${NOTES[secondary].name}`;
    name += ' Blend';

    if (title) title.textContent = name;
    if (description) description.textContent = `${total}% formula • ${NOTES[primary].description}`;
}

function updateCanvasVisualization() {
    const canvas = getEl('vizCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const total = Object.values(APP.currentMix).reduce((sum, val) => sum + val, 0);
    if (total === 0) return;

    Object.entries(APP.currentMix).forEach(([note, percentage], index) => {
        if (percentage <= 0) return;
        const intensity = percentage / 100;
        for (let i = 0; i < 16; i++) {
            const x = (width / 16) * i;
            const y = height * 0.5 + Math.sin((Date.now() * 0.001) + i + index) * 25;
            const r = 6 + intensity * 18;
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, NOTES[note].colors[0] + '88');
            g.addColorStop(1, NOTES[note].colors[0] + '00');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function initVisualizer() {
    const canvas = getEl('mainVizCanvas', 'sensoryCanvas');
    if (!canvas) return;

    APP.vizCanvas = canvas;
    APP.vizCtx = canvas.getContext('2d');

    const resizeCanvas = () => {
        const container = canvas.parentElement;
        const rect = container ? container.getBoundingClientRect() : { width: 1000, height: 600 };
        canvas.width = Math.max(300, Math.floor(rect.width));
        canvas.height = Math.max(300, Math.floor(Math.min(rect.height || 600, 700)));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}

function initLibrary() {
    loadLibraryGrid();
    setupLibraryFilters();
}

function loadLibraryGrid() {
    const grid = getEl('libGrid', 'scentLibrary');
    if (!grid) return;

    grid.innerHTML = LIBRARY.map(fragrance => `
        <div class="lib-item" onclick="visualizeScent('${fragrance.name}')" data-family="${fragrance.family}">
            <div class="lib-preview" style="background: ${createScentGradient(fragrance.mix)}; height: 60px; border-radius: 8px; margin-bottom: 0.75rem;"></div>
            <h4>${fragrance.name}</h4>
            <span class="family">${fragrance.family}</span>
            <p>${fragrance.description}</p>
        </div>
    `).join('');
}

function setupLibraryFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter || btn.textContent.toLowerCase();
            filterLibrary(filter);
        });
    });
}

function setExperienceMode(mode) {
    APP.vizMode = mode === 'visual' ? 'waves' : mode === 'audio' ? 'particles' : mode === 'tactile' ? 'aurora' : 'nebula';
    document.querySelectorAll('.mode-btn[data-mode]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    if (APP.currentVisualizedScent) startVisualization();
}

function updateVisualizationDescription(scent) {
    const visual = getEl('vizVisualDesc', 'visualDescription');
    const tactile = getEl('vizTactileDesc', 'tactileDescription');
    const emotional = getEl('vizEmotionalDesc', 'emotionalDescription');
    const memory = getEl('vizMemoryDesc', 'audioDescription');
    const name = getEl('vizScentName', 'currentScentName');
    const desc = getEl('currentScentDescription');

    if (name) name.textContent = scent.name || 'Unknown Scent';
    if (desc) desc.textContent = scent.description || 'A custom sensory fragrance experience';
    if (visual) visual.textContent = scent.visual || 'Beautiful flowing colors';
    if (tactile) tactile.textContent = scent.tactile || 'Smooth and pleasant texture';
    if (emotional) emotional.textContent = scent.emotional || 'Evokes positive emotions';
    if (memory) memory.textContent = scent.memory || 'Creates lasting memories';
}

function closeModal() {
    const modal = getEl('resultsModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.style.display = '';
}

function displayQuizResults(results) {
    const modal = getEl('resultsModal');
    const modalBody = getEl('modalBody');
    if (!modal || !modalBody) return;

    const topMatch = results.recommendations.matches[0];
    modalBody.innerHTML = `
        <div class="results-content">
            <div class="results-header">
                <h2>🎉 Your Scent DNA Revealed!</h2>
                <p>Your top fragrance match is ready.</p>
            </div>
            <div class="top-match">
                <div class="match-visual">
                    <div class="scent-preview" style="background: ${createScentGradient(topMatch.mix)}"></div>
                </div>
                <div class="match-info">
                    <h3>${topMatch.name}</h3>
                    <p>${topMatch.description}</p>
                </div>
            </div>
            <div class="results-actions">
                <button class="btn-primary" onclick="applyMixFromLibrary('${topMatch.name}'); closeModal();">
                    <i class="fas fa-flask"></i> Apply Blend
                </button>
                <button class="btn-secondary" onclick="visualizeScent('${topMatch.name}'); closeModal();">
                    <i class="fas fa-eye"></i> Experience It
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    modal.style.display = 'flex';
}

function switchProfileTab(tab) {
    const isNew = !!document.querySelector('.tab-btn');

    if (isNew) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${tab}'`));
        });

        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const target = getEl(`${tab}Tab`);
        if (target) target.classList.add('active');
        if (tab === 'blends') renderSavedBlends();
        return;
    }

    const map = { saved: 'savedTab', history: 'historyTab', share: 'shareTab' };
    document.querySelectorAll('.ptab').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(tab));
    });
    Object.values(map).forEach(id => getEl(id)?.classList.add('hidden'));
    getEl(map[tab])?.classList.remove('hidden');
    if (tab === 'history') renderHistory();
}

function updateProfileStats() {
    const oldTried = getEl('pTriedCount');
    const oldMatch = getEl('pMatchCount');
    const oldSaved = getEl('pSavedCount');

    const blendsCreated = getEl('blendsCreated');
    const favoritesSaved = getEl('favoritesSaved');
    const scentDNA = getEl('scentDNA');

    const quizAttempts = APP.history.filter(item => item.type === 'quiz').length;
    const savedCount = APP.savedBlends.length;

    if (oldTried) oldTried.textContent = String(Math.max(savedCount, quizAttempts));
    if (oldMatch) oldMatch.textContent = String(quizAttempts);
    if (oldSaved) oldSaved.textContent = String(savedCount);

    if (blendsCreated) blendsCreated.textContent = String(savedCount);
    if (favoritesSaved) favoritesSaved.textContent = String(savedCount);
    if (scentDNA) scentDNA.textContent = `${Math.min(100, Math.round((quizAttempts / 1) * 100))}%`;

    renderSavedBlends();
}

function renderSavedBlends() {
    const newGrid = getEl('blendsGrid');
    const oldGrid = getEl('savedGrid');
    const oldEmpty = getEl('savedEmpty');

    if (!APP.savedBlends.length) {
        if (oldGrid) oldGrid.innerHTML = '';
        if (oldEmpty) oldEmpty.classList.remove('hidden');
        if (newGrid) {
            newGrid.innerHTML = `
                <div class="empty-blends-state">
                    <i class="fas fa-vial fa-3x"></i>
                    <h4>No blends yet</h4>
                    <p>Create your first custom fragrance to get started!</p>
                    <button class="btn-primary" onclick="goTo('lab')">Create First Blend</button>
                </div>
            `;
        }
        return;
    }

    if (oldEmpty) oldEmpty.classList.add('hidden');
    const blends = [...APP.savedBlends].sort((a, b) => b.id - a.id);

    const cards = blends.map(blend => `
        <div class="saved-blend">
            <h4>${blend.name}</h4>
            <p class="date">${new Date(blend.createdAt).toLocaleDateString()}</p>
            <div class="preview" style="background: ${createScentGradient(blend.mix)}"></div>
            <div class="match-actions" style="margin-top: 0.75rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
                <button class="btn-secondary" onclick="applySavedBlend(${blend.id})">Load</button>
                <button class="btn-secondary" onclick="deleteSavedBlend(${blend.id})">Delete</button>
            </div>
        </div>
    `).join('');

    if (oldGrid) oldGrid.innerHTML = cards;
    if (newGrid) newGrid.innerHTML = cards;
}

function applyPreset(presetName) {
    const aliases = {
        confident: 'cozy',
        playful: 'energetic',
        natural: 'fresh'
    };
    const key = aliases[presetName] || presetName;
    const preset = PRESETS[key];
    if (!preset) return;

    Object.entries(preset).forEach(([note, value]) => {
        const slider = getEl(`${note}Slider`);
        if (slider) slider.value = value;
    });

    updateMix();
    showToast(`Applied ${presetName} preset!`, 'success');
}

function updateNoteBlend(note, value) {
    const slider = getEl(`${note}Slider`);
    if (slider) slider.value = value;
    updateMix();
}

function resetBlend() { resetMix(); }
function saveBlend() { saveMix(); }
function shareBlend() { shareMix(); }
function createBlend() { saveMix(); showToast('Blend created successfully!', 'success'); }
function testSpray() { showToast('Test spray simulated 🌫️', 'info'); }

function toggleSensoryAudio() { toggleVizAudio(); }
function captureSensoryScene() { captureViz(); }
function shareSensoryExperience() { shareMix(); }
function playSensoryDescription() { speakDescription(); }
function updateSensoryIntensity() { showToast('Sensory intensity updated', 'info', 1200); }

function toggleFullscreen() {
    const el = getEl('sensoryCanvas', 'mainVizCanvas')?.parentElement;
    if (!el) return;
    if (!document.fullscreenElement) {
        el.requestFullscreen?.();
    } else {
        document.exitFullscreen?.();
    }
}

function switchLabMode(mode) {
    document.querySelectorAll('.lab-modes .mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    showToast(`Switched to ${mode} mode`, 'info', 1200);
}

function testAccessibilityFeatures() { showToast('Accessibility features test started', 'info'); }
function showQuizHelp() { showToast('Tip: Choose the option that feels most like you.', 'info'); }
function showSettings() { toggleAccessibility(); }
function showDeviceStatus() { showToast('Device connected and ready ✅', 'success'); }
function showNotifications() { showToast('You have 2 new fragrance suggestions', 'info'); }
function switchProfile() { showToast('Profile switching coming soon', 'info'); }

function toggleUserMenu() {
    const menu = getEl('userMenu');
    if (menu) menu.classList.toggle('open');
}

function watchDemo() { goTo('experience'); }
function learnMore(topic) { showToast(`More about ${topic}`, 'info'); }
function learnSustainability() { showToast('Sustainability details coming soon', 'info'); }

function devicePower() { showToast('Device power toggled', 'info'); }
function startMixing() { createBlend(); }
function cleanDevice() { showToast('Cleaning cycle started', 'info'); }
function calibrateDevice() { showToast('Calibration started', 'info'); }

// ============================================================
//  GLASS BOTTLE VISUALIZER
// ============================================================

/**
 * Update the glass bottle visualizer with the current blend state.
 * Called automatically by updateMix().
 */
function updateGlassBottleVisualizer() {
    const liquid  = document.getElementById('gbvLiquid');
    const aura    = document.getElementById('gbvAura');
    const bubbles = document.getElementById('gbvBubbles');
    const label   = document.getElementById('gbvLabelName');
    const fillTxt = document.getElementById('gbvFillText');

    if (!liquid) return;

    const total = Object.values(APP.currentMix).reduce((sum, v) => sum + v, 0);
    const height = Math.min(total, 100);
    const gradient = createScentGradient(APP.currentMix);

    // Liquid level & colour
    liquid.style.height   = height + '%';
    liquid.style.background = gradient !== 'transparent' ? gradient : 'linear-gradient(135deg,#ccc,#eee)';

    // Aura glow
    if (aura) {
        if (total > 0) {
            aura.style.background = gradient;
            aura.classList.add('active');
        } else {
            aura.classList.remove('active');
        }
    }

    // Label text
    const blendTitle = document.getElementById('blendTitle');
    if (label) {
        label.textContent = (blendTitle && blendTitle.textContent !== 'Your Custom Blend')
            ? blendTitle.textContent
            : 'My Blend';
    }

    // Fill indicator text
    if (fillTxt) {
        fillTxt.textContent = total === 0 ? 'Empty' : `${height}% filled`;
    }

    // Bubbles — regenerate when liquid changes significantly
    if (bubbles && total > 0) {
        _spawnGlassBottleBubbles(bubbles, gradient);
    } else if (bubbles) {
        bubbles.innerHTML = '';
    }
}

/** Spawn small rising bubbles inside the glass bottle liquid. */
function _spawnGlassBottleBubbles(container, gradient) {
    // Only refresh if count changed noticeably
    const desiredCount = Math.min(6, Math.floor(
        Object.values(APP.currentMix).reduce((s, v) => s + v, 0) / 15
    ));
    if (container.children.length === desiredCount) return;

    container.innerHTML = '';
    for (let i = 0; i < desiredCount; i++) {
        const b = document.createElement('div');
        b.className = 'gbv-bubble';
        const size = 4 + Math.random() * 6;
        b.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${10 + Math.random() * 70}%;
            bottom: ${Math.random() * 30}%;
            animation-duration: ${2 + Math.random() * 3}s;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(b);
    }
}

// ============================================================
//  ECO-SCORE TRACKER
// ============================================================

/**
 * Eco-friendliness weights per fragrance note (0–100).
 * Higher = more sustainable / natural.
 */
const ECO_WEIGHTS = {
    fresh:    88,  // mint, green tea, bamboo — highly renewable
    floral:   78,  // roses / jasmine — natural but water-intensive
    citrus:   82,  // fruit-derived, fast-growing
    woody:    60,  // sandalwood can be over-harvested; cedar is better
    oriental: 42,  // oud & amber are resource-intensive
    spicy:    65   // pepper/cinnamon — fairly sustainable crops
};

const ECO_GRADE_MAP = [
    { min: 85, grade: 'A+', cls: 'grade-a-plus' },
    { min: 70, grade: 'A',  cls: 'grade-a'      },
    { min: 55, grade: 'B',  cls: 'grade-b'       },
    { min: 40, grade: 'C',  cls: 'grade-c'       },
    { min: 0,  grade: 'D',  cls: 'grade-d'       }
];

/** Calculate and render the eco-score for the current blend. */
function updateEcoScore() {
    const badge      = document.getElementById('ecoScoreBadge');
    const fill       = document.getElementById('ecoScoreFill');
    const gauge      = document.getElementById('ecoScoreGauge');
    const number     = document.getElementById('ecoScoreNumber');
    const breakdown  = document.getElementById('ecoScoreBreakdown');

    if (!badge || !fill || !number || !breakdown) return;

    const total = Object.values(APP.currentMix).reduce((s, v) => s + v, 0);

    if (total === 0) {
        badge.textContent = '—';
        badge.className = 'eco-score-badge';
        fill.style.width = '0%';
        number.textContent = '—';
        if (gauge) gauge.setAttribute('aria-valuenow', '0');
        breakdown.innerHTML = '<p class="eco-score-empty">Mix ingredients to reveal your eco-impact</p>';
        return;
    }

    // Weighted average eco score
    let weightedSum = 0;
    Object.entries(APP.currentMix).forEach(([note, pct]) => {
        if (pct > 0) weightedSum += (pct / total) * (ECO_WEIGHTS[note] || 50);
    });
    const score = Math.round(weightedSum);

    // Grade
    const { grade, cls } = ECO_GRADE_MAP.find(g => score >= g.min) || ECO_GRADE_MAP[ECO_GRADE_MAP.length - 1];

    // Update DOM
    fill.style.width = score + '%';
    if (gauge) gauge.setAttribute('aria-valuenow', String(score));
    number.textContent = String(score);
    number.style.color = score >= 70 ? 'var(--success-color)' : score >= 50 ? 'var(--warning-color)' : 'var(--error-color)';
    badge.textContent = grade;
    badge.className = `eco-score-badge ${cls}`;

    // Breakdown — top 4 active notes
    const active = Object.entries(APP.currentMix)
        .filter(([_, v]) => v > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

    breakdown.innerHTML = active.map(([note, pct]) => {
        const eco = ECO_WEIGHTS[note] || 50;
        const n   = NOTES[note];
        const icon = eco >= 75 ? '🌿' : eco >= 55 ? '🌱' : '⚠️';
        return `
            <div class="eco-score-item">
                <span class="eco-score-item-icon">${icon}</span>
                <span class="eco-score-item-label">${n.emoji} ${n.name} (${pct}%)</span>
                <span class="eco-score-item-value">${eco}/100</span>
            </div>
        `;
    }).join('');
}

// ============================================================
//  GENAI STORY PANEL
// ============================================================

/** Story template fragments for simulated GenAI output. */
const STORY_TEMPLATES = {
    floral: [
        'walks through a sunlit garden where roses brush softly against your fingertips',
        'wanders into a hidden greenhouse filled with night-blooming jasmine',
        'discovers a secret courtyard where petals drift on a warm afternoon breeze'
    ],
    citrus: [
        'steps into a sunlit Mediterranean marketplace buzzing with freshly cut fruits',
        'wakes to the scent of a grove just after dawn, dew still on the leaves',
        'peels an orange by an open window as golden light floods the room'
    ],
    woody: [
        'follows a mossy trail deep into an ancient cedar forest after rain',
        'sits beside a fire of sandalwood, its smoke curling into a twilight sky',
        'breathes in the quiet wisdom of aged oak in a centuries-old library'
    ],
    oriental: [
        'discovers a candlelit souk where amber and oud perfume the warm air',
        'unravels silk adorned with precious resins traded along the Silk Road',
        'enters a palace courtyard where benzoin incense rises into velvet night'
    ],
    fresh: [
        'stands at the edge of a waterfall, cool mist kissing their skin',
        'steps barefoot on morning dew-covered grass in a silent meadow',
        'breathes the clarity of a mountain summit just after snowfall'
    ],
    spicy: [
        'explores a vibrant spice bazaar where pepper and cardamom fill the air',
        'warms their hands by a kitchen fire fragrant with cinnamon and clove',
        'opens an antique chest lined with ginger and allspice from distant shores'
    ]
};

const STORY_EMOTIONS = {
    floral:   ['tender', 'romantic', 'delicate', 'blossoming'],
    citrus:   ['joyful', 'electric', 'vibrant', 'energising'],
    woody:    ['grounded', 'confident', 'timeless', 'strong'],
    oriental: ['mysterious', 'opulent', 'seductive', 'rich'],
    fresh:    ['serene', 'clear', 'free', 'renewed'],
    spicy:    ['bold', 'passionate', 'daring', 'alive']
};

let _genaiCurrentStory = '';

/**
 * Generate a simulated AI fragrance story based on APP.currentMix.
 */
function generateScentStory() {
    const total = Object.values(APP.currentMix).reduce((s, v) => s + v, 0);
    if (total === 0) {
        showToast('Create a blend first to generate a story 💡', 'warning');
        return;
    }

    const placeholder = document.getElementById('genaiPlaceholder');
    const loading     = document.getElementById('genaiLoading');
    const storyText   = document.getElementById('genaiStoryText');
    const actions     = document.getElementById('genaiStoryActions');

    if (placeholder) placeholder.classList.add('hidden');
    if (storyText)   storyText.classList.add('hidden');
    if (actions)     actions.classList.add('hidden');
    if (loading)     loading.classList.remove('hidden');

    // Simulate network latency for realism
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
        const story = _buildScentStory();
        _genaiCurrentStory = story;

        if (loading)   loading.classList.add('hidden');
        if (storyText) {
            storyText.textContent = story;
            storyText.classList.remove('hidden');
        }
        if (actions) actions.classList.remove('hidden');
    }, delay);
}

/** Build a story string from the current mix. */
function _buildScentStory() {
    // Rank notes by intensity
    const active = Object.entries(APP.currentMix)
        .filter(([_, v]) => v > 0)
        .sort((a, b) => b[1] - a[1]);

    if (active.length === 0) return 'Create a blend to begin your story.';

    const [primaryNote]   = active[0];
    const [secondaryNote] = active[1] || [null];

    const primaryTemplates  = STORY_TEMPLATES[primaryNote]  || STORY_TEMPLATES.floral;
    const primaryEmotions   = STORY_EMOTIONS[primaryNote]   || STORY_EMOTIONS.floral;
    const secondaryEmotions = secondaryNote
        ? (STORY_EMOTIONS[secondaryNote] || [])
        : [];

    const scene   = primaryTemplates[Math.floor(Math.random() * primaryTemplates.length)];
    const emotion = primaryEmotions[Math.floor(Math.random() * primaryEmotions.length)];
    const accent  = secondaryEmotions.length
        ? secondaryEmotions[Math.floor(Math.random() * secondaryEmotions.length)]
        : '';

    const blendName = (document.getElementById('blendTitle') || {}).textContent || 'Your Custom Blend';
    const noteCount = active.length;

    const opener = `"${blendName}" — `;
    const body   = `A fragrance for those who ${scene}. `;
    const feel   = `Deeply ${emotion}${accent ? ` and ${accent}` : ''}, `;
    const close  = noteCount >= 3
        ? `this ${noteCount}-note composition unfolds like a journey, revealing new layers with every hour on the skin.`
        : 'this blend lingers like a treasured memory, impossible to forget.';

    return opener + body + feel + close;
}

/** Read the current story aloud using speech synthesis. */
function readScentStory() {
    if (_genaiCurrentStory) {
        speak(_genaiCurrentStory);
    } else {
        showToast('Generate a story first', 'warning');
    }
}

/** Copy the current story to the clipboard. */
function copyStoryToClipboard() {
    if (!_genaiCurrentStory) {
        showToast('Generate a story first', 'warning');
        return;
    }
    navigator.clipboard.writeText(_genaiCurrentStory)
        .then(() => showToast('Story copied to clipboard! 📋', 'success'))
        .catch(() => showToast('Could not copy story', 'warning'));
}

// ============================================================
//  SHAREABLE URL FEATURE
// ============================================================

/**
 * Encode the current blend as a query-string parameter and update the
 * share-URL input field.
 */
function generateShareableUrl() {
    const total = Object.values(APP.currentMix).reduce((s, v) => s + v, 0);
    const input = document.getElementById('shareableUrlInput');
    const hint  = document.getElementById('shareUrlHint');

    if (total === 0) {
        showToast('Create a blend first to share 💡', 'warning');
        return;
    }

    // Encode blend as compact base64-like string via URLSearchParams
    // Use 2-letter keys to avoid collision between 'floral' and 'fresh'
    const NOTE_ENCODE = { floral: 'fl', citrus: 'ci', woody: 'wo', oriental: 'or', fresh: 'fr', spicy: 'sp' };
    const params = new URLSearchParams();
    Object.entries(APP.currentMix).forEach(([note, val]) => {
        if (val > 0) params.set(NOTE_ENCODE[note] || note.slice(0, 2), String(val));
    });

    // Add blend name if set
    const blendName = (document.getElementById('blendTitle') || {}).textContent;
    if (blendName && blendName !== 'Your Custom Blend') {
        params.set('n', encodeURIComponent(blendName));
    }

    const base = window.location.origin + window.location.pathname;
    const shareUrl = `${base}?blend=${btoa(params.toString())}#lab`;

    if (input) {
        input.value = shareUrl;
        input.select();
    }
    if (hint) hint.textContent = '✅ Share link generated successfully!';

    // Auto-clear hint after 4 s
    setTimeout(() => { if (hint) hint.textContent = ''; }, 4000);
}

/** Copy the share URL to the clipboard. */
function copyShareableUrl() {
    const input = document.getElementById('shareableUrlInput');
    if (!input || !input.value) {
        generateShareableUrl();
        return;
    }

    navigator.clipboard.writeText(input.value)
        .then(() => {
            showToast('Share link copied to clipboard! 🔗', 'success');
            const hint = document.getElementById('shareUrlHint');
            if (hint) hint.textContent = '📋 Link copied!';
            setTimeout(() => { if (hint) hint.textContent = ''; }, 3000);
        })
        .catch(() => {
            // Clipboard API unavailable — prompt the user to copy manually
            input.select();
            showToast('Please copy the highlighted link manually', 'info');
        });
}

/** Native share sheet (Web Share API). */
function shareViaNative() {
    const total = Object.values(APP.currentMix).reduce((s, v) => s + v, 0);
    if (total === 0) {
        showToast('Create a blend first 💡', 'warning');
        return;
    }

    generateShareableUrl();
    const input = document.getElementById('shareableUrlInput');
    const url   = (input && input.value) ? input.value : window.location.href;

    const blendName = (document.getElementById('blendTitle') || {}).textContent || 'My Custom Blend';
    const text = `Check out my custom fragrance blend "${blendName}" – created with My Scent Lab by L'Oréal! 🌸 #MyScentLab`;

    if (navigator.share) {
        navigator.share({ title: blendName, text, url })
            .catch(err => {
                if (err.name !== 'AbortError') showToast('Could not share', 'warning');
            });
    } else {
        copyShareableUrl();
    }
}

/**
 * Read blend parameters from the URL on page load and apply them
 * if a ?blend= param is present.
 */
function loadBlendFromUrl() {
    try {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get('blend');
        if (!encoded) return;

        const decoded = new URLSearchParams(atob(encoded));
        // Decode using the same 2-letter key scheme used when encoding
        const NOTE_DECODE = { fl: 'floral', ci: 'citrus', wo: 'woody', or: 'oriental', fr: 'fresh', sp: 'spicy' };
        let applied = false;

        decoded.forEach((val, key) => {
            const note = NOTE_DECODE[key];
            if (note && APP.currentMix.hasOwnProperty(note)) {
                const slider = document.getElementById(`${note}Slider`);
                if (slider) {
                    slider.value = val;
                    applied = true;
                }
            }
        });

        if (applied) {
            updateMix();
            goTo('lab');
            showToast('Blend loaded from shared link! 🔗', 'success');
        }
    } catch {
        // Invalid or tampered URL — silently ignore
    }
}

// ============================================================
//  WIRE NEW FEATURES INTO THE BLEND UPDATE CYCLE
// ============================================================

/**
 * Override (extend) the existing updateMix to also update the three
 * new panels whenever the blend changes.
 */
(function patchUpdateMix() {
    const _originalUpdateMix = updateMix;
    updateMix = function () {
        _originalUpdateMix.apply(this, arguments);
        updateGlassBottleVisualizer();
        updateEcoScore();
        generateShareableUrl();   // keep URL in sync automatically
    };
})();

// Load a blend from the URL on startup (after DOM is ready)
document.addEventListener('DOMContentLoaded', loadBlendFromUrl);
function orderRefills() { showToast('Refill order page coming soon', 'info'); }