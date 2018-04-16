// TODO: Make this an ajax call, executed in the .then() chain IF category is specified.
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


    var Utils = {
    "getFormData": function() {
        var formData = {};
        
        // Number
        var questionNumber = $('.question-number').val();
        formData['amount'] = questionNumber;

        // Difficulty
        // console.log('selected difficulty: '+$('.question-difficulty').val());
        // var questionDifficulty = $('input[name=question-difficulty]:checked');
        // console.log('checked radio: '+questionDifficulty);
        // if ($('.question-difficulty').val() != 'any') {
        //     formData['difficulty'] = questionDifficulty;
        // };

        // Type
        var questionType = "multiple";  // explicit for now, TODO: handle boolean responses.
        formData['type'] = questionType;
        //if($(<type>).val() != <any>) {
        //    <var questionType = $(<type>).val()>
        //    formData.append(questionType);
        //};

        console.log(formData);
        return formData;
    },

    "getQuestions": function(options) {
        var params = $.extend({ "amount": 10 }, options);
        return $.ajax('https://opentdb.com/api.php', {
            data: params,
            success: console.log('ajax call successful'),
            error: function(request, errorType, errorMessage) {
                alert('Error: ' + errorType + ' with message: ' + errorMessage);
            }
        }
    )},

    "populateQuestions": function(response) { // use an each to loop over returned questions and generate html
        $.each(response.results, function(index, result) {
            
            // define <li> for each question:
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
            var answerArray = [
            $('<li class="correct-answer"><b>'+result.correct_answer+'</b></li>'),
            $('<li class="incorrect-answer"><b>'+result.incorrect_answers[0]+'</b></li>'),
            // TO DO: handle true/false case:
            //if(result.type == 'multiple') {
            //  answerArray.push($('<li class="incorrect-answer"><b>'+result.incorrect_answers[1]+'</b></li>'));
            //  answerArray.push($('<li class="incorrect-answer"><b>'+result.incorrect_answers[2]+'</b></li>'));
            //}
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
        
    }
};