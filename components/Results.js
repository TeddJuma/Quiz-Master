function Results({ score, totalQuestions, onRestart }) {
    try {
        const percentage = Math.round((score / totalQuestions) * 100);
        
        return (
            <div className="card text-center" data-name="results">
                <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                <div className="mb-6" data-name="score-display">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                        {score} / {totalQuestions}
                    </div>
                    <div className="text-lg text-gray-600">
                        You scored {percentage}%
                    </div>
                </div>
                <div className="mb-6" data-name="achievement-badges">
                    {percentage >= 80 && (
                        <div className="badge">
                            <i className="fas fa-star mr-2"></i>
                            Excellence Badge
                        </div>
                    )}
                    {percentage >= 50 && (
                        <div className="badge">
                            <i className="fas fa-check-circle mr-2"></i>
                            Completion Badge
                        </div>
                    )}
                </div>
                <button 
                    onClick={onRestart}
                    className="btn-primary"
                    data-name="restart-button">
                    Try Another Quiz
                </button>
            </div>
        );
    } catch (error) {
        console.error('Results component error:', error);
        reportError(error);
        return null;
    }
}
