// Initialize Lucide icons
lucide.createIcons();

const subjects = {
    english: {
        name: 'English',
        icon: 'book-open',
        games: [
            { id: 1, title: 'Word Builder', description: 'Form new words using given letters to enhance vocabulary!', url: 'https://www.abcya.com/games/alphabetize' },
            { id: 2, title: 'Grammar Ninja', description: 'Fix grammatical mistakes to earn points!', url: 'https://www.funbrain.com/games/grammar-gorillas' },
            { id: 3, title: 'Word Puzzle', description: 'Re-arrange the letters to make a word!', url: 'https://www.dictionary.com/games/word-puzzle/' }
        ]
    },
    mathematics: {
        name: 'Mathematics',
        icon: 'calculator',
        games: [
            { id: 1, title: 'Math match', description: 'Test your mathematical skills by matching!', url: 'https://www.abcya.com/games/math_match' },
            { id: 2, title: 'Shape Explorer', description: 'Identify and match different geometric shapes!', url: 'https://www.abcya.com/games/shapes_geometry_game' },
            { id: 3, title: 'Add & Win', description: 'Add numbers and checl your skills!', url: 'https://www.abcya.com/games/addition' }
        ]
    },
    science: {
        name: 'Science',
        icon: 'atom',
        games: [
            { id: 1, title: 'Chemical Fun', description: 'Learn chemistry with fun experiments!', url: 'https://www.acs.org/content/acs/en/education/whatischemistry/adventures-in-chemistry/games/bugs-on-the-run.html' },
            { id: 2, title: 'Biology Explorer', description: 'Discover the wonders of life sciences!', url: 'https://scichamp.com/photosynthesis-and-plant-respiration-game/' }
        ]
    }
};

const subjectsContainer = document.getElementById('subjects-container');
const gamesContainer = document.getElementById('games-container');
const backButton = document.getElementById('back-button');

// Create subject cards
function createSubjectCards() {
    subjectsContainer.innerHTML = Object.entries(subjects)
        .map(([key, subject]) => `
            <div class="subject-card" data-subject="${key}">
                <div class="card-content">
                    <div class="icon-container">
                        <i data-lucide="${subject.icon}"></i>
                    </div>
                    <h2 class="card-title">${subject.name}</h2>
                    <p class="card-description">Click to see fun games!</p>
                </div>
            </div>
        `)
        .join('');
    
    // Reinitialize icons after adding them to the DOM
    lucide.createIcons();
}

// Create game cards for a specific subject
function createGameCards(subjectKey) {
    const subject = subjects[subjectKey];
    const gamesGrid = gamesContainer.querySelector('.games-grid');
    
    gamesGrid.innerHTML = subject.games
        .map(game => `
            <div class="game-card">
                <div class="card-content">
                    <div class="icon-container">
                        <i data-lucide="gamepad-2"></i>
                    </div>
                    <h3 class="card-title">${game.title}</h3>
                    <p class="card-description">${game.description}</p>
                    <a href="${game.url}" target="_blank" class="play-button">Play Now!</a>
                </div>
            </div>
        `)
        .join('');
    
    // Reinitialize icons after adding them to the DOM
    lucide.createIcons();
}

// Show games for selected subject
function showGames(subjectKey) {
    subjectsContainer.classList.add('hidden');
    gamesContainer.classList.remove('hidden');
    createGameCards(subjectKey);
}

// Show subjects
function showSubjects() {
    subjectsContainer.classList.remove('hidden');
    gamesContainer.classList.add('hidden');
}

// Event Listeners
subjectsContainer.addEventListener('click', (e) => {
    const subjectCard = e.target.closest('.subject-card');
    if (subjectCard) {
        const subjectKey = subjectCard.dataset.subject;
        showGames(subjectKey);
    }
});

backButton.addEventListener('click', showSubjects);

// Initialize the app
createSubjectCards();
