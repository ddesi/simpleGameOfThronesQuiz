$(document).ready(function() {

    $('#hints').hide();
    $('#input').hide();

    function Quiz() {
        var quiz;
        $.getJSON('people.json', function (data) {
            quiz = data.quiz;
            console.log(quiz);

        });

        var counter = 0,
            clicks = 0;

        $('form input').on('keypress', function(e) {
            return e.which !== 13;
        });

        $('input:text').click(
            function(){
                $(this).val('');
            }
        );


        this.next_hint = function() {

            $('#hints').fadeIn();
            $('.hint').fadeIn();
            $('#input').fadeIn();

            console.log(counter);
            console.log($('#hints > .hint').length);
            clicks = clicks+1;
            console.log('these are the clicks: ' + clicks);

            var hints = quiz[counter]['hints'],
                hintCounter = $('#hints > .hint').length,
                nextHint = hints[hintCounter],
                finalHintImage = quiz[counter]['hints'][quiz[counter]['hints'].length-1],
                hint = $('#hint-template > .hint').clone().html(nextHint),
                hintImg = $('#hint-template > .hint-img').clone().attr('src',finalHintImage);

            if (hintCounter == hints.length-1 && clicks !== hints.length+1) {

                $('.hint-img').fadeIn();
                $('#hints').append(hintImg);
                alert('this is the last hint! guess a name or let s move on');

            } else if(hintCounter == hints.length-1 && clicks == hints.length+1 && counter !== quiz.length-1){

                if (!alert('too bad! on to the next person!')) {

                    this.next_person();
                    clicks = 1;

                }

            } else if(hintCounter == hints.length-1 && clicks == hints.length+1 && counter == quiz.length-1) {

                if (!alert('no more people to show! bye')) {

                    window.location.reload();

                }

            } else {

                $('.hint').fadeIn();
                $('#hints').append(hint);
            }

        };

        this.check_name = function () {

            if (quiz[counter]['name'] == $('#inputName').val().toLowerCase()) {

                alert('correct name! on to the next person');
                this.next_person();

            } else {

                alert('nope try again!');

            }
        };

        this.next_person = function () {
            if(counter !== quiz.length-1){

                counter = counter+1;
                console.log('this is the counter ' + counter);

                var nextPersonHint = quiz[counter]['hints'][0],
                    hint = $('#hint-template > .hint').clone().html(nextPersonHint);

                $('.hint').fadeIn();
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
    })

    $('#next-hint').click(function(){
        theQuiz.next_hint();
    })

    $('#guess').click(function(){
        theQuiz.check_name();
    })


});




