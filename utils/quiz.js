function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function calculateScore(correct, total) {
    return Math.round((correct / total) * 100);
}

function getAchievementBadge(score) {
    if (score >= 90) return { name: 'Quiz Master', icon: 'fa-crown' };
    if (score >= 80) return { name: 'Expert', icon: 'fa-star' };
    if (score >= 70) return { name: 'Scholar', icon: 'fa-graduation-cap' };
    if (score >= 60) return { name: 'Apprentice', icon: 'fa-user-graduate' };
    return { name: 'Participant', icon: 'fa-award' };
}
