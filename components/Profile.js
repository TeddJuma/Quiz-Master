function Profile() {
    try {
        const [profile, setProfile] = React.useState(null);

        React.useEffect(() => {
            loadProfile();
        }, []);

        const loadProfile = async () => {
            try {
                const result = await trickleGetObject('profile', 'current-user');
                setProfile(result.objectData);
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        };

        if (!profile) {
            return <div>Loading profile...</div>;
        }

        return (
            <div className="profile-card" data-name="profile">
                <div className="flex items-center mb-6" data-name="profile-header">
                    <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="Profile avatar"
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-gray-600">{profile.level} Level</p>
                    </div>
                </div>
                
                <div className="mb-6" data-name="profile-stats">
                    <h3 className="text-lg font-semibold mb-2">Statistics</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {profile.quizzesTaken}
                            </div>
                            <div className="text-sm text-gray-600">Quizzes Taken</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {profile.averageScore}%
                            </div>
                            <div className="text-sm text-gray-600">Average Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {profile.badges}
                            </div>
                            <div className="text-sm text-gray-600">Badges Earned</div>
                        </div>
                    </div>
                </div>

                <div className="mb-6" data-name="profile-progress">
                    <h3 className="text-lg font-semibold mb-2">Level Progress</h3>
                    <div className="progress-bar">
                        <div 
                            className="progress-bar-fill"
                            style={{ width: `${profile.progress}%` }}>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {profile.progress}% to next level
                    </div>
                </div>

                <div data-name="profile-achievements">
                    <h3 className="text-lg font-semibold mb-2">Recent Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.achievements.map((achievement, index) => (
                            <div key={index} className="badge">
                                <i className={`fas ${achievement.icon} mr-2`}></i>
                                {achievement.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Profile component error:', error);
        reportError(error);
        return null;
    }
}
