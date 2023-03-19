import { Client, GatewayIntentBits } from "discord.js"
import { token } from "./private/token.json"
import { promptCompletion, chatCompletion } from "./api/GPT"

const { Guilds, GuildMessages } = GatewayIntentBits

const client = new Client({
	intents: [Guilds, GuildMessages],
})

client.login(token)

client.once("ready", () => {
	console.log(`Bot is running - ${client.user?.tag}`)
})

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return

	if (interaction.commandName === "prompt") {
		const prompt = interaction.options.get("prompt")!.value

		await interaction.deferReply()

		const res = await promptCompletion(prompt)

		await interaction.editReply(prompt + "```\n" + res + "\n```")
	}

	if (interaction.commandName === "chat") {
		const res = await chatCompletion([])
		await interaction.reply(res)
	}
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
