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

require('dotenv-extended').load();
const restify = require('restify');
const bot = require('./bot.js');

const server = restify.createServer();
server.post('/api/messages', bot.connector('*').listen());
server.listen(process.env.PORT || 3978, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

