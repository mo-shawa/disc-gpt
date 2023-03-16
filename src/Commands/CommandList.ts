import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, token, guildId } from "../private/token.json";

// Initialize an array to store the commands
const commands = [

    new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test command")
        .addStringOption((input) => 
            input
                .setName("param")
                .setDescription("A parameter for the command")
                .setRequired(false)
        ),

].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

// commands are posted to the bot using a PUT method with the commands as the body
rest
    .put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
    .then(() => console.log("Successfully registered application commands"))
    .catch(console.error);