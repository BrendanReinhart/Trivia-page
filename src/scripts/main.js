// Main logic flow goes here


// ~~~~~~~~~~ EVENT HANDLERS ~~~~~~~~~~

$('.get-questions').on('click', function() {
    $('.question-list').html('');
    var options = Utils.getFormData();

    Utils.getQuestions(options)
    .then(Utils.populateQuestions)
    .catch(function() {
        console.log('error: '+error);
    });
})




/* event handler for the pressing of the answers.
    - make each button pressable in it's entirety;
        - change colour on hover and on click;
    - on click, show text depending on correct or not (call class of li);
    
    ~~~~~~Counter~~~~~~~
    - on click, increment totalAnswers variable and show on screen;
    - on click, if class=="correct-answer", increment correctAnswers variable and show on screen;
*/
