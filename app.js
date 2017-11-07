/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var builder_cognitiveservices = require("botbuilder-cognitiveservices");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// This bot ensures user's profile is up to date.
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.beginDialog('getDetails');
    },
   
]);

var salesData = {
    "Billerica": {
        place: "Billerica",
        park: "Winchestor park"
    },
    "Rockland": {
        place: "Rockland",
        park: "Abington Park"
    },
    "Sanfransisco": {
        place: "Sanfransico",
        park: "Golden Gate Bridge"
    }
};

bot.dialog('getDetails', [
    function (session) {
        builder.Prompts.choice(session, "Where do you want to go?", salesData); 
    },
    function (session, results) {
        if (results.response) {
            var region = salesData[results.response.entity];
            session.send(`I want to go ${region.place} to have fun at ${region.park}.`); 
        } else {
            session.send("OK");
        }
    }
]);

// The dialog stack is cleared and this dialog is invoked when the user enters 'help'.
bot.dialog('umma', function (session, args, next) {
    session.endDialog("This is a bot that can take care my skype, when ever my wife wants to connect. <br/>Please say 'next' to continue");
})
.triggerAction({
    matches: /^umma$/i,
});

// The dialog stack is cleared and this dialog is invoked when the user enters 'help'.
bot.dialog('mcc', function (session, args, next) {
    session.endDialog("Miss you chala chala. <br/>Say again and again");
})
.triggerAction({
    matches: /^mcc$/i,
});

// The dialog stack is cleared and this dialog is invoked when the user enters 'help'.
bot.dialog('Amma', function (session, args, next) {
    session.endDialog("Cheppu. <br/>Emi Chesu unnavu");
})
.triggerAction({
    matches: /^Amma$/i,
});