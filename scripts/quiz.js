// mock API data, IRL, this would be stored in a database and the DB could be accessed thru HTTP methods using REST API
let questionsData = [];
const userSelections = {};
let currentQuestionIndex = 0;

const mockQuestions = [
    {
        id: 1,
        type: "text-with-image-choices",
        question: "How do you prefer to study?",
        choices: [
            { text: "With friends", image: "../assets/QuizItems/1/friends.png", weight: { "Social": 2 } },
            { text: "Alone", image: "../assets/QuizItems/1/alone.png", weight: { "Independent": 2 } },
            { text: "With a tutor", image: "../assets/QuizItems/1/tutor.jpg", weight: { "Traditional": 1 } },
            { text: "In a group", image: "../assets/QuizItems/1/group-study.jpeg", weight: { "Social": 2 } }
        ]
    },
    {
        id: 2,
        type: "text-with-image-choices",
        question: "How do you take notes?",
        choices: [
            { text: "Typed", image: "../assets/QuizItems/2/typed.jpg", weight: { "Tech-Savvy": 2 } },
            { text: "Written", image: "../assets/QuizItems/2/written.jpeg", weight: { "Traditional": 2 } },
            { text: "Recorded", image: "../assets/QuizItems/2/recorded.webp", weight: { "Tech-Savvy": 2 } },
            { text: "Don't take notes 😅", image: "../assets/QuizItems/2/no-notes.jpg", weight: { "Independent": 1 } }
        ]
    },
    {
        id: 3,
        type: "text-with-image-choices",
        question: "When do you study best?",
        choices: [
            { text: "Morning", image: "../assets/QuizItems/3/morning.jpg", weight: { "Early Bird": 2 } },
            { text: "Afternoon", image: "../assets/QuizItems/3/afternoon.jpeg", weight: { "Social": 2, "Independent": 2 } },
            { text: "Evening", image: "../assets/QuizItems/3/evening.jpg", weight: { "Night Owl": 2 } },
            { text: "Late at night", image: "../assets/QuizItems/3/midnight.avif", weight: { "Night Owl": 2 } }
        ]
    },
    {
        id: 4,
        type: "text-with-image",
        question: "How do you manage your study schedule?",
        image: "../assets/QuizItems/4/planner.jpg",
        choices: [
            { text: "I use a digital planner", weight: { "Tech-Savvy": 2 } },
            { text: "I write it down in a notebook", weight: { "Traditional": 2 } },
            { text: "I keep it in my head", weight: { "Independent": 1 } },
            { text: "I use sticky notes", weight: { "Tech-Savvy": 1, "Traditional": 1 } }
        ]
    },
    {
        id: 5,
        type: "text-with-image-choices",
        question: "What's your favorite study environment?",
        choices: [
            { text: "Library", image: "../assets/QuizItems/5/library.jpg", weight: { "Traditional": 2 } },
            { text: "Café", image: "../assets/QuizItems/5/cafe.webp", weight: { "Social": 2 } },
            { text: "Home", image: "../assets/QuizItems/5/home.jpg", weight: { "Independent": 2 } },
            { text: "Outdoors", image: "../assets/QuizItems/5/outdoors.jpg", weight: { "Social": 1, "Independent": 1 } }
        ]
    },
    {
        id: 6,
        type: "text-with-image",
        question: "How do you handle group projects?",
        image: "../assets/QuizItems/6/group-project.jpeg",
        choices: [
            { text: "I take the lead", weight: { "Social": 2 } },
            { text: "I prefer to do my part alone", weight: { "Independent": 2 } },
            { text: "I facilitate communication", weight: { "Social": 1, "Traditional": 1 } },
            { text: "I delegate tasks", weight: { "Social": 1, "Tech-Savvy": 1 } }
        ]
    },
    {
        id: 7,
        type: "text-with-image",
        question: "How do you prepare for exams?",
        image: "../assets/QuizItems/7/pile-of-books.jpg",
        choices: [
            { text: "Study with classmates", weight: { "Social": 2 } },
            { text: "Study alone", weight: { "Independent": 2 } },
            { text: "Follow a strict timetable", weight: { "Traditional": 2 } },
            { text: "Review the night before", weight: { "Night Owl": 2 } }
        ]
    },
    {
        id: 8,
        type: "text-with-image-choices",
        question: "Which study tool do you use most?",
        choices: [
            { text: "Laptops", image: "../assets/QuizItems/8/laptops.webp", weight: { "Tech-Savvy": 2 } },
            { text: "Notebooks", image: "../assets/QuizItems/8/notebooks.jpg", weight: { "Traditional": 2 } },
            { text: "Flashcards", image: "../assets/QuizItems/8/flashcards.gif", weight: { "Traditional": 1, "Tech-Savvy": 1 } },
            { text: "None", image: "../assets/QuizItems/8/none.webp", weight: { "Independent": 1 } }
        ]
    },
    {
        id: 9,
        type: "text-with-image-choices",
        question: "How do you stay motivated?",
        choices: [
            { text: "Study groups", image: "../assets/QuizItems/9/study-groups.jpg", weight: { "Social": 2 } },
            { text: "Personal goals", image: "../assets/QuizItems/9/personal-goals.png", weight: { "Independent": 2 } },
            { text: "Rewards", image: "../assets/QuizItems/9/rewards.png", weight: { "Social": 1, "Traditional": 1 } },
            { text: "Routine", image: "../assets/QuizItems/9/routine.avif", weight: { "Traditional": 1 } }
        ]
    },
    {
        id: 10,
        type: "text-with-image-choices",
        question: "What's your favorite type of assignment?",
        choices: [
            { text: "Group projects", image: "../assets/QuizItems/10/group-project.jpg", weight: { "Social": 2 } },
            { text: "Essays", image: "../assets/QuizItems/10/essay.jpg", weight: { "Independent": 2 } },
            { text: "Presentations", image: "../assets/QuizItems/10/presentation.jpg", weight: { "Social": 1 } },
            { text: "Research papers", image: "../assets/QuizItems/10/research-papers.jpg", weight: { "Traditional": 2 } }
        ]
    }
];

// Tally up the current scores
const categoryScores = {
    "Social": 0,
    "Independent": 0,
    "Tech-Savvy": 0,
    "Traditional": 0,
    "Night Owl": 0,
    "Early Bird": 0
};

// Initialize as null for each question
const userAnswers = Array(mockQuestions.length).fill(null);

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Simulate an asynchronous fetch using timeout function. In reality, would be an API fetch
const simulateFetchQuestions = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockQuestions);
        }, 1000); // 1 second delay simulation
    });
};

const loadQuestions = async () => {
    try {
        // Show the loader
        document.getElementById('loading').style.display = 'block';

        questionsData = await simulateFetchQuestions();

        // Hide the loader after 'fetching' all of the questions
        document.getElementById('loading').style.display = 'none';
        renderQuestion(questionsData[currentQuestionIndex]);

    } catch (error) {
        console.error(error);
        quizContainer.innerHTML = '<p>Error loading quiz data. Please try again later.</p>';
    }
};

// displays question on screen
const renderQuestion = (question) => {
    quizContainer.innerHTML = '';

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('h2');
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    // Question type 1: question corresponds to one main image
    if (question.type === "text-with-image") {
        const questionImage = document.createElement('img');
        questionImage.src = question.image;
        questionImage.alt = "Illustration for the question";
        questionImage.classList.add('question-image');
        questionDiv.appendChild(questionImage);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        question.choices.forEach((option, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${question.id}`;
            input.dataset.weight = JSON.stringify(option.weight);
            input.value = index;

            // Check the previously selected option
            if (userAnswers[currentQuestionIndex] === index) {
                input.checked = true;
            }

            label.appendChild(input);
            label.appendChild(document.createTextNode(option.text));
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);

        // Question type 2 : no "main image", instead each choice has its own image
    } else if (question.type === "text-with-image-choices") {
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        question.choices.forEach((choice, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${question.id}`;
            input.dataset.weight = JSON.stringify(choice.weight);
            input.value = index;

            // Check the previously selected option
            if (userAnswers[currentQuestionIndex] === index) {
                input.checked = true;
            }

            const image = document.createElement('img');
            image.src = choice.image;
            image.alt = choice.text;
            image.classList.add('choice-image');

            const text = document.createTextNode(choice.text);

            label.appendChild(input);
            label.appendChild(image);
            label.appendChild(text);
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);
    }

    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
};

const showPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion(questionsData[currentQuestionIndex]);
        updateNavigationButtons();

        // calculate the current progress ratio
        const currentProgressPercentage = (currentQuestionIndex + 1) / mockQuestions.length * 100
        document.getElementById('progress-bar').style.width = `${currentProgressPercentage}%`
    }
};

const showNextQuestion = () => {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    if (!selectedOption) {
        alert('Please select an answer.');
        return;
    }

    // Save the selected answer index
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value, 10);

    try {
        const weight = JSON.parse(selectedOption.dataset.weight);
        for (const category in weight) {
            categoryScores[category] += weight[category];
        }
    } catch (error) {
        console.error('Error parsing weight:', error);
        alert('An error occurred while processing your answer. Please try again.');
        return;
    }

    if (currentQuestionIndex < questionsData.length - 1) {
        currentQuestionIndex++;
        renderQuestion(questionsData[currentQuestionIndex]);
        updateNavigationButtons();
    } else {
        calculateResult();
    }

    // calculate the current progress ratio
    const currentProgressPercentage = (currentQuestionIndex + 1) / mockQuestions.length * 100
    document.getElementById('progress-bar').style.width = `${currentProgressPercentage}%`
};

// Ensures that you can only go "previous" when there is a previous question
const updateNavigationButtons = () => {

    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);

    if (currentQuestionIndex === questionsData.length - 1) {
        nextBtn.textContent = 'Submit';
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.classList.remove('hidden');
    }
};

// After the user clicks submit, the top categories are calculated
const calculateResult = () => {
    // Find the top categories
    const maxScore = Math.max(...Object.values(categoryScores));
    const topCategories = Object.keys(categoryScores).filter(
        category => categoryScores[category] === maxScore
    );

    // When there's a tie, selects the first category
    const resultCategory = topCategories[0];

    // Map categories to their respective pages
    const categoryPages = {
        "Social": "social.html",
        "Independent": "independent.html",
        "Tech-Savvy": "tech-savvy.html",
        "Traditional": "traditional.html",
        "Night Owl": "night-owl.html",
        "Early Bird": "early-bird.html"
    };

    // For debugging purposes only :)
    console.log(topCategories)

    // Redirect to the corresponding page
    if (categoryPages[resultCategory]) {
        window.location.href = categoryPages[resultCategory];
    } else {
        alert("An error occurred while calculating the result. Please try again.");
    }
};

prevBtn.addEventListener('click', showPreviousQuestion);
nextBtn.addEventListener('click', showNextQuestion);

document.addEventListener('DOMContentLoaded', loadQuestions);