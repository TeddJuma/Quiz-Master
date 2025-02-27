function Header({ onNavigate }) {
    try {
        return (
            <header className="floating-nav" data-name="header">
                <div className="px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center" data-name="header-logo">
                            <i className="fas fa-brain text-purple-600 text-2xl mr-2"></i>
                            <h1 className="text-xl font-bold text-gray-100">Quiz Master</h1>
                        </div>
                        <nav className="flex space-x-4" data-name="header-nav">
                            <button 
                                onClick={() => onNavigate('setup')}
                                className="text-gray-300 hover:text-purple-500 transition-colors"
                                data-name="header-nav-home">
                                <i className="fas fa-home mr-1"></i> 
                                <span className="hidden md:inline">Home</span>
                            </button>
                            <button 
                                onClick={() => onNavigate('profile')}
                                className="text-gray-300 hover:text-purple-500 transition-colors"
                                data-name="header-nav-profile">
                                <i className="fas fa-user mr-1"></i> 
                                <span className="hidden md:inline">Profile</span>
                            </button>
                            <button 
                                onClick={() => onNavigate('leaderboard')}
                                className="text-gray-300 hover:text-purple-500 transition-colors"
                                data-name="header-nav-leaderboard">
                                <i className="fas fa-trophy mr-1"></i> 
                                <span className="hidden md:inline">Leaderboard</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
