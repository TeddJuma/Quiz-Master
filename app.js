function App() {
    try {
        const [currentView, setCurrentView] = React.useState('setup');
        const [loading, setLoading] = React.useState(false);
        const [quizState, setQuizState] = React.useState({
            questions: [],
            currentQuestion: 0,
            score: 0,
            settings: null,
            currentRound: 1,
            totalRounds: 3,
            timeLeft: 30,
            timerActive: false
        });
        const [timerInterval, setTimerInterval] = React.useState(null);

        React.useEffect(() => {
            return () => {
                if (timerInterval) {
                    clearInterval(timerInterval);
                }
            };
        }, [timerInterval]);

        const startTimer = () => {
            if (timerInterval) clearInterval(timerInterval);
            
            setQuizState(prev => ({
                ...prev,
                timeLeft: 30,
                timerActive: true
            }));

            const interval = setInterval(() => {
                setQuizState(prev => {
                    if (prev.timeLeft <= 1) {
                        clearInterval(interval);
                        handleAnswer(false);
                        return { ...prev, timeLeft: 0, timerActive: false };
                    }
                    return { ...prev, timeLeft: prev.timeLeft - 1 };
                });
            }, 1000);

            setTimerInterval(interval);
        };

        const startQuiz = async (settings) => {
            try {
                setLoading(true);
                const questions = await fetchQuizQuestions(
                    settings.category,
                    settings.difficulty,
                    5 // Update to fetch 5 questions per round
                );
                setQuizState({
                    questions,
                    currentQuestion: 0,
                    score: 0,
                    settings,
                    currentRound: 1,
                    totalRounds: 3,
                    timeLeft: 30,
                    timerActive: true
                });
                setCurrentView('quiz');
                startTimer();
            } catch (error) {
                console.error('Error starting quiz:', error);
                alert('Failed to start quiz. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleAnswer = async (isCorrect) => {
            if (timerInterval) clearInterval(timerInterval);
            
            const newScore = quizState.score + (isCorrect ? 1 : 0);
            
            if (quizState.currentQuestion + 1 >= quizState.questions.length) {
                if (quizState.currentRound >= quizState.totalRounds) {
                    setQuizState(prev => ({ ...prev, score: newScore, timerActive: false }));
                    await updateUserScore(newScore);
                    setCurrentView('results');
                } else {
                    try {
                        setLoading(true);
                        const newQuestions = await fetchQuizQuestions(
                            quizState.settings.category,
                            quizState.settings.difficulty,
                            5 // Update to fetch 5 questions per round
                        );
                        setQuizState(prev => ({
                            ...prev,
                            questions: newQuestions,
                            currentQuestion: 0,
                            score: newScore,
                            currentRound: prev.currentRound + 1,
                            timeLeft: 30,
                            timerActive: true
                        }));
                        startTimer();
                    } catch (error) {
                        console.error('Error loading next round:', error);
                        alert('Failed to load next round. Please try again.');
                        restartQuiz();
                    } finally {
                        setLoading(false);
                    }
                }
            } else {
                setQuizState(prev => ({
                    ...prev,
                    currentQuestion: prev.currentQuestion + 1,
                    score: newScore,
                    timeLeft: 30,
                    timerActive: true
                }));
                startTimer();
            }
        };

        const restartQuiz = () => {
            if (timerInterval) clearInterval(timerInterval);
            setQuizState({
                questions: [],
                currentQuestion: 0,
                score: 0,
                settings: null,
                currentRound: 1,
                totalRounds: 3,
                timeLeft: 30,
                timerActive: false
            });
            setCurrentView('setup');
        };

        const handleNavigation = (view) => {
            if (timerInterval) clearInterval(timerInterval);
            setCurrentView(view);
            if (view === 'setup') {
                restartQuiz();
            }
        };

        const renderView = () => {
            if (loading) {
                return (
                    <div className="card text-center" data-name="loading">
                        <div className="animate-spin text-4xl text-purple-600 mb-4">
                            <i className="fas fa-circle-notch"></i>
                        </div>
                        <p className="text-gray-400">Loading...</p>
                    </div>
                );
            }

            switch (currentView) {
                case 'setup':
                    return <QuizSetup onStart={startQuiz} />;
                case 'quiz':
                    return quizState.questions.length > 0 ? (
                        <div>
                            <div className="round-indicator">
                                Round {quizState.currentRound} of {quizState.totalRounds}
                            </div>
                            <GameProgress 
                                currentRound={quizState.currentRound}
                                totalRounds={quizState.totalRounds}
                                currentQuestion={quizState.currentQuestion}
                                totalQuestions={quizState.questions.length}
                                score={quizState.score}
                            />
                            <Timer 
                                timeLeft={quizState.timeLeft} 
                                maxTime={30}
                            />
                            <Question
                                question={quizState.questions[quizState.currentQuestion]}
                                onAnswer={handleAnswer}
                            />
                        </div>
                    ) : null;
                case 'results':
                    return (
                        <Results
                            score={quizState.score}
                            totalQuestions={quizState.questions.length * quizState.totalRounds}
                            onRestart={restartQuiz}
                        />
                    );
                case 'profile':
                    return <Auth />;
                case 'leaderboard':
                    return <Leaderboard />;
                default:
                    return <QuizSetup onStart={startQuiz} />;
            }
        };

        return (
            <div data-name="quiz-app">
                <Header onNavigate={handleNavigation} />
                <main className="quiz-container">
                    {renderView()}
                </main>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
