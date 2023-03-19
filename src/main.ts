import { Client, GatewayIntentBits } from "discord.js"
import { token } from "./private/token.json" // Todo - create bot in discord dev portal and add token
import { promptEngine } from "./api/GPT"

const { Guilds, GuildMessages } = GatewayIntentBits

const client = new Client({
	intents: [Guilds, GuildMessages],
}) // Todo - specify options depending on scope of project

client.login(token)

client.once("ready", () => {
	console.log(`Bot is running - ${client.user?.tag}`)
})

client.on("interactionCreate", async (interaction) => {
	console.log("entered interaction")
	if (!interaction.isCommand()) return

	if (interaction.commandName === "test") {
		const prompt = interaction.options.get("prompt")
		console.log("before defer")
		// try ephemeral: true
		await interaction.deferReply()
		console.log("after defer")

		const res = await promptEngine(prompt!.value)
		console.log("after res")

		await interaction.editReply(res as string)
		// try reply if edit doesnt work
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
