
/* ==================================
   GENERAL SLIDE NAVIGATION
================================== */

function showSlide(slideId) {
    document.querySelectorAll(".slide").forEach(function (slide) {
        slide.classList.remove("active");
    });

    const target = document.getElementById(slideId);

    if (target) {
        target.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}


/* ==================================
   SLIDE 01 - THE SUSPICIOUS INVITATION
================================== */

const openingScreen = document.getElementById("openingScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const verificationScreen = document.getElementById("verificationScreen");
const failureScreen = document.getElementById("failureScreen");

const openButton = document.getElementById("openButton");
const openEnvelopeButton = document.getElementById("openEnvelopeButton");
const letMeInButton = document.getElementById("letMeInButton");

const envelope = document.getElementById("envelope");
const progressFill = document.getElementById("progressFill");
const progressNumber = document.getElementById("progressNumber");
const systemMessage = document.getElementById("systemMessage");
const stuckMessage = document.getElementById("stuckMessage");

let verificationStarted = false;

openButton.addEventListener("click", function () {
    openingScreen.classList.add("hidden");
    envelopeScreen.classList.remove("hidden");
});

openEnvelopeButton.addEventListener("click", function () {
    if (verificationStarted) return;

    verificationStarted = true;
    envelope.classList.add("open");
    openEnvelopeButton.disabled = true;

    setTimeout(function () {
        envelopeScreen.classList.add("hidden");
        verificationScreen.classList.remove("hidden");
        startVerification();
    }, 1100);
});

function startVerification() {
    const messages = [
        "Initialising security protocols...",
        "Scanning suspicious activity...",
        "Checking personality records...",
        "Analysing attitude levels...",
        "Almost there. Please wait..."
    ];

    let progress = 0;

    const interval = setInterval(function () {
        if (progress < 99) {
            progress += Math.floor(Math.random() * 5) + 2;
            if (progress > 99) progress = 99;

            progressFill.style.width = progress + "%";
            progressNumber.textContent = progress + "%";

            if (progress >= 20) systemMessage.textContent = messages[1];
            if (progress >= 40) systemMessage.textContent = messages[2];
            if (progress >= 60) systemMessage.textContent = messages[3];
            if (progress >= 85) systemMessage.textContent = messages[4];
        } else {
            clearInterval(interval);
            systemMessage.textContent = "Please wait...";

            setTimeout(function () {
                stuckMessage.classList.remove("hidden");
                systemMessage.textContent =
                    "ERROR: WE HAVE NO IDEA WHAT TO DO WITH YOU.";
            }, 1800);

            setTimeout(function () {
                verificationScreen.classList.add("hidden");
                failureScreen.classList.remove("hidden");
            }, 4300);
        }
    }, 130);
}

letMeInButton.addEventListener("click", function () {
    showSlide("slide2");
});


/* ==================================
   SLIDE 02 - THE IMPOSSIBLE VERIFICATION
================================== */

const answerButtons = document.querySelectorAll(".answer-button");
const answerFeedback = document.getElementById("answerFeedback");
const feedbackIcon = document.getElementById("feedbackIcon");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const finalVerdict = document.getElementById("finalVerdict");

const answerReplies = {
    obvious: {
        icon: "🙄",
        title: "DENIAL DETECTED.",
        text: "Your confidence is impressive. Your honesty, however, remains questionable."
    },
    depends: {
        icon: "🤨",
        title: "SUSPICIOUS RESPONSE.",
        text: "The system has detected an unnecessary amount of attitude in that answer."
    },
    refuse: {
        icon: "🚨",
        title: "COOPERATION LEVEL: ZERO.",
        text: "Refusing to answer is also an answer. And somehow, it's the most suspicious one."
    }
};

let answered = false;

answerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (answered) return;

        answered = true;
        const reply = answerReplies[button.dataset.answer];

        feedbackIcon.textContent = reply.icon;
        feedbackTitle.textContent = reply.title;
        feedbackText.textContent = reply.text;

        answerButtons.forEach(function (item) {
            item.disabled = true;
        });

        answerFeedback.classList.remove("hidden");

        setTimeout(function () {
            finalVerdict.classList.remove("hidden");
        }, 1800);
    });
});

document.getElementById("continueToSlide3").addEventListener("click", function () {
    showSlide("slide3");
});



/* ==================================
   SLIDE 03 - THE NAUGHTY BUTTON
================================== */

const buttonPlayground = document.getElementById("buttonPlayground");
const escapeButton = document.getElementById("escapeButton");
const naughtyMessage = document.getElementById("naughtyMessage");
const naughtyStatus = document.getElementById("naughtyStatus");
const naughtyUnlocked = document.getElementById("naughtyUnlocked");

let escapeCount = 0;
let buttonFinished = false;

const teaseMessages = [
    "Oops! Too slow. 😂",
    "HAHA! You almost had it.",
    "Don't give up now. Or maybe do.",
    "This button clearly doesn't like you.",
    "You're still trying? Impressive.",
    "Okay, okay... you've suffered enough."
];

escapeButton.addEventListener("click", function () {

    if (buttonFinished) return;

    escapeCount++;

    if (escapeCount >= 6) {
        buttonFinished = true;

        buttonPlayground.classList.add("hidden");
        naughtyStatus.classList.add("hidden");
        naughtyMessage.classList.add("hidden");

        naughtyUnlocked.classList.remove("hidden");

        return;
    }

    naughtyMessage.textContent =
        teaseMessages[escapeCount - 1];

    naughtyStatus.textContent =
        "SYSTEM STATUS: BUTTON ESCAPE DETECTED — RETRY REQUIRED";

    const area = buttonPlayground.getBoundingClientRect();

    const buttonWidth = escapeButton.offsetWidth;
    const buttonHeight = escapeButton.offsetHeight;

    const padding = 15;

    const maxX = area.width - buttonWidth - padding;
    const maxY = area.height - buttonHeight - padding;

    const newX = padding + Math.random() * (maxX - padding);
    const newY = 45 + Math.random() * Math.max(0, maxY - 45);

    escapeButton.style.transform = "none";
    escapeButton.style.left = newX + "px";
    escapeButton.style.top = newY + "px";
});


/* CONTINUE TO SLIDE 04 */

document.getElementById("continueToSlide4").addEventListener("click", function () {
    showSlide("slide4");
});



/* ==================================
   SLIDE 04 - OFFICIAL ANNOYANCE TEST
================================== */

const testQuestion = document.getElementById("testQuestion");
const testOptions = document.getElementById("testOptions");
const testQuestionNumber = document.getElementById("testQuestionNumber");
const testFeedback = document.getElementById("testFeedback");
const personalityReport = document.getElementById("personalityReport");

const quizQuestions = [
    {
        question: "Someone disagrees with you. What do you do?",
        options: [
            "A little debate never hurt anyone.",
            "Explain why I'm obviously right.",
            "I was right. Next question."
        ],
        replies: [
            "A debate? We call that a 45-minute conversation about absolutely nothing.",
            "The confidence is impressive. The evidence is still missing.",
            "We admire your ability to skip directly to the conclusion."
        ]
    },
    {
        question: "You receive a message. How quickly do you reply?",
        options: [
            "Immediately. I'm polite.",
            "Whenever I feel like it.",
            "I saw it. I just chose peace."
        ],
        replies: [
            "Polite? Interesting. We'll investigate this unusual claim.",
            "Translation: everyone waits until you are ready.",
            "Peace has officially filed a complaint against you."
        ]
    },
    {
        question: "What happens when someone tells you to calm down?",
        options: [
            "I stay calm.",
            "I ask why they are telling me that.",
            "That is when the real discussion begins."
        ],
        replies: [
            "The system has detected a suspiciously calm answer.",
            "A simple question that somehow becomes a full investigation.",
            "We knew it. The final boss has entered the room."
        ]
    }
];

let currentQuestion = 0;

function loadQuizQuestion() {
    const question = quizQuestions[currentQuestion];

    testQuestionNumber.textContent =
        "QUESTION 0" + (currentQuestion + 1) + " / 03";

    testQuestion.textContent = question.question;
    testOptions.innerHTML = "";
    testFeedback.classList.add("hidden");

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "test-option";
        button.textContent = option;

        button.addEventListener("click", function () {
            handleQuizAnswer(index);
        });

        testOptions.appendChild(button);
    });
}

function handleQuizAnswer(index) {
    const question = quizQuestions[currentQuestion];
    const buttons = testOptions.querySelectorAll(".test-option");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    testFeedback.textContent = question.replies[index];
    testFeedback.classList.remove("hidden");

    setTimeout(function () {
        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            loadQuizQuestion();
        } else {
            testQuestionNumber.textContent = "ASSESSMENT COMPLETE";
            testQuestion.classList.add("hidden");
            testOptions.classList.add("hidden");
            testFeedback.classList.add("hidden");
            personalityReport.classList.remove("hidden");
        }
    }, 1600);
}

loadQuizQuestion();


/* ==================================
   SLIDE 05 - COMPLAINT DEPARTMENT
================================== */

document.getElementById("continueToSlide5").addEventListener("click", function () {
    showSlide("slide5");
});

const appealButton = document.getElementById("appealButton");
const complaintScreen = document.getElementById("complaintScreen");
const appealRejected = document.getElementById("appealRejected");

appealButton.addEventListener("click", function () {
    complaintScreen.classList.add("hidden");
    appealRejected.classList.remove("hidden");
});


/* ==================================
   SLIDE 05 - GO TO SECRET MISSION
================================== */

document.getElementById("continueToSlide6").addEventListener("click", function () {
    showSlide("slide6");
});


/* ==================================
   SLIDE 06 - THE SECRET MISSION
================================== */

const hiddenStars = document.querySelectorAll(".hidden-star");
const starCount = document.getElementById("starCount");
const starMessage = document.getElementById("starMessage");
const starMessageTitle = document.getElementById("starMessageTitle");
const starMessageText = document.getElementById("starMessageText");
const secretUnlocked = document.getElementById("secretUnlocked");

let foundStars = [];

const starMessages = [
    {
        title: "A LITTLE TOO CURIOUS.",
        text: "You really went looking for this. We respect the dedication. Just a little."
    },
    {
        title: "STILL SEARCHING?",
        text: "Your curiosity is officially stronger than your patience. Interesting combination."
    },
    {
        title: "THE FINAL STAR!",
        text: "Congratulations! You have successfully completed a mission that absolutely nobody asked you to do."
    }
];

hiddenStars.forEach(function (star) {

    star.addEventListener("click", function () {

        const starNumber = Number(star.dataset.star);

        if (foundStars.includes(starNumber)) return;

        foundStars.push(starNumber);
        star.classList.add("found");

        starCount.textContent =
            "STARS FOUND: " + foundStars.length + " / 3";

        const message = starMessages[starNumber];

        starMessageTitle.textContent = message.title;
        starMessageText.textContent = message.text;

        starMessage.classList.remove("hidden");

        if (foundStars.length === 3) {

            starCount.textContent = "ALL STARS FOUND: 3 / 3";

            setTimeout(function () {
                secretUnlocked.classList.remove("hidden");
                secretUnlocked.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }, 900);

        }

    });

});



/* ==================================
   SLIDE 06 - OPEN FINAL WARNING
================================== */

document.getElementById("openSecretFile").addEventListener("click", function () {
    showSlide("slide7");
});


/* ==================================
   SLIDE 07 - THE FINAL WARNING
================================== */

const finalWarningScreen = document.getElementById("finalWarningScreen");
const trustResponse = document.getElementById("trustResponse");
const trustResponseTitle = document.getElementById("trustResponseTitle");
const trustResponseText = document.getElementById("trustResponseText");

function showTrustResponse(isTrusting) {

    finalWarningScreen.classList.add("hidden");
    trustResponse.classList.remove("hidden");

    if (isTrusting) {
        trustResponseTitle.textContent = "THAT'S WHAT THEY ALL SAY.";
        trustResponseText.textContent =
            "Trusting a suspicious website this easily? Your judgement is officially under investigation.";
    } else {
        trustResponseTitle.textContent = "GOOD. AT LEAST YOU'RE LEARNING.";
        trustResponseText.textContent =
            "Finally! A sensible decision. It only took seven levels for you to become suspicious.";
    }
}

document.getElementById("trustButton").addEventListener("click", function () {
    showTrustResponse(true);
});

document.getElementById("distrustButton").addEventListener("click", function () {
    showTrustResponse(false);
});
// GO FROM SLIDE 07 TO SLIDE 08

document.getElementById("continueToSlide8").addEventListener("click", function () {
    showSlide("slide8");
});

/* ==================================
   SLIDE 08 - THE UNEXPECTED SILENCE
================================== */

const silenceScreen = document.getElementById("silenceScreen");
const heartMessage = document.getElementById("heartMessage");

document.getElementById("openHeartMessage").addEventListener("click", function () {

    silenceScreen.classList.add("hidden");

    heartMessage.classList.remove("hidden");

});

document.getElementById("continueToSlide9").addEventListener("click", function () {

    showSlide("slide9");

});

/* SLIDE 09 - FINAL BIRTHDAY REVEAL */

// Slide 8 already takes the visitor to Slide 9
// using the continueToSlide9 button.

// ==================================
// SLIDE 09 - THE CASE IS CLOSED
// ==================================

const openFinalFile = document.getElementById("openFinalFile");
const revealFinalMessage = document.getElementById("revealFinalMessage");

openFinalFile.addEventListener("click", function () {

    document.getElementById("finalReport").classList.add("hidden");

    document.getElementById("secretFile").classList.remove("hidden");

});

revealFinalMessage.addEventListener("click", function () {

    document.getElementById("secretFile").classList.add("hidden");

    document.getElementById("actualFinalMessage").classList.remove("hidden");

});
