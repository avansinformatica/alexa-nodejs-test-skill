module.change_code = 1;
'use strict';

var alexa = require('alexa-app');
var _ = require('lodash');

var app = new alexa.app('test-skill');

var reprompt = 'If you want me to say a number, you have to tell me which one...';

app.launch(function(request, response) {
    response
        .say('Welcome to your test skill. Say a number between one and one hundred, and I will echo it back to you.')
        .reprompt(reprompt)
        .shouldEndSession(false);
});

app.error = function(exception, request, response) {
    console.log('exception = ' + exception)
    console.log('request = ' + request);
    console.log('response = ' + response);
    response.say('Sorry an error occured ' + error.message);
};

app.intent('sayNumber', {
        "slots": {
            "number": "NUMBER"
        },
        "utterances": [
            // "say the number {1-100|number}",
            // "give me the number {!-100|number}",
            // "tell me the number {!-100|number}",
            // "I want to hear you say the number {!-100|number}",
            '{|I want} {|to} {|you} {|to} {|hear|tell|say|give} {|me} the number {!-100|number}'
        ]
    },
    function(request, response) {
        var number = request.slot('number');
        if (_.isEmpty(number)) {
            var prompt = 'I didn\'t hear a number. Ask me a number.';
            response.say(prompt)
                .reprompt(reprompt)
                .shouldEndSession(false);
            return true;
        } else {
            response
                .say("You asked for the number " + number + ". ")
                .shouldEndSession(false, "Do you want another number?");
        }
    });

app.intent('yesIntent', {
        "slots": {
            "yesResponse": "NUMBER"
        },
        "utterances": [
            // "I want to hear you say the number {!-100|number}",
            '{|okay|yes|good|fine|allright|yesResponse}'
        ]
    },
    function(request, response) {
        var answer = request.slot('yesResponse');
        if (_.isEmpty(answer)) {
            var prompt = 'I\'m sorry, I would like to hear a yes or a no.';
            response.say(prompt)
                .reprompt('Are you sure you\'re not going to answer me?')
                .shouldEndSession(false);
            return true;
        } else {
            response
                .say("You said " + answer + ". ")
                .shouldEndSession(false, "Do you want to say more?");
        }
    });


app.intent("AMAZON.StopIntent", {
    "slots": {},
    "utterances": [
        "stop",
        "exit",
        "bye"
    ]
}, function(request, response) {
    var stopOutput = "Don't You Worry. I'll be back."
    response.say(stopOutput)
    return
});

module.exports = app;