# AdeptListBot
Simple JS Bot to dynamically retrieve Achievement stats from Steam's public Web API and display completion lists to the requestor.

Utilizes documentation example code from discord.js. Requires the following to operate:

- Discord Application created with message permissions to read/write to your channels.
- config.json file located in the repo directory (AdeptListBot) which has the following items:
    - token: found on discord developer portal for app.
    - clientId: found on discord developer portal for app.
    - guildId: found by right clicking the server you installed the application on and selecting 'Copy Server ID'.
    - steamWebAPIToken: created by registering an API key with steam.
- Node.JS installed (I used v24.12.0).

To run the bot:
- Use the command "node ." from the root directory of this repo with the command terminal of choice.

To sync/update command logic:
- Use the command "node ./src/deploy-commands.js" to run the deploy-commands script and register your commands with the discord API.

Questions and concerns can be emailed to thomascampbell427@gmail.com