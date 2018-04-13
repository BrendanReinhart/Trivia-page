
function returnQuestions(response) { // use an each to loop over questions and generate html
    $.each(response.results, function(index, result) {
        
        // dynamically define <li> for each question:
        var trivQuestion = $('<li class="question"></li>');
        if (result.difficulty == "hard") {
            trivQuestion.addClass('hard')
        } else if(result.difficulty == "medium") {
            trivQuestion.addClass('medium')
        } else {
            trivQuestion.addClass('easy')
        }
        $('<p class="category-identifier"><i>'+result.category+'</i></p>').appendTo(trivQuestion);
        $('<p class="question-text"><b>'+result.question+'</b></p>').appendTo(trivQuestion);

        // generate <ul> for answers:
        var answerList = $('<ul class="answer-list"></ul>');
        // randomise answer order:
        // TO DO: handle true/false case.
        var answerArray = [
        $('<li class="correct-answer"><b>'+result.correct_answer+'</b></li>'),
        $('<li class="incorrect-answer"><b>'+result.incorrect_answers[0]+'</b></li>'),
        $('<li class="incorrect-answer"><b>'+result.incorrect_answers[1]+'</b></li>'),
        $('<li class="incorrect-answer"><b>'+result.incorrect_answers[2]+'</b></li>')
        ];
        answerArray.sort(function() { return 0.5 - Math.random() }); 
        for(i=0;i<answerArray.length;i++) {
            answerArray[i].appendTo(answerList);
        }

        // append answers list <ul> to the original question <li> item
        answerList.appendTo(trivQuestion);
    
        // append question <li> item to <ul> .question-list
        trivQuestion.appendTo('.question-list');
    });
    
};

function getQuestions(options) {
    var params = $.extend({ "amount": 10 }, options);
    return $.ajax('https://opentdb.com/api.php', {
        data: params,
        success: returnQuestions,
        error: function(request, errorType, errorMessage) {
            alert('Error: ' + errorType + ' with message: ' + errorMessage);
        }
    }
)};

// ~~~~~~~~~~ EVENT HANDLERS ~~~~~~~~~~

$('.get-questions').on('click', function() {
    $('.question-list').html('');
    // Move AJAX call to own functions --> getQuestions()
    getQuestions({"amount": 4});
    $('.question-list').fadeIn();
})


/* event handler for the pressing of the answers.
    - make each button pressable in it's entirety;
        - change colour on hover and on click;
    - on click, show text depending on correct or not (call class of li);
    
    ~~~~~~Counter~~~~~~~
    - on click, increment totalAnswers variable and show on screen;
    - on click, if class=="correct-answer", increment correctAnswers variable and show on screen;
*/