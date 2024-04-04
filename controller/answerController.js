const { getPoints } = require("../util/getPoints");


async function handleTextAnswer(channel,interaction, question,streakCount,totalPoints) {
    await channel.send({ content: question.question, fetchReply: true });
    
    try {
        const collectorFilter = response => {
            return response.author.id === interaction.user.id; 
        };
        const collected = await channel.awaitMessages({
            filter: collectorFilter,
            max: 1,
            time: 30_000
        });
        const repliedAnswer = collected.first().content; 
            
        if(repliedAnswer.toLowerCase() == question.answer.toLowerCase()){
            const points = getPoints(question.difficulty);
            await channel.send(`Correct! You earned ${points} points.`);
            totalPoints += points
            streakCount++;
            if(streakCount%3==0){
                await channel.send(`You have answered 3 questions right in a row 🔥 +5 Bonus Points!`)
                totalPoints+=5;
            }
        }else{
            streakCount = 0;
            await channel.send(`Wrong answer!, The correct answer is: ${question.answer}`);   
        }
            
    } catch (e) {
        await channel.send('Timeout! ⏲️');
    }
    return {streakCount,totalPoints};
}

module.exports = {handleTextAnswer}