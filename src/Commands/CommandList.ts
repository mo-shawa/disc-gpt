import { SlashCommandBuilder } from "@discordjs/builders"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { clientId, token, guildId } from "../private/token.json"

// Initialize an array to store the commands
const commands = [
	new SlashCommandBuilder()
		.setName("prompt")
		.setDescription("completion prompt (GPT-3)")
		.addStringOption((input) =>
			input
				.setName("prompt")
				.setDescription("Ask for a haiku")
				.setRequired(true)
		),
	new SlashCommandBuilder()
		.setName("chat")
		.setDescription("conversational prompt (chatGPT)")
		.addStringOption((input) =>
			input
				.setName("prompt")
				.setDescription("have a quick chat")
				.setRequired(true)
		),
].map((command) => command.toJSON())

const rest = new REST({ version: "9" }).setToken(token)

// commands are posted to the bot using a PUT method with the commands as the body
rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log("Successfully registered application commands"))
	.catch(console.error)
