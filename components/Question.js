function Question({ question, onAnswer }) {
    try {
        const [selectedAnswer, setSelectedAnswer] = React.useState(null);
        const [showFeedback, setShowFeedback] = React.useState(false);

        if (!question) {
            return (
                <div className="card text-center" data-name="question-loading">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-10 bg-gray-700 rounded"></div>
                            <div className="h-10 bg-gray-700 rounded"></div>
                            <div className="h-10 bg-gray-700 rounded"></div>
                            <div className="h-10 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
            );
        }

        const handleAnswerSelect = (answer) => {
            setSelectedAnswer(answer);
            setShowFeedback(true);
            setTimeout(() => {
                setShowFeedback(false);
                onAnswer(answer === question.correct_answer);
                setSelectedAnswer(null);
            }, 2000);
        };

        const getAnswerClass = (answer) => {
            if (!selectedAnswer) return '';
            if (answer === question.correct_answer) return 'correct';
            if (answer === selectedAnswer) return 'incorrect';
            return '';
        };

        return (
            <div className="question-card card" data-name="question">
                <h3 
                    className="text-xl font-semibold mb-4 text-gray-100"
                    data-name="question-text"
                    dangerouslySetInnerHTML={{ __html: question.question }}>
                </h3>
                <div className="space-y-2" data-name="answer-options">
                    {question.answers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => !selectedAnswer && handleAnswerSelect(answer)}
                            className={`answer-option w-full text-left text-gray-100 ${
                                selectedAnswer === answer ? 'selected' : ''
                            } ${getAnswerClass(answer)}`}
                            disabled={!!selectedAnswer}
                            dangerouslySetInnerHTML={{ __html: answer }}>
                        </button>
                    ))}
                </div>
                {showFeedback && (
                    <div 
                        className={`feedback ${
                            selectedAnswer === question.correct_answer ? 'correct' : 'incorrect'
                        }`}
                        data-name="feedback">
                        {selectedAnswer === question.correct_answer ? (
                            <p>Correct! Well done!</p>
                        ) : (
                            <p>
                                Incorrect. The correct answer is: 
                                <span dangerouslySetInnerHTML={{ __html: question.correct_answer }}></span>
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Question component error:', error);
        reportError(error);
        return null;
    }
}
