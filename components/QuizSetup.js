function QuizSetup({ onStart }) {
    try {
        const [category, setCategory] = React.useState('9');
        const [difficulty, setDifficulty] = React.useState('easy');

        const categories = [
            { id: '9', name: 'General Knowledge' },
            { id: '17', name: 'Science & Nature' },
            { id: '21', name: 'Sports' },
            { id: '23', name: 'History' }
        ];

        const difficulties = ['easy', 'medium', 'hard'];

        const handleStart = () => {
            onStart({ category, difficulty });
        };

        return (
            <div className="card" data-name="quiz-setup">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Quiz Setup</h2>
                <div className="mb-4" data-name="category-select">
                    <label className="form-label">Select Category:</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select">
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4" data-name="difficulty-select">
                    <label className="form-label">Select Difficulty:</label>
                    <select 
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="form-select">
                        {difficulties.map(diff => (
                            <option key={diff} value={diff}>
                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <button 
                    onClick={handleStart}
                    className="btn-primary w-full"
                    data-name="start-quiz-button">
                    Start Quiz
                </button>
            </div>
        );
    } catch (error) {
        console.error('QuizSetup component error:', error);
        reportError(error);
        return null;
    }
}
