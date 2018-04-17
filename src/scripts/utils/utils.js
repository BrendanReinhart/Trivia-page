var categories = {"trivia_categories" :
    [
        {"id":9,"name":"General Knowledge"},
        {"id":10,"name":"Entertainment: Books"},
        {"id":11,"name":"Entertainment: Film"},
        {"id":12,"name":"Entertainment: Music"},
        {"id":13,"name":"Entertainment: Musicals & Theatres"},
        {"id":14,"name":"Entertainment: Television"},
        {"id":15,"name":"Entertainment: Video Games"},
        {"id":16,"name":"Entertainment: Board Games"},
        {"id":17,"name":"Science & Nature"},
        {"id":18,"name":"Science: Computers"},
        {"id":19,"name":"Science: Mathematics"},
        {"id":20,"name":"Mythology"},
        {"id":21,"name":"Sports"},
        {"id":22,"name":"Geography"},
        {"id":23,"name":"History"},
        {"id":24,"name":"Politics"},
        {"id":25,"name":"Art"},
        {"id":26,"name":"Celebrities"},
        {"id":27,"name":"Animals"},
        {"id":28,"name":"Vehicles"},
        {"id":29,"name":"Entertainment: Comics"},
        {"id":30,"name":"Science: Gadgets"},
        {"id":31,"name":"Entertainment: Japanese Anime & Manga"},
        {"id":32,"name":"Entertainment: Cartoon & Animations"}
    ]
};

var Utils = (function(){
    var correctAnswers = {};
    correctCounter = 0;
    totalCounter = 0;
    numQuestions = 0;
    return {

        // Checks that user parameters are valid before making ajax call:
        "checkFormIsValid": function() {
            typeSelected = $('input[type=checkbox]:checked').length;
            if(!typeSelected) {
                return false;
                alert("You must select at least one question type.");
            } else {
                return true;
            }
        },
    
        // Checks that every question on screen has been answered before showing answers:
        "checkAnswersAreValid": function() {
            answersSelected = $('.answer-selected').length;
            console.log('answersSelected: ',answersSelected);
            console.log('numQuestions: ',numQuestions);
            if (answersSelected == numQuestions) {
                return true;
            } else {
                alert("You must answer all questions to continue.");
                return false;
            }
        },
    
        // Decodes the answers for comparison later on:
        "htmlDecoder": function(encodedString) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(
                '<!doctype html><body>' + encodedString,
                'text/html');
            return dom.body.textContent;
        },
    
        // Gets user-defined parameters before making ajax call:
        "getFormData": function() {
            var formData = {};
    
            // Number
            var questionNumber = $('.question-number').val();
            numQuestions = questionNumber;
            formData['amount'] = questionNumber;
    
            // Difficulty
            var questionDifficulty = $('input[name=question-difficulty]:checked').val();
            if (questionDifficulty != 'any') {
                formData['difficulty'] = questionDifficulty;
            };
    
            // Type
            var questionTypes = [];
            $('.question-type-checkboxes input:checked').each(function() {
                questionTypes.push($(this).attr('value'));
            });
            // Only need ajax parameter if one type specified:
            if(questionTypes.length == 1) {
            formData['type'] = questionTypes[0];
            };
    
            // Category
            var questionCategory = $('.question-category').val();
            if (questionCategory != 'all') {
                formData['category'] = questionCategory;
            };
    
            return formData;
        },
    
        // Makes ajax call to get trivia questions:
        "getQuestions": function(options) {
            var params = $.extend({ "amount": 10 }, options);
            return $.ajax('https://opentdb.com/api.php', {
                data: params,
                success: console.log('AJAX call successful!'),
                error: function(request, errorType, errorMessage) {
                    alert('Error: ' + errorType + ' with message: ' + errorMessage);
                }
            });
        },
    
        // Populates the DOM with the ajax response:
        "populateQuestions": function(response) {
            $.each(response.results, function(index, result) {
                
                // decode the answers for comparison later on.
                var correctAnswer = result.correct_answer;
                correctAnswer = Utils.htmlDecoder(correctAnswer);
                console.log('correct answer: ',correctAnswer);
                console.log('correct answer type: ', typeof(correctAnswer));
                for(i=0;i<result.incorrect_answers.length;i++) {
                    result.incorrect_answers[i] = Utils.htmlDecoder(result.incorrect_answers[i]);
                };
    
                var lookup = 'question'+index;
                correctAnswers[lookup] = correctAnswer;
                // define <li> for each question:
                var trivQuestion = $('<li id="'+lookup+'" class="question"></li>');
                $('<div class="difficulty-card"></div><div class="question-body"></div>').appendTo(trivQuestion);
                var questionBody = trivQuestion.children('.question-body');
                $('<p class="category-identifier"><i>'+result.category+'</i></p>').appendTo(questionBody);
                $('<p class="question-text"><b>'+result.question+'</b></p>').appendTo(questionBody);
                // var difficultyCard = trivQuestion.children('.difficulty-card');

                if (result.difficulty == "hard") {
                    trivQuestion.addClass('hard');
                    // difficultyCard.addClass('hard');
                    // difficultyCard.html('H\nA\nR\nD')
                } else if(result.difficulty == "medium") {
                    trivQuestion.addClass('medium');
                    // difficultyCard.addClass('medium')
                    // difficultyCard.html('MEDIUM')
                } else {
                    trivQuestion.addClass('easy');
                    // difficultyCard.addClass('easy')
                    // difficultyCard.addClass('EASY')
                }
    
                // generate <ul> for answers:
                var answerList = $('<ul class="answer-list"></ul>');
    
                // Populate answer <li>'s with .correct and .incorrect classes:
                var answerArray = []
                answerArray.push($('<li class="answer clickable"><b>'+result.correct_answer+'</b></li>'));
                for(i=0;i<result.incorrect_answers.length;i++) {
                    answerArray.push($('<li class="answer clickable"><b>'+result.incorrect_answers[i]+'</b></li>'));
                }
    
                // Shuffle answer <li>'s for display:
                //TODO - only shuffle if type='multiple', else force "True" to be first displayed.
                answerArray.sort(function() { return 0.5 - Math.random() });
    
                for(i=0;i<answerArray.length;i++) {
                    answerArray[i].appendTo(answerList);
                }
    
                // append .answers-list <ul> to the original question <li> item
                answerList.appendTo(questionBody);
    
                // append question <li> item to <ul> .question-list
                trivQuestion.appendTo('.question-list');
            });
            // TODO move the below into the validation
            $('.bottom-button-wrapper').html('<button class="check-answers">Check Answers</button>');
        },

        // Applies class to a clicked answer:
        "selectAnswer": function(){
            $(this).closest('.answer-list').children("li").removeClass('answer-selected');
            $(this).addClass('answer-selected');
        },

        // Checks the user-selected answer for correctness:
        "checkAnswers": function() {
            // Check if valid, ie: checks that at least one "type" checkbox is checked.
            var validAnswerSelection = Utils.checkAnswersAreValid();
            if(validAnswerSelection == false) {
                return;
            };
        
            // for each answer object...
            $('.question').each(function() {
                var questionID = $(this).attr('id');
                var selectedAnswerElement = $(this).find('.answer-selected');
                var selectedAnswer = selectedAnswerElement.text();

                // ...find correct answer and assign tick to it:
                $(this).find('.answer').each(function() {
                    $(this).removeClass('clickable');
                    if($(this).text() === correctAnswers[questionID]) {
                        $('<b class="tick-mark">&#10004</b>').appendTo($(this));
                        $(this).attr('id', 'correct-answer')
                    }
                });

                // if the user selects the correct answer, assign '.proven-correct class', else assign '.proven-incorrect':
                if(selectedAnswer === correctAnswers[questionID]) {
                    selectedAnswerElement.addClass('proven-correct')
                    correctCounter++;
                } else {
                    selectedAnswerElement.addClass('proven-incorrect')
                    $('<b class="cross-mark">&#10008</b>').appendTo(selectedAnswerElement)
                }
                totalCounter++;
                
                // assign .unselected-answer class to grey out other answers.
                siblings = selectedAnswerElement.siblings();
                siblings.addClass('unselected-answer');
        
            });
                $('.wrapper-counter').html('<div id="counter">'+correctCounter+' answers correct out of '+totalCounter+'!</div>');
                $('.bottom-button-wrapper').html('');
                //make the below a transition fadein instead?
                setTimeout(function(){$('.bottom-button-wrapper').html('<button class="more-questions">Load More Questions</button>')}, 1000);
        },

    };
})();