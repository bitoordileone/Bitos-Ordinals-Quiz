const questions = [
    {
        question: "What is a Bitcoin Ordinal?",
        options: ["A type of Bitcoin transaction", "A unique identifier for Bitcoin UTXOs", "A protocol for smart contracts on Bitcoin", "A new cryptocurrency"],
        answer: 1
    },
    {
        question: "BRC-20 is a standard for what type of tokens?",
        options: ["Fungible tokens on Ethereum", "Non-fungible tokens on Ethereum", "Fungible tokens on Bitcoin", "Non-fungible tokens on Bitcoin"],
        answer: 2
    },
    {
        question: "Which of the following best describes Runes?",
        options: ["A type of blockchain consensus mechanism", "A protocol for issuing tokens on Bitcoin", "A decentralized exchange on Bitcoin", "A layer-2 scaling solution for Bitcoin"],
        answer: 1
    },
    {
        question: "Which year was Bitcoin created?",
        options: ["2007", "2008", "2009", "2010"],
        answer: 1
    },
    {
        question: "What is the primary purpose of the Lightning Network?",
        options: ["To increase Bitcoin's transaction speed and scalability", "To provide privacy features for Bitcoin transactions", "To allow the creation of smart contracts on Bitcoin", "To enable cross-chain transactions between Bitcoin and Ethereum"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion(index) {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <div class="h-2">${index + 1}. ${questions[index].question}</div>
    `;

    const answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = questions[index].options.map((option, i) => `
        <div class="answer-option">
            <div class="radio-button-${i + 1}" onclick="selectOption(${i})"></div>
            <div class="answer-text">${option}</div>
        </div>
    `).join('');

    updateProgressBar();
    updateButtons();
}

function selectOption(index) {
    document.querySelectorAll('[class^="radio-button-"]').forEach(button => {
        button.style.backgroundColor = "#710000";
        delete button.dataset.selected;
    });
    document.querySelector(`.radio-button-${index + 1}`).style.backgroundColor = "white";
    document.querySelector(`.radio-button-${index + 1}`).dataset.selected = true;
}

function nextQuestion() {
    const selectedOption = Array.from(document.querySelectorAll('[class^="radio-button-"]')).find(button => button.dataset.selected);
    if (selectedOption) {
        if (parseInt(selectedOption.className.split('-')[2]) - 1 === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    } else {
        alert("Please select an option!");
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showResults() {
    const questionContainer = document.getElementById("question-container");
    const scorePercentage = ((score / questions.length) * 100).toFixed(2);
    questionContainer.innerHTML = `
        <img src="your-image-path.png" alt="Results Image" class="results-image"/>
        <div class="score-text">Your Score: ${scorePercentage}%</div>
        <div class="results-buttons">
            <div class="start-over-button" onclick="startOver()">
                <div class="start-over-button-text">Start Over</div>
            </div>
            <div class="share-button" onclick="shareResults(${scorePercentage})">
                <div class="share-button-text">Share on X</div>
            </div>
        </div>
    `;
    document.getElementById("answer-container").innerHTML = '';
    document.getElementById("prev-button").style.display = "none";
    document.querySelector(".divider").style.display = "none";
    document.querySelector(".divider2").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.querySelector(".progress-container").style.display = "none"; // Hide progress bar on results page
}

function startOver() {
    score = 0;
    currentQuestion = 0;
    document.getElementById("prev-button").style.display = "block";
    document.getElementById("next-button").style.display = "block";
    document.querySelector(".divider").style.display = "block";
    document.querySelector(".divider2").style.display = "block";
    document.querySelector(".progress-container").style.display = "flex"; // Show progress bar when restarting
    showQuestion(currentQuestion);
}

function shareResults(scorePercentage) {
    const tweetText = `I scored ${scorePercentage}% on the Bito's Ordinals Quiz! Follow @bitoordileone and take the test yourself`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=https://your-image-url.com`;
    window.open(tweetUrl, '_blank');
}

function updateButtons() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    if (currentQuestion === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish";
        nextButton.setAttribute("onclick", "showResults()");
        nextButton.style.display = "block"; // Ensure the next button is displayed on the last question
    } else {
        nextButton.textContent = "Next";
        nextButton.setAttribute("onclick", "nextQuestion()");
        nextButton.style.display = "block";
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = (currentQuestion / (questions.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestion);
});
