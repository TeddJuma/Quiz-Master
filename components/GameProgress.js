function GameProgress({ currentRound, totalRounds, currentQuestion, totalQuestions, score }) {
    try {
        const progress = ((currentRound - 1) * totalQuestions + currentQuestion) / (totalRounds * totalQuestions) * 100;
        
        return (
            <div className="mb-4" data-name="game-progress">
                <div className="score-display" data-name="score">
                    Score: {score} points
                </div>
                <div className="progress-bar-container" data-name="progress-bar">
                    <div 
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}>
                    </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400" data-name="progress-labels">
                    <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                    <span>Round {currentRound} of {totalRounds}</span>
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameProgress component error:', error);
        reportError(error);
        return null;
    }
}
