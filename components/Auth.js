function Auth() {
    try {
        const [isLogin, setIsLogin] = React.useState(true);
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            name: ''
        });

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                if (isLogin) {
                    // Login logic
                    const user = await trickleGetObject('users', formData.email);
                    if (user.objectData.password === formData.password) {
                        await trickleUpdateObject('profile', 'current-user', {
                            name: user.objectData.name,
                            email: formData.email,
                            quizzesTaken: 0,
                            totalScore: 0,
                            averageScore: 0,
                            level: 'Beginner',
                            badges: 0,
                            progress: 0,
                            achievements: []
                        });
                        alert('Login successful!');
                    } else {
                        alert('Invalid credentials');
                    }
                } else {
                    // Signup logic
                    await trickleCreateObject('users', {
                        email: formData.email,
                        password: formData.password,
                        name: formData.name
                    });
                    alert('Account created successfully!');
                    setIsLogin(true);
                }
            } catch (error) {
                console.error('Authentication error:', error);
                alert('Authentication failed. Please try again.');
            }
        };

        const handleInputChange = (e) => {
            setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        };

        return (
            <div className="card max-w-md mx-auto" data-name="auth-form">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                            data-name="name-input"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        data-name="email-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        data-name="password-input"
                    />
                    <button 
                        type="submit" 
                        className="btn-primary w-full mb-4"
                        data-name="submit-button">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="btn-secondary w-full"
                    data-name="toggle-auth-mode">
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                </button>
            </div>
        );
    } catch (error) {
        console.error('Auth component error:', error);
        reportError(error);
        return null;
    }
}
