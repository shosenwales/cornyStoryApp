const question = document.getElementById("question");
const answers = Array.from( document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Question Array
let questions = [
    {
        question:"inside which HTML element do we put the javascript ??",
        option1: "<script>",
        option2: "<javascript>",
        option3: "<js>",
        option4: "<scripting>",
        answer: 1
    },
    {
        question:"what is the file extension for CSS",
        option1: ".ccs",
        option2: ".ssc",
        option3: ".sass",
        option4: ".css",
        answer: 4
    },
    {
        question:"what does CSS stand for?",
        option1: "Cascaded Stylesheet",
        option2: "Cascading Stylesheet",
        option3: "Cascade Stylesheet",
        option4: "Casting Stylesheet",
        answer: 2 
    }
]

const CORRECT_BONUS = 10;   //number of point allocated when a user answers a question correctly 
const MAX_QUESTION = 3;     

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};
getNewQuestion = () => {
    //after exhausting the qestions in the array ...it takes you to the end game page
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("finish.html");
    }
    questionCounter++;
    //updating question counter text
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTION;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    answers.forEach(option => {
        const number = option.dataset["number"];
        option.innerText = currentQuestion['option' + number];
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

answers.forEach(option => {
    option.addEventListener("click", e =>{
       if(!acceptingAnswers)return;

       acceptingAnswers = false;
       const selectedOption = e.target;
       const selectedAnswer = selectedOption.dataset["number"];


        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            
        //checks if user answers a question correctly and increments score 
            if(classToApply === 'correct'){
                incrementScore(CORRECT_BONUS);
            }
           
            selectedOption.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedOption.parentElement.classList.remove(classToApply);
                getNewQuestion();
            },1000);
    });
});

//incrementing user score
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}
startGame();