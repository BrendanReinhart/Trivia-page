var test = 'test';
var dog = 'dog';
var cat = 'cat';
var wonton = 'wonton';
var tandy = 'tandy';
var ghost = 'ghost is here. woo. Yeah.';
function testUtil(){
    console.log('Utils file loaded.')
    return 2;
}
testUtil();



$('.get-questions').on('click', function() {
    $('.question-list').html('');
    console.log('CLICKED');
    // Move AJAX call to own functions --> getQuestions()
    // getQuestions();
    
    $.ajax('https://opentdb.com/api.php', {
        data: { "amount": 10 },
        success: function(response) { // use an each to loop over questions and generate html
            $.each(response.results, function(index, result) {
                console.log(result);
                console.log('question: '+result.question);
                console.log('correct answer: '+result.correct_answer);
                console.log('INcorrect answers: '+result.incorrect_answers);
                var trivQuestion = $('<li></li>');
                $('<p><b>'+result.question+'</b></p>').appendTo(trivQuestion);

                // define <ol> and populate with possible answers
                var answerList = $('<ul class="answer-list"></ul>');
                // function randNum() {return Math.floor((Math.random()*100))};
                // randNumList = [randNum(), randNum(), randNum(), randNum()];

                var answerArray = [
                $('<li class="correct-answer"><b>'+result.correct_answer+'</b></li>'),
                $('<li class="incorrect-answer"><b>'+result.incorrect_answers[0]+'</b></li>'),
                $('<li class="incorrect-answer"><b>'+result.incorrect_answers[1]+'</b></li>'),
                $('<li class="incorrect-answer"><b>'+result.incorrect_answers[2]+'</b></li>')
                ];
                answerArray.sort(function() { return 0.5 - Math.random() }); // randomise answer order
                for(i=0;i<answerArray.length;i++) {
                    answerArray[i].appendTo(answerList);
                }

                // append answers list to the original <li> item
                answerList.appendTo(trivQuestion);
               
                // append <li> item to <ul> .question-list
                trivQuestion.appendTo('.question-list');
            });
            
        },
        error: function(request, errorType, errorMessage) {
            alert('Error: ' + errorType + ' with message: ' + errorMessage);
        }
    });
    $('.question-list').fadeIn();
})

$('.get-questions').on('click', function() {
    $('.question-list').html('');
    console.log('CLICKED');
    $.ajax('https://opentdb.com/api.php', {
        data: { "amount": 10 },
        success: function(response) { // use an each to loop over questions and generate html
            $.each(response.results, function(index, result) {
                console.log(result);
                console.log('question: '+result.question);
                console.log('correct answer: '+result.correct_answer);
                console.log('INcorrect answers: '+result.incorrect_answers);
                var trivQuestion = $('<li></li>');
                $('<p><b>'+result.question+'</b></p>').appendTo(trivQuestion);

                // define <ol> and populate with possible answers
                var answerList = $('<ul class="answer-list"></ul>');
                // function randNum() {return Math.floor((Math.random()*100))};
                // randNumList = [randNum(), randNum(), randNum(), randNum()];

                var answerArray = [
                $('<li class="correct-answer"><b>'+result.correct_answer+'</b></li>'),
                $('<li class="incorrect-answer"><b>'+result.incorrect_answers[0]+'</b></li>'),
                $('<li class="incorrect-answer"><b>'+result.incorrect_answers[1]+'</b></li>'),
                $('<li class="incorrect-answer"><b>'+result.incorrect_answers[2]+'</b></li>')
                ];
                answerArray.sort(function() { return 0.5 - Math.random() }); // randomise answer order
                for(i=0;i<answerArray.length;i++) {
                    answerArray[i].appendTo(answerList);
                }

                // append answers list to the original <li> item
                answerList.appendTo(trivQuestion);
               
                // append <li> item to <ul> .question-list
                trivQuestion.appendTo('.question-list');
            });
            
        },
        error: function(request, errorType, errorMessage) {
            alert('Error: ' + errorType + ' with message: ' + errorMessage);
        }
    });
    $('.question-list').fadeIn();
})

// ~~~~~~~~~~ EVENT HANDLERS ~~~~~~~~~~



/* event handler for the pressing of the answers.
    - make each button pressable in it's entirety;
        - change colour on hover and on click;
    - on click, show text depending on correct or not (call class of li);
    
    ~~~~~~Counter~~~~~~~
    - on click, increment totalAnswers variable and show on screen;
    - on click, if class=="correct-answer", increment correctAnswers variable and show on screen;
*/