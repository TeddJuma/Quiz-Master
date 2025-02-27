function Leaderboard() {
    try {
        const [leaderboard, setLeaderboard] = React.useState([]);

        React.useEffect(() => {
            loadLeaderboard();
        }, []);

        const loadLeaderboard = async () => {
            try {
                const result = await trickleListObjects('leaderboard', 10, true);
                setLeaderboard(result.items.map(item => item.objectData));
            } catch (error) {
                console.error('Error loading leaderboard:', error);
            }
        };

        return (
            <div className="card" data-name="leaderboard">
                <h2 className="text-2xl font-bold mb-4">Top Players</h2>
                <div className="space-y-2" data-name="leaderboard-list">
                    {leaderboard.map((player, index) => (
                        <div 
                            key={index}
                            className="leaderboard-item"
                            data-name={`leaderboard-item-${index}`}>
                            <span className="leaderboard-rank">{index + 1}</span>
                            <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`}
                                alt={`${player.name}'s avatar`}
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <div className="flex-1">
                                <div className="font-semibold">{player.name}</div>
                                <div className="text-sm text-gray-600">
                                    Score: {player.score} | Quizzes: {player.quizzesTaken}
                                </div>
                            </div>
                            {index < 3 && (
                                <i className={`fas fa-trophy text-${
                                    index === 0 ? 'yellow' : 
                                    index === 1 ? 'gray' : 'orange'
                                }-500`}></i>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Leaderboard component error:', error);
        reportError(error);
        return null;
    }
}
