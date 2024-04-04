const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the quiz!'),
	async execute(interaction) {
        interaction.reply("Quiz Stopped!");
    }
}