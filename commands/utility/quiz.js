const { SlashCommandBuilder} = require('discord.js');
const getQuestion = require('../../util/getQuestions');
const { handleTextAnswer } = require('../../controller/answerController');
const { handleOptionAnswer } = require('../../controller/optionsController');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Starts the quiz!'),
	async execute(interaction) {
        try {
            await interaction.reply('Let the quiz begin!');
            await interaction.followUp('The bot is ready with the questions on your DM! 🚀')
            let totalPoints = 0;
            let streakCount = 0;
            const questions = await getQuestion();
            
            const quizChannel = await interaction.user.createDM();
            
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                await interaction.editReply(`${question.difficulty}`);
                //the below if is for questions where user need to type answer
                if(question.options.length === 0){                  
                    const result = await handleTextAnswer(quizChannel,interaction,question,streakCount,totalPoints);                    
                    streakCount = result.streakCount;
                    totalPoints = result.totalPoints;        
                }else{
                    const result = await handleOptionAnswer(quizChannel,interaction,question,streakCount,totalPoints);
                    streakCount = result.streakCount;
                    totalPoints = result.totalPoints;
                }
                    
            }
            // await interaction.followUp(`Quiz completed! You earned ${totalPoints} points.`);

            await quizChannel.send(`Quiz completed!You earned ${totalPoints} points.`).catch(console.error);

        } catch (error) {
            console.log("err:",error);
        }
	},
};