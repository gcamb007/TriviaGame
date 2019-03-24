$(document).ready(function () {
    var options = [{
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
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();

    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    //timer countdown
    function decrement() {
        $("#timelapse").html("<h1>Time left: " + timer + "</h1>");
        timer--;

        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerDiv").html("<h1>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</h1>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //show initial random trivia question and answers
    function displayQuestion() {
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        $("#questionDiv").html("<h1>" + pick.question + "</h1>");
        //trivia loop
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //create new array to evaluate answer choices
            userChoice.attr("data-guessvalue", i);
            $("#answerDiv").append(userChoice);
        }

        //select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerDiv").html("<h1>Correct!</h1>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerDiv").html("<h1>That's incorrect! The correct answer is: " + pick.choice[pick.answer] + "</h1>");
                hidepicture();
            }
        })
    }

    function hidepicture() {
        $("#answerDiv").append("<img src=" + pick.image + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerDiv").empty();
            timer = 10;

            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionDiv").empty();
                $("#questionDiv").html("<h1>Game Over!  Your score: </h1>");
                $("#answerDiv").append("<h1> Correct: " + correctCount + "</h1>");
                $("#answerDiv").append("<h1> Incorrect: " + wrongCount + "</h1>");
                $("#answerDiv").append("<h1> Unanswered: " + unanswerCount + "</h1>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
            } else {
                runTimer();
                displayQuestion();
            }

        }, 4000);


    }

    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
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

})