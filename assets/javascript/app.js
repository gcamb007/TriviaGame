$(document).ready(function () {

    //Array with all the question, answer, and image options to display
    var triviaArray = [{
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
        },
        {
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
            question: "What is the planet that Thor and Loki come from called?",
            choice: ["a) Titan", "b) Zenn-La", "c) Asgard"],
            answer: 2,
            image: "./assets/images/asgard/01.gif",
        }

    ];

    var playerGuess = ""; //Holds the player's input by clicking an answer
    var correct = 0; //Holds correct input guesses by player
    var incorrect = 0; //Holds incorrect input guesses by player 
    var unanswer = 0; //Holds unaswered questions 
    var image; //Holds the image to be display
    var count; //Time counter use for the decrement of the timer
    var timeLeft = 5; //Holds seconds player has to answer one question

    $("#restart").hide(); //This hides the 'restart' button

    $("#start").click(function () { //This function is the initiation function that starts the trivia game
        $(this).hide(); //Here 'this' represents the 'start' button
        count = setInterval(timer, 1000); //This redefines the 'count' variable value 
        displayTrivia(); //Initiate the 'displayTrivia' function
        $(timer).show();      
    });

    var computerPick; //Stores the questions picked by the computer to be display

    function displayTrivia() { //Displays the trivia questions
        initialQuestion = Math.floor(Math.random() * triviaArray.length); 
        computerPick = triviaArray[initialQuestion]; //Computer picks random question from the 'triviaArraya'
        $("#questionDiv").html("<h1>" + computerPick.question + "</h1>"); //Pushes computerPick to the 'questionDiv' in the HTML
        for (var i = 0; i < computerPick.question.length; i++) { //Loops the answers for each trivia question
            var userChoice = $("<div>"); //Pushes the answer choices to the 'answerDiv' in the HTML
            userChoice.addClass("answerchoice");
            userChoice.html(computerPick.choice[i]);
            userChoice.attr("data-id", i);
            $("#answerDiv").append(userChoice);
            $("#timelapse").show();
        }
    };

    function timer() { //Timer function to run the timer for each question
        timeLeft--; //Dicreases the timer
        if (timeLeft === 0) {
            clearInterval(count); //Clears the count value
        }
        $("#timelapse").html("Time left: " + timeLeft);
    };

    $(document).on("click", "div", function () { //Function use to determine the game outcomes and push them into the 'answerPick' div
        playerGuess = $(this).data("id");
        //console.log (playerGuess);
        triviaArray[0].answer;

        if (playerGuess !== triviaArray[0].answer) { //Incorrect player guess code
            $("#answerDiv").text("That's incorrect! The correct answer is: " + computerPick.choice[computerPick.answer]);
            incorrect++;
            playerGuess = "";
            $("#timelapse").hide();
            picture();

        } else if (playerGuess === triviaArray[0].answer) { //Correct player guess code
            $("#answerDiv").text("Correct!");
            correct++;
            playerGuess = "";
            $("#timelapse").hide();
            picture();

        } else { //No answer and timer runout code
            $("#answerDiv").html("<h1>Time is up! The correct answer is: " + computerPick.choice[computerPick.answer] + "</h1>");
            stop();
            unanswer++;
            playerGuess = "";
            $("#timelapse").hide();
            picture();
        }
    });

    var newArray = []; //New array that holds the player's final scores - all game answers

    function picture() { //This function shows a specific image after the 'answerDiv' is filled
        $("#answerDiv").append("<img src=" + computerPick.image + ">");
        newArray.push(computerPick);
        triviaArray.splice(initialQuestion);

        var hideImage = setTimeout(function () {
            $("#answerDiv").empty();
            timeLeft = 5;
        }, 4000);
    };

    //This code is use to display the final score at the end of the game, not working, I need to fix this!

    // if ((incorrect + correct + unanswer) === triviaArray.choice.length) {
    //     $("#questionDiv").empty();
    //     $("#questionDiv").html("<h1>Game Over!  Your score: </h1>");
    //     $("#answerDiv").append("<h1> Correct: " + correct + "</h1>");
    //     $("#answerDiv").append("<h1> Incorrect: " + incorrect + "</h1>");
    //     $("#answerDiv").append("<h1> Unanswered: " + unanswer + "</h1>");
    //     $("#restart").show();
    //     correct = 0;
    //     incorrect = 0;
    //     unanswer = 0;
    // } else {
    //     displayTrivia();
    // };

    //Audio file - code from a Google search use to make sure audio plays in Chrome
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
        $("#iframeAudio").remove()
    } else {
        $("#playAudio").remove()
    };

})

// NOTE: Had to stop working on finishing this app so I could have time to work on the API homewrok. Reworking the logic I had followed before was challenging, especially understanding the scope of the code.