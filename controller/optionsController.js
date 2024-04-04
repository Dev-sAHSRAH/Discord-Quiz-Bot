const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getPoints } = require("../util/getPoints");

async function handleOptionAnswer(channel,interaction,question,streakCount,totalPoints){
    const optionsRow = new ActionRowBuilder();
                    for (let j = 0; j < question.options.length; j++) {
                        const button = new ButtonBuilder()
                            .setCustomId(`option_${j}`)
                            .setLabel(question.options[j])
                            .setStyle(ButtonStyle.Primary);
                        optionsRow.addComponents(button);
                    }
                    const response = await channel.send({ content: question.question, components: [optionsRow] });
                    const collectorFilter = res => {
                        return res.user.id === interaction.user.id;
                    };
    
                    try {
                        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
                        const selectedOption = parseInt(confirmation.customId.split('_')[1], 10);
                        const correctOption = question.answer;
                        confirmation.update({})
                        if (selectedOption === correctOption) {
                            const points = getPoints(question.difficulty);
                            await channel.send(`Correct! You earned ${points} points.`);
                            totalPoints += points
                            streakCount++;
                            if(streakCount%3==0){
                                await channel.send(`You have answered 3 questions right in a row 🔥 +5 Bonus Points!`)
                            }
                        } else {
                            streakCount = 0;
                            await channel.send(`Wrong answer!, The correct answer is option: ${question.options[correctOption]}`);
                        }
                    } catch (e) {
                        console.log("option:",e);
                        await channel.send({ content: 'Answer not received within 10secs, cancelling', components: [] });
                    }    
                    return {streakCount,totalPoints};
}

module.exports = {handleOptionAnswer}