
// =========================
// GLOBAL VARIABLES
// =========================

let currentQuestion = 0;

let answers = [];

let visitedQuestions = [];

let userName = "";

let timer;

// =========================
// QUESTIONS
// =========================

const questions = [

{
    category:"English",
    question:"Choose the correct spelling.",
    options:["Recieve","Receive","Receve","Receeve"],
    answer:"Receive"
},

{
    category:"English",
    question:"Choose the synonym of Happy.",
    options:["Sad","Joyful","Angry","Weak"],
    answer:"Joyful"
},

{
    category:"English",
    question:"Opposite of Hot is:",
    options:["Warm","Cold","Heat","Boil"],
    answer:"Cold"
},

{
    category:"Logical",
    question:"2, 4, 6, 8, ?",
    options:["9","10","11","12"],
    answer:"10"
},

{
    category:"Logical",
    question:"Odd one out:",
    options:["Dog","Cat","Lion","Car"],
    answer:"Car"
},

{
    category:"Logical",
    question:"A, C, E, ?",
    options:["F","G","H","I"],
    answer:"G"
},

{
    category:"Maths",
    question:"25% of 200 = ?",
    options:["25","50","75","100"],
    answer:"50"
},

{
    category:"Maths",
    question:"12 × 5 = ?",
    options:["55","60","65","70"],
    answer:"60"
},

{
    category:"Maths",
    question:"Square of 9 = ?",
    options:["72","81","90","99"],
    answer:"81"
},

{
    category:"Maths",
    question:"√64 = ?",
    options:["6","7","8","9"],
    answer:"8"
}

];

// =========================
// LOGIN
// =========================

function loginUser(){

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    if(name === "" || email === ""){
        alert("Please fill all fields");
        return;
    }

    userName = name;

    document.getElementById("welcomeText")
    .innerText =
    "Welcome, " + userName + " 👋";

    showPage("homePage");
}

// =========================
// PAGE SWITCHING
// =========================

function showPage(pageId){

    document.getElementById("loginPage")
    .classList.add("hidden");

    document.getElementById("homePage")
    .classList.add("hidden");

    document.getElementById("testPage")
    .classList.add("hidden");

    document.getElementById("resultPage")
    .classList.add("hidden");

    document.getElementById(pageId)
    .classList.remove("hidden");
}

// =========================
// START TEST
// =========================

function startTest(){

    showPage("testPage");

    createPalette();

    loadQuestion();
}

// =========================
// LOAD QUESTION
// =========================

function loadQuestion(){

    const question =
    questions[currentQuestion];

    visitedQuestions[currentQuestion] = true;

    document.getElementById(
        "questionCategory"
    ).innerText =
    question.category;

    document.getElementById(
        "questionNumber"
    ).innerText =
    "Question " +
    (currentQuestion + 1) +
    " of " +
    questions.length;

    document.getElementById(
        "questionText"
    ).innerText =
    question.question;

    let optionsHTML = "";

    question.options.forEach(option => {

        const checked =
        answers[currentQuestion] === option
        ? "checked"
        : "";

        optionsHTML += `
        <div class="option-box">

            <label>

                <input
                    type="radio"
                    name="answer"
                    value="${option}"
                    ${checked}
                    onchange="saveAnswer('${option}')"
                >

                ${option}

            </label>

        </div>
        `;
    });

    document.getElementById(
        "optionsContainer"
    ).innerHTML =
    optionsHTML;

    updatePalette();

    updateProgress();
}

// =========================
// SAVE ANSWER
// =========================

function saveAnswer(selectedOption){

    answers[currentQuestion] =
    selectedOption;

    updatePalette();
}

// =========================
// PROGRESS BAR
// =========================

function updateProgress(){

    const progress =
    ((currentQuestion + 1)
    /
    questions.length)
    * 100;

    document.getElementById(
        "progressBar"
    ).style.width =
    progress + "%";

    document.getElementById(
        "progressBar"
    ).innerText =
    Math.round(progress) + "%";
}

// =========================
// QUESTION PALETTE
// =========================

function createPalette(){

    let html = "";

    for(
        let i = 0;
        i < questions.length;
        i++
    ){

        html += `
        <button
            id="palette-${i}"
            class="palette-btn not-visited"
            onclick="jumpToQuestion(${i})"
        >
            ${i + 1}
        </button>
        `;
    }

    document.getElementById(
        "questionPalette"
    ).innerHTML =
    html;
}

// =========================
// UPDATE PALETTE
// =========================

function updatePalette(){

    for(
        let i = 0;
        i < questions.length;
        i++
    ){

        const btn =
        document.getElementById(
            `palette-${i}`
        );

        btn.className =
        "palette-btn";

        if(i === currentQuestion){

            btn.classList.add(
                "current"
            );

        }
        else if(
            answers[i]
        ){

            btn.classList.add(
                "answered"
            );

        }
        else if(
            visitedQuestions[i]
        ){

            btn.classList.add(
                "visited"
            );

        }
        else{

            btn.classList.add(
                "not-visited"
            );
        }
    }
}

// =========================
// JUMP TO QUESTION
// =========================

function jumpToQuestion(index){

    currentQuestion = index;

    loadQuestion();
}

id="gx5v0h"
// =========================
// TIMER VARIABLES
// =========================

let timeLeft = 1800; // 30 Minutes

// =========================
// START TIMER
// =========================

function startTimer(){

    clearInterval(timer);

    timer = setInterval(() => {

        timeLeft--;

        const minutes =
        Math.floor(timeLeft / 60);

        const seconds =
        timeLeft % 60;

        document.getElementById(
            "timer"
        ).innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if(timeLeft <= 0){

            clearInterval(timer);

            alert(
                "Time is over. Test submitted automatically."
            );

            submitTest();
        }

    },1000);
}

// =========================
// MODIFY START TEST
// =========================
// IMPORTANT:
// Replace your old startTest()
// with this new version
// =========================

function startTest(){

    currentQuestion = 0;

    answers = new Array(
        questions.length
    ).fill(null);

    visitedQuestions = [];

    timeLeft = 1800;

    showPage("testPage");

    createPalette();

    loadQuestion();

    startTimer();
}

// =========================
// NEXT QUESTION
// =========================

function nextQuestion(){

    if(
        currentQuestion <
        questions.length - 1
    ){

        currentQuestion++;

        loadQuestion();
    }
}

// =========================
// PREVIOUS QUESTION
// =========================

function previousQuestion(){

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();
    }
}

// =========================
// SUBMIT TEST
// =========================

function submitTest(){

    clearInterval(timer);

    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    for(
        let i = 0;
        i < questions.length;
        i++
    ){

        if(
            answers[i] === null ||
            answers[i] === undefined
        ){

            skipped++;
        }

        else if(
            answers[i] ===
            questions[i].answer
        ){

            correct++;
        }

        else{

            incorrect++;
        }
    }

    const percentage =
    (
        (correct /
        questions.length)
        * 100
    ).toFixed(2);

    showResult(
        correct,
        incorrect,
        skipped,
        percentage
    );
}

// =========================
// RESULT PAGE
// =========================

function showResult(
    correct,
    incorrect,
    skipped,
    percentage
){

    showPage("resultPage");

    document.getElementById(
        "studentName"
    ).innerText =
    userName;

    document.getElementById(
        "correctCount"
    ).innerText =
    correct;

    document.getElementById(
        "incorrectCount"
    ).innerText =
    incorrect;

    document.getElementById(
        "skippedCount"
    ).innerText =
    skipped;

    document.getElementById(
        "percentage"
    ).innerText =
    percentage + "%";

    let message = "";

    if(percentage >= 80){

        message =
        "Excellent Performance 🎉";
    }

    else if(
        percentage >= 60
    ){

        message =
        "Good Job 👍";
    }

    else if(
        percentage >= 40
    ){

        message =
        "Average Performance 🙂";
    }

    else{

        message =
        "Needs More Practice 📚";
    }

    document.getElementById(
        "performanceMessage"
    ).innerText =
    message;
}

// =========================
// BACK TO HOME
// =========================

function goHome(){

    showPage("homePage");
}

// =========================
// DEBUG FUNCTION
// REMOVE LATER
// =========================

function printAnswers(){

    console.log(
        "Answers:",
        answers
    );
}
