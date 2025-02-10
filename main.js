// Default credentials
const DEFAULT_USERNAME = 'user';
const DEFAULT_PASSWORD = 'user';

// DOM Elements
const homePage = document.getElementById('homePage');
const authContainer = document.getElementById('authContainer');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const userDisplay = document.getElementById('userDisplay');
const showLoginBtn = document.getElementById('showLoginBtn');
const showSignUpBtn = document.getElementById('showSignUpBtn');
const getStartedBtn = document.getElementById('getStartedBtn');
const showSignUpLink = document.getElementById('showSignUp');
const showSignInLink = document.getElementById('showSignIn');

// Close auth modal when clicking outside
authContainer.addEventListener('click', (e) => {
    if (e.target === authContainer) {
        showHome();
    }
});

// Show/Hide Functions
function showHome() {
    homePage.classList.remove('hidden');
    authContainer.classList.add('hidden');
    dashboard.classList.add('hidden');
}

function showAuth(mode = 'signin') {
    homePage.classList.add('hidden');
    authContainer.classList.remove('hidden');
    dashboard.classList.add('hidden');
    
    const signIn = document.querySelector('.sign-in');
    const signUp = document.querySelector('.sign-up');
    
    if (mode === 'signin') {
        signIn.classList.remove('hidden');
        signUp.classList.add('hidden');
    } else {
        signUp.classList.remove('hidden');
        signIn.classList.add('hidden');
    }
}

function showDashboard(username) {
    homePage.classList.add('hidden');
    authContainer.classList.add('hidden');
    dashboard.classList.remove('hidden');
    userDisplay.textContent = username;
    animateStreak();
}

// Event Listeners
showLoginBtn.addEventListener('click', () => showAuth('signin'));
showSignUpBtn.addEventListener('click', () => showAuth('signup'));
getStartedBtn.addEventListener('click', () => showAuth('signup'));

showSignUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.sign-in').classList.add('hidden');
    document.querySelector('.sign-up').classList.remove('hidden');
});

showSignInLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.sign-up').classList.add('hidden');
    document.querySelector('.sign-in').classList.remove('hidden');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        showDashboard(username);
    } else {
        alert('Invalid credentials! Use username: user, password: user');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    alert('Account created successfully! Please login.');
    document.querySelector('.sign-up').classList.add('hidden');
    document.querySelector('.sign-in').classList.remove('hidden');
});

// Animation for streak count
let streakCount = 0;
const streakCountElement = document.getElementById('streakCount');
const targetStreak = 27;

// Dashboard functionality
const backToHomeBtn = document.getElementById('backToHome');
const courseCards = document.querySelectorAll('.course-card');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
    // Redirect to the logout page
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = 'dashboard.html';
});

// Add click event to navigation items
const navButtons = document.querySelectorAll(".dashboard-nav .nav-button"); // Select button elements
navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Remove active class from all buttons
        navButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to the clicked button
        button.classList.add("active");
    });
});


// Back to home functionality
backToHomeBtn.addEventListener('click', () => {
    showHome();
});

// Navigation buttons


// Course cards interaction
courseCards.forEach(card => {
    card.addEventListener('click', () => {
        const courseName = card.dataset.course;
        const progressBar = card.querySelector('.progress-bar');
        const currentWidth = parseInt(progressBar.style.width);
        
        // Simulate progress update
        if (currentWidth < 100) {
            progressBar.style.width = `${Math.min(currentWidth + 10, 100)}%`;
            const progressText = card.querySelector('.progress-text');
            progressText.textContent = `${Math.min(currentWidth + 10, 100)}% Complete`;
        }
    });

    // Continue button click
    const continueBtn = card.querySelector('.continue-btn');
    continueBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        const courseName = card.dataset.course;
        alert(`Loading ${courseName} course content...`);
    });
});

// Streak animation
function animateStreak() {
    streakCount = 0;
    const animate = () => {
        if (streakCount < targetStreak) {
            streakCount++;
            streakCountElement.textContent = streakCount;
            setTimeout(animate, 50);
        }
    };
    animate();
}