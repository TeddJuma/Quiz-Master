async function fetchQuizQuestions(category, difficulty) {
    try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }

        const data = await response.json();
        
        return data.results.map(q => ({
            ...q,
            answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        }));
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
    }
}

async function updateUserScore(score) {
    try {
        const profile = await trickleGetObject('profile', 'current-user');
        const updatedProfile = {
            ...profile.objectData,
            quizzesTaken: profile.objectData.quizzesTaken + 1,
            totalScore: profile.objectData.totalScore + score,
            averageScore: Math.round(
                ((profile.objectData.totalScore + score) / (profile.objectData.quizzesTaken + 1)) * 100
            ) / 100
        };
        
        await trickleUpdateObject('profile', 'current-user', updatedProfile);
        
        // Update leaderboard
        const leaderboardEntry = {
            name: profile.objectData.name,
            score: updatedProfile.averageScore,
            quizzesTaken: updatedProfile.quizzesTaken
        };
        
        await trickleCreateObject('leaderboard', leaderboardEntry);
    } catch (error) {
        console.error('Error updating user score:', error);
        throw error;
    }
}
