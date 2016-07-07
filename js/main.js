$(document).ready(function() {

    $('#hints').hide();
    $('#input').hide();

    function Quiz() {
        var quiz;
        $.getJSON('people.json', function (data) {
            quiz = data.quiz;
            console.log(quiz);

        });

        var counter = 0;

        $('form input').on('keypress', function(e) {
            return e.which !== 13;
        });


        this.next_hint = function() {

            $('#hints').fadeIn();
            $('#input').fadeIn();
            
            $('#next-hint').prop('disabled', true);

            var hintCounter = $('#hints > .hint').length,
                nextHint = quiz[counter]['hints'][hintCounter],
                hint = $('#hint-template > .hint').clone().html(nextHint);


            if (hintCounter == quiz[counter]['hints'].length) {

                this.next_person();

            } else {

                $('#hints').append(hint);

            }

            $('#next-hint').prop('disabled', false);

        };

        this.check_name = function () {

            if (quiz[counter]['name'] == $('#inputName').val().toLowerCase()) {

                alert('you are correct!');

                this.next_person();

                $('input:text').val('');

            } else {

                alert('nope try again!');

            }
        };

        this.next_person = function () {

            if (counter !== quiz.length-1) {

                counter = counter+1;

                var nextPersonHint = quiz[counter]['hints'][0],
                    hint = $('#hint-template > .hint').clone().html(nextPersonHint);

                $('#hints').html(hint);

            } else {

                if(!alert('this is the end of the game! sorry you ran out of hints and people')){

                    window.location.reload();

                }
            }

        };


    }

    var theQuiz = new Quiz();

    $('#startQuiz').click(function(){
        theQuiz.next_hint();
        setTimeout(function () {
            $('#start').fadeOut();
        }, 500)
    })

    $('#next-hint').click(function(){
        theQuiz.next_hint();
    })

    $('#guess').click(function(){
        theQuiz.check_name();
    })


});




