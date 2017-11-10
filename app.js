var restify = require('restify');
var builder = require('botbuilder');
//var savedListPrompt = require('./savedListPrompt');
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

// From the examples start
var meaningOfLife = require('./meaningOfLife'); 
26 
 
27 // Setup bot and define root waterfall 
28 var connector = new builder.ConsoleConnector().listen(); 
29 var bot = new builder.UniversalBot(connector, [ 
30     function (session) { 
31         // Ask user the meaning of life 
32         meaningOfLife.beginDialog(session); 
33     }, 
34     function (session, results) { 
35         // Check their answer 
36         if (results.response) { 
37             session.send("That's correct! You are wise beyond your years..."); 
38         } else { 
39             session.send("Sorry you couldn't figure it out. Everyone knows that the meaning of life is 42."); 
40         } 
41     } 
42 ]); 
43 
 
44 // Create prompts 
45 meaningOfLife.create(bot); 


