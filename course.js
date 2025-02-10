const subjects = {
    math: {
        name: 'Math Fun',
        icon: 'calculator',
        courses: [
            { id: 1, title: 'Counting Adventures', description: 'Learn to count with fun games!', youtube: 'https://www.youtube.com/watch?v=OEbRDtCAFdU' },
            { id: 2, title: 'Shapes & Patterns', description: 'Explore shapes and colorful patterns!', youtube: 'https://www.youtube.com/watch?v=zw47_q9wbBE' },
            { id: 3, title: 'Addition & Subtraction', description: 'Learn simple math with fun tricks!', youtube: 'https://www.youtube.com/watch?v=WT_wvvEvkw4' }
        ]
    },
    english: {
        name: 'English Fun',
        icon: 'book-open',
        courses: [
            { id: 1, title: 'ABC Songs', description: 'Sing and learn the alphabet!', youtube: 'https://www.youtube.com/watch?v=75p-N9YKqNo' },
            { id: 2, title: 'Phonics for Kids', description: 'Learn sounds and spell words!', youtube: 'https://youtu.be/d0Hq0fjT3r4?si=qZNspDcGwfb-qE8W' },
            { id: 3, title: 'Story Time', description: 'Enjoy classic bedtime stories!', youtube: 'https://www.youtube.com/watch?v=79kpoGF8KWU' }
        ]
    },
    science: {
        name: 'Science for Kids',
        icon: 'flask-conical',
        courses: [
            { id: 1, title: 'The Solar System', description: 'Explore planets and stars!', youtube: 'https://www.youtube.com/watch?v=mQrlgH97v94' },
            { id: 2, title: 'Animals & Habitats', description: 'Learn about where animals live!', youtube: 'https://youtu.be/Xj1ASC-TlsI?si=5yR1cL7Zpuj-H8CZ' },
            { id: 3, title: 'Fun Experiments', description: 'Try cool science tricks at home!', youtube: 'https://youtu.be/hGwG--GZEfw?si=NNET1Ae18MAE39Mw' }
        ]
    }
};

// Track completed courses
const completedCourses = new Set();

const subjectsContainer = document.getElementById('subjects-container');
const coursesContainer = document.getElementById('courses-container');
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
                    <p class="card-description">Click to explore fun lessons!</p>
                </div>
            </div>
        `)
        .join('');
    
    lucide.createIcons();
}

// Create course cards for a specific subject
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
            window.open(youtubeLink, '_blank'); // Open YouTube video in new tab

            const courseCard = button.closest('.course-card');
            const courseId = courseCard.dataset.courseId;

            // 10-second delay before marking as completed
            setTimeout(() => {
                completedCourses.add(courseId);
                courseCard.classList.add('completed');
            }, 10000);
        });
    });
}

// Show courses for selected subject
function showCourses(subjectKey) {
    subjectsContainer.classList.add('hidden');
    coursesContainer.classList.remove('hidden');
    createCourseCards(subjectKey);
}

// Show subjects
function showSubjects() {
    subjectsContainer.classList.remove('hidden');
    coursesContainer.classList.add('hidden');
}

// Event Listeners
subjectsContainer.addEventListener('click', (e) => {
    const subjectCard = e.target.closest('.subject-card');
    if (subjectCard) {
        const subjectKey = subjectCard.dataset.subject;
        showCourses(subjectKey);
    }
});

backButton.addEventListener('click', showSubjects);

// Initialize the app
createSubjectCards();

document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "dashboard.html";
  });
  