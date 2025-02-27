function Timer({ timeLeft, maxTime }) {
    try {
        const getTimerClass = () => {
            if (timeLeft <= 5) return 'timer danger';
            if (timeLeft <= 10) return 'timer warning';
            return 'timer';
        };

        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        return (
            <div className={getTimerClass()} data-name="question-timer">
                <i className="fas fa-clock mr-2"></i>
                {formatTime(timeLeft)}
            </div>
        );
    } catch (error) {
        console.error('Timer component error:', error);
        reportError(error);
        return null;
    }
}
