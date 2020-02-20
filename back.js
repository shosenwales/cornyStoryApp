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
        question:"CRUD stands for?",
        option1: "Core Read Update Delete",
        option2: "Core Random Utitlity Data",
        option3: "Create Random Utility Data",
        option4: "Create Read Update Delete",
        answer: 4
    },
    {
        question:"Api stands for",
        option1: "Application Programming ifile",
        option2: "Assembly programming Instructions",
        option3: "Application Programming Interface",
        option4: "Accessible Programming Interface",
        answer: 3
    },
    {
        question:"OOP stands for",
        option1: "Object Oriented Programming",
        option2: "Object Organised Program",
        option3: "Object Only Programming",
        option4: "Ordered Object Programming",
        answer: 1 
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