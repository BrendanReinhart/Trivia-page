// Main logic flow goes here

$(document).ready(function() {
    // Populate Form with categories:
    var totalAnswered = 0;
    $.each(categories.trivia_categories, function(index, category) {
        var categoryOption = $('<option class="questionCategory" value="'+category.id+'">'+category.name+'</option>');
        categoryOption.appendTo($('.question-category'));
    });

});


// Make API call to retrieve questions and populate DOM:
$('.get-questions').on('click', function() {
    $('.top-button-wrapper').html('');
    // Check if valid, ie: checks that at least one "type" checkbox is selected.
    var validForm = Utils.checkFormIsValid();
    if(validForm == false) {return};
    // Clear html of previous questions
    $('.question-list').html('');
    // Get user parameter input:
    var options = Utils.getFormData();
    // Then make call and populate:
    Utils.getQuestions(options)
    .then(Utils.populateQuestions)
    .catch(function(error) {
        console.error('Error: '+error);
    });
})

// ~~~~~~~~~ Event Handlers ~~~~~~~~~

// store data and apply styles when a user clicks on an answer option:
$('.question-list').on('click', '.answer.clickable', Utils.selectAnswer);

// Check if user answers are correct:
$('.bottom-button-wrapper').on('click', '.check-answers', Utils.checkAnswers);

// Summon more questions (after seeing answers):
$('.bottom-button-wrapper').on('click', '.more-questions', function() {
    // Check if valid, ie: checks that at least one "type" checkbox is selected.
    var validForm = Utils.checkFormIsValid();
    if(validForm == false) {return};
    // Clear html of previous questions
    $('.question-list').html('');
    $('.bottom-button-wrapper').html('');
    // Get user parameter input:
    var options = Utils.getFormData();
    // Then make call and populate:
    Utils.getQuestions(options)
    .then(Utils.populateQuestions)
    .catch(function(error) {
        console.error('Error: '+error);
    });
});


/* TODO:    - check all answers are selected before allowing "check answer" button to execute
            - show counter at top of screen.*/