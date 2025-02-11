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
const streakCountElement = document.getElementById('streakCount');
const navButtons = document.querySelectorAll(".dashboard-nav a");
const backToHomeBtn = document.getElementById('backToHome');
const courseCards = document.querySelectorAll('.course-card');
const logoutBtn = document.getElementById('logoutBtn');

// Close auth modal when clicking outside
authContainer.addEventListener('click', (e) => {
    if (e.target === authContainer) {
        showHome();
    }
});


function createCourseCards(subjectKey) {
    const subject = subjects[subjectKey];
    const coursesGrid = coursesContainer.querySelector('.courses-grid');

    coursesGrid.innerHTML = subject.courses
        .map(course => `
            <div class="course-card ${completedCourses.has(`${subjectKey}-${course.id}`) ? 'completed' : ''}" 
                 data-course-id="${subjectKey}-${course.id}">
                <div class="completed-mark">
                    <i data-lucide="check"></i> Completed
                </div>
                <div class="icon-container">
                    <i data-lucide="play-circle"></i>
                </div>
                <h3 class="card-title">${course.title}</h3>
                <p class="card-description">${course.description}</p>
                <button class="watch-button" data-youtube="${course.youtube}">
                    <i data-lucide="play"></i>
                    Watch Now
                </button>
            </div>
        `)
        .join('');

    lucide.createIcons();

    // Add click handlers for watch buttons
    coursesGrid.querySelectorAll('.watch-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const youtubeLink = button.dataset.youtube;
            //window.open(youtubeLink, '_blank'); // Open YouTube video in new tab

            // Get the video ID from the YouTube link
            const videoId = youtubeLink.split('v=')[1];
            const ampersandPosition = videoId.indexOf('&');
            if (ampersandPosition != -1) {
                videoId = videoId.substring(0, ampersandPosition);
            }

            // Embed the YouTube video in the modal
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;

            const videoModal = document.getElementById('video-modal');
            videoModal.classList.remove('hidden');

            const courseCard = button.closest('.course-card');
            const courseId = courseCard.dataset.courseId;

            // 10-second delay before marking as completed
            setTimeout(() => {
                completedCourses.add(courseId);
                courseCard.classList.add('completed');
                // Check if all courses are completed
                if (checkIfSubjectCompleted(subjectKey)) {
                    showCertificate(subjectKey);
                }
            }, 10000);
        });
    });
}
// Get the modal
const modal = document.getElementById("video-modal");

// Get the button that closes the modal
const span = document.getElementsByClassName("close-button")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.classList.add('hidden');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.add('hidden');
  }
}


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

    const signInForm = document.querySelector('.sign-in');
    const signUpForm = document.querySelector('.sign-up');

    if (mode === 'signin') {
        signInForm.classList.remove('hidden');
        signUpForm.classList.add('hidden');
    } else {
        signUpForm.classList.remove('hidden');
        signInForm.classList.add('hidden');
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

// Dashboard functionality

// Back to home functionality
backToHomeBtn.addEventListener('click', () => {
    showHome();
});

// Navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

logoutBtn.addEventListener('click', () => {
    // Redirect to the logout page
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = 'index.html'; //back to the landing page
    // Or if you have an showHome function, you can call it
});

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

// Simulate streak increase
let streakCount = 7;
const streakCounter = document.querySelector(".streak-number");
setInterval(() => {
    streakCount++;
    streakCounter.textContent = streakCount;
    streakCounter.style.transform = "scale(1.2)";
    setTimeout(() => {
        streakCounter.style.transform = "scale(1)";
    }, 300);
}, 5000);

// Streak animation
function animateStreak() {
    streakCount = 0;
    const animate = () => {
        if (streakCount < 27) {
            streakCount++;
            streakCountElement.textContent = streakCount;
            setTimeout(animate, 50);
        }
    };
    animate();
}
