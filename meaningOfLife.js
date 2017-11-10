1 /*----------------------------------------------------------------------------- 
2 Basic pattern for exposing a custom prompt. The create() function should be 
3 called once at startup and then beginDialog() can be called everytime you 
4 wish to invoke the prompt. 
5 -----------------------------------------------------------------------------*/ 
6 
 
7 var builder = require('botbuilder');
8 
 
9 exports.beginDialog = function (session, options) { 
10     session.beginDialog('meaningOfLife', options || {}); 
11 } 
12 
 
13 exports.create = function (bot) { 
14     var prompt = new builder.IntentDialog() 
15         .onBegin(function (session, args) { 
16             // Save args passed to prompt 
17             session.dialogData.retryPrompt = args.retryPrompt || "Sorry that's incorrect. Guess again. Or do you give up?"; 
18 
 
19             // Send initial prompt 
20             // - This isn't a waterfall so you shouldn't call any of the built-in Prompts. 
21             session.send(args.prompt || "What's the meaning of life?"); 
22         }) 
23         .matches(/(give up|quit|skip|yes)/i, function (session) { 
24             // Return 'false' to indicate they gave up 
25             session.endDialogWithResult({ response: false }); 
26         }) 
27         .onDefault(function (session) { 
28             // Validate users reply. 
29             if (session.message.text == '42') { 
30                 // Return 'true' to indicate success 
31                 session.endDialogWithResult({ response: true }); 
32             } else { 
33                 // Re-prompt user 
34                 session.send(session.dialogData.retryPrompt); 
35             } 
36         }); 
37     bot.dialog('meaningOfLife', prompt); 
38 } 
