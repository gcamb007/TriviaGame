$(document).ready(function () {
    //options variables
    var triviaOptions = [{
            question: "Who is Peter Parker’s nemesis in the first Spider-Man film?",
            choice: ["a) The Joker", "b) Magneto", "c) The Green Goblin"],
            answer: 2,
            image: "./assets/images/green-goblin/01.gif",
        },
        {
            question: "What is the name of the cosmic cube that Loki takes control of in The Avengers?",
            choice: ["a) the Tesseract", "b) the Magic Cube", "c) the Mjolnir"],
            answer: 0,
            image: "./assets/images/tesseract/01.gif",
        },
        {
            question: "How many Avengers are there in the Avengers movie?",
            choice: ["a) 4", "b) 10", "c) 6"],
            answer: 2,
            image: "./assets/images/avengersmovie/01.gif",
        }, {
            question: "What’s the name of Tony Stark’s company in the Iron Man trilogy?",
            choice: ["a) Stark and Sons", "b) Stark and Co", "c) Stark Industries"],
            answer: 2,
            image: "./assets/images/starkindustries/01.gif",
        },
        {
            question: "How many years was Captain America frozen for in Captain America: The First Avenger?",
            choice: ["a) Nearly 100 years", "b) Nearly 70 years", "c) Nearly 20 years"],
            answer: 1,
            image: "./assets/images/cap/01.gif",
        },
        {
            question: "Who is Thor’s main romantic interest in Thor?",
            choice: ["a) Jane Foster", "b) Jean Grey", "c) Mary Jane"],
            answer: 0,
            image: "./assets/images/thor/01.gif",
        },
        {
            question: "What is the name of Rhodey’s iron suit in Iron Man 3?",
            choice: ["a) Death Proof", "b) War Machine", "c) Killing Machine"],
            answer: 1,
            image: "./assets/images/warmachine/01.gif",
        },
        {
            question: "What is the planet called that Thor and Loki come from?",
            choice: ["a) Titan", "b) Zenn-La", "c) Asgard"],
            answer: 2,
            image: "./assets/images/asgard/01.gif",
        }

    ];
    
    //global variables
    var correct = 0;
    var wrong = 0;
    var unanswer = 0;
    var timer = 10;
    var intervalId;
    var playerGuess = "";
    var running = false;
    var questionCount = triviaOptions.length;
    var computerPick;
    var initialQuestion;
    var newArray = [];
    var spaceHolder = [];

    //start game
    $("#restart").hide();
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < triviaOptions.length; i++) {
            spaceHolder.push(triviaOptions[i]);
        }
    })

    //show initial random trivia question and answers functions
    //display questions function
    function displayQuestion() {
        initialQuestion = Math.floor(Math.random() * triviaOptions.length);
        computerPick = triviaOptions[initialQuestion];
        //createRadioElement ();
        $("#questionDiv").html("<h1>" + computerPick.question + "</h1>");
        //trivia loop
        for (var i = 0; i < computerPick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(computerPick.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answerDiv").append(userChoice);
            $("#timelapse").show();
        }

        //select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            playerGuess = parseInt($(this).attr("data-guessvalue"));

            //correct or wrong guess outcomes
            if (playerGuess === computerPick.answer) {
                stop();
                correct++;
                playerGuess = "";
                $("#answerDiv").html("<h1>Correct!</h1>");
                $("#timelapse").hide();
                picture();
            } else {
                stop();
                wrong++;
                playerGuess = "";
                $("#answerDiv").html("<h1>That's incorrect! The correct answer is: " + computerPick.choice[computerPick.answer] + "</h1>");
                $("#timelapse").hide();
                picture();
            }
        })
    }

    //timer function
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //countdown function
    function decrement() {
        $("#timelapse").html("<h1>Time left: " + timer + "</h1>");
        timer--;
        //if timer runs out
        if (timer === 0) {
            unanswer++;
            stop();
            $("#answerDiv").html("<h1>Time is up! The correct answer is: " + computerPick.choice[computerPick.answer] + "</h1>");
            $("#timelapse").hide();
            picture();
        }
    }

    //timer stop and clear function
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //image function
    function picture() {
        $("#answerDiv").append("<img src=" + computerPick.image + ">");
        newArray.push(computerPick);
        triviaOptions.splice(initialQuestion, 1);

        var hidepic = setTimeout(function () {
            $("#answerDiv").empty();
            timer = 10;

            //show results and final score
            if ((wrong + correct + unanswer) === questionCount) {
                $("#questionDiv").empty();
                $("#questionDiv").html("<h1>Game Over!  Your score: </h1>");
                $("#answerDiv").append("<h1> Correct: " + correct + "</h1>");
                $("#answerDiv").append("<h1> Incorrect: " + wrong + "</h1>");
                $("#answerDiv").append("<h1> Unanswered: " + unanswer + "</h1>");
                $("#restart").show();
                correct = 0;
                wrong = 0;
                unanswer = 0;
            } else {
                runTimer();
                displayQuestion();
            }
        }, 4000);
    }

    //restart game
    $("#restart").on("click", function () {
        $("#restart").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for (var i = 0; i < spaceHolder.length; i++) {
            triviaOptions.push(spaceHolder[i]);
        }
        runTimer();
        displayQuestion();
    })

    //audio file
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
        $("#iframeAudio").remove()
    } else {
        $("#playAudio").remove()
    }

    // function createRadioElement( name, checked ) {
    //     var radioInput;
    //     try {
    //         var radioHtml = '<input type="radio" name="' + name + '"';
    //         if ( checked ) {
    //             radioHtml += ' checked="checked"';
    //         }
    //         radioHtml += '/>';
    //         radioInput = document.createElement(radioHtml);
    //     } catch( err ) {
    //         radioInput = document.createElement('input');
    //         radioInput.setAttribute('type', 'radio');
    //         radioInput.setAttribute('name', name);
    //         if ( checked ) {
    //             radioInput.setAttribute('checked', 'checked');
    //         }
    //     }
    
    //     return radioInput;
    // }
})