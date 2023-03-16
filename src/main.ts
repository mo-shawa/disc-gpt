import { Client, ClientOptions } from 'discord.js';
import { token } from "./private/token.json"; // Todo - create bot in discord dev portal and add token

const client = new Client({
  intents: []
}); // Todo - specify options depending on scope of project

client.login(token);

client.once('ready', () => {
  console.log(`Bot is running - ${client.user?.tag}`);
})

/**
 * Here is the syntax for having the bot watch for a message to initate an interaction:
 * 
 * client.on('messageCreate', async (message) => {
 *   if (message.author.username.toLowerCase() === 'nrtz') {
 *    return await message.reply('rat');
 *  }
 *  return;
 * });
 * 
 */

/**
 * Here is the syntax for having the bot watch for an 'interaction' (user entered command):
 * 
 * client.on('interactionCreate', async (interaction) => {
 *  if (!interaction.isCommand()) return;
 *  
 *  if (interaction.commandName === "commandname") {
 *    ----- command logic goes here -----
 *  }
 * });
 */