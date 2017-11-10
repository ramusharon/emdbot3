/*-----------------------------------------------------------------------------
This Bot demonstrates how to create a custom prompt the conditionally uses a 
choice() prompt. The user can either pick an option from the list of choices 
or enter a new choice.  The sample also shows how to prompt the user to add
their choice to the list.
# RUN THE BOT:
    Run the bot from the command line using "node app.js" and then type 
    "hello" to wake the bot up.
    
-----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */


var restify = require('restify');
var builder = require('botbuilder');
var savedListPrompt = require('./savedListPrompt');
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


var bot = new builder.UniversalBot(connector, [
    function (session) {
        // Prompt for message to send
        savedListPrompt.beginDialog(session, {
            field: 'savedMessages',
            choicesPrompt: "What message would you like to send? Choose a saved message from the list or enter a new one.",
            noChoicesPrompt: "What message would you like to send to us ?"
        });
    },
    function (session, results) {
        session.send("Sending message: " + results.response);
    }
]);

// Create prompts
savedListPrompt.create(bot);

