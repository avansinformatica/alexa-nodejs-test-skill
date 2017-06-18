module.change_code = 1;
'use strict';

var alexa = require('alexa-app');
var app = new alexa.app('test-skill');

app.launch(function(request, response) {
    response
        .say('Welcome to your test skill. Say a number between one and one hundred, and I will echo it back to you.')
        .reprompt('If you want me to say a number, you have to tell me which one...')
        .shouldEndSession(false);
});

app.error = function(exception, request, response) {
    console.log(exception)
    console.log(request);
    console.log(response);
    response.say('Sorry an error occured ' + error.message);
};

app.intent('sayNumber', {
        "slots": {
            "number": "NUMBER"
        },
        "utterances": [
            "say the number {1-100|number}",
            "give me the number {!-100|number}",
            "tell me the number {!-100|number}",
            "I want to hear you say the number {!-100|number}"
        ]
    },
    function(request, response) {
        var number = request.slot('number');
        response
            .say("You asked for the number " + number)
            .shouldEndSession(false, "Do you want another number?");
    });

app.intent("AMAZON.StopIntent", {
    "slots": {},
    "utterances": []
}, function(request, response) {
    var stopOutput = "Don't You Worry. I'll be back."
    response.say(stopOutput)
    return
});

module.exports = app;