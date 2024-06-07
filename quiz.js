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
        answer: 2  // Corrected to index 2 for "2009"
    },
    {
        question: "What is the primary purpose of the Lightning Network?",
        options: ["To increase Bitcoin's transaction speed and scalability", "To provide privacy features for Bitcoin transactions", "To allow the creation of smart contracts on Bitcoin", "To enable cross-chain transactions between Bitcoin and Ethereum"],
        answer: 0
    },
    {
        question: "Who is the pseudonymous creator of Bitcoin?",
        options: ["Vitalik Buterin", "Charlie Lee", "Satoshi Nakamoto", "Hal Finney"],
        answer: 2  // Corrected to index 2 for "Satoshi Nakamoto"
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
        <div class="answer-option" onclick="selectOption(${i})">
            <div class="radio-button" id="radio-${i}"></div>
            <div class="answer-text">${option}</div>
        </div>
    `).join('');

    updateProgressBar();
    updateButtons();
}

function selectOption(index) {
    document.querySelectorAll('.radio-button').forEach(button => {
        button.style.backgroundColor = "#ffffff";
        button.classList.remove('clicked');
        delete button.dataset.selected;
    });
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('clicked');
    });

    const selectedButton = document.querySelector(`#radio-${index}`);
    const selectedOption = selectedButton.closest('.answer-option');

    selectedButton.style.backgroundColor = "#8d5f5f";
    selectedButton.classList.add('clicked');
    selectedButton.dataset.selected = true;
    selectedButton.dataset.index = index;  // Store the selected option index

    selectedOption.classList.add('clicked'); // Add clicked class to the selected option
}

function nextQuestion() {
    const selectedOption = Array.from(document.querySelectorAll('.radio-button')).find(button => button.dataset.selected);
    if (selectedOption) {
        const selectedAnswerIndex = parseInt(selectedOption.dataset.index);
        console.log(`Selected Answer Index: ${selectedAnswerIndex}, Correct Answer Index: ${questions[currentQuestion].answer}`);
        if (selectedAnswerIndex === questions[currentQuestion].answer) {
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
    const totalQuestions = questions.length;
    const scoreLevel = Math.floor((score / totalQuestions) * 6) + 1; // Ensure scoreLevel is 6 when score is 6/6
    const scoreWord = ["Normie", "Noob", "Reply Guy", "Degen", "Ordinals OG", "You are Casey Rodarmor"][scoreLevel - 1];
    const imageUrl = `results-image${scoreLevel}.jpg`;

    console.log(`Score: ${score}, Score Level: ${scoreLevel}, Score Word: ${scoreWord}`); // Debugging log

    localStorage.setItem('scoreLevel', scoreLevel);
    localStorage.setItem('scoreWord', scoreWord);
    localStorage.setItem('imageUrl', imageUrl);

    window.location.href = 'results.html';
}

function startOver() {
    score = 0;
    currentQuestion = 0;
    window.location.href = 'index.html';
}

function shareResults() {
    const scoreLevel = localStorage.getItem('scoreLevel');
    const scoreWord = localStorage.getItem('scoreWord');

    // Define the image URLs for each score level
    const imageUrls = {
        1: "pic.twitter.com/gyAa48dizO", // Replace with the actual tweet URL for image 1
        2: "pic.twitter.com/hijf9Zx6kw", // Replace with the actual tweet URL for image 2
        3: "pic.twitter.com/Az301fVf4D", // Replace with the actual tweet URL for image 3
        4: "pic.twitter.com/vHeefX1nYR", // Replace with the actual tweet URL for image 4
        5: "pic.twitter.com/xt5VJ6cqzg", // Replace with the actual tweet URL for image 5
        6: "pic.twitter.com/MLQR8rWG9x"  // Replace with the actual tweet URL for image 6
    };

    const imageUrl = imageUrls[scoreLevel]; // Get the image URL for the current score level
    const tweetText = `I scored ${scoreLevel}/6 (${scoreWord}) on Bito's Ordinals Quiz! Open @bitoordileone and see if you are Ordinals OG!`;
    const encodedTweetText = encodeURIComponent(tweetText);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedTweetText}%20${encodeURIComponent(imageUrl)}`;
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
        nextButton.onclick = showResults;
    } else {
        nextButton.textContent = "Next";
        nextButton.onclick = nextQuestion;
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith('results.html')) {
        const scoreLevel = localStorage.getItem('scoreLevel');
        const scoreWord = localStorage.getItem('scoreWord');
        const imageUrl = localStorage.getItem('imageUrl');
        if (scoreLevel && scoreWord && imageUrl) {
            document.getElementById('results-level').innerText = `${scoreLevel}/6`;
            document.getElementById('results-word').innerText = scoreWord;
            document.querySelector('.results-image').src = imageUrl;
        } else {
            // If for some reason the data is missing, redirect to start over
            startOver();
        }
    } else {
        showQuestion(currentQuestion);
    }
});