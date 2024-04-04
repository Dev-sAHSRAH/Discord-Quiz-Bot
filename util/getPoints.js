const getPoints = function getPoints(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 10;
        case 'medium':
            return 20;
        case 'hard':
            return 30;
        default:
            return 0;
    }
}

module.exports = {getPoints}