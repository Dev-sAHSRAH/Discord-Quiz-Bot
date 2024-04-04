const { promisify } = require('util');
const readFileAsync = promisify(require('fs').readFile);
async function getQuestion() {
    const fileContent = await readFileAsync("questions.json", 'utf8');
    const questions = JSON.parse(fileContent);
    return questions;
}

module.exports = getQuestion;