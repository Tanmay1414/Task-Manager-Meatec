import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { resetAllTasks } from '../../store/slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import TaskFlowLogo from './Logo';

const NavigationBar = () => {
    const dispatchAction = useAppDispatch();
    const redirectTo = useNavigate();
    const { user: currentUser } = useAppSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    const performLogout = () => {
        dispatchAction(logout());
        dispatchAction(resetAllTasks());
        redirectTo('/login');
    };

    const getUserInitial = () => {
        return currentUser?.username?.slice(0, 1).toUpperCase() || '?';
    };

    return (
        <nav className="gradient-bg shadow-xl transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center py-5">
                    <TaskFlowLogo size="md" />

                    <div className="flex items-center space-x-5">
                        <button
                            onClick={toggleTheme}
                            className="theme-floating-button theme-icon-button rounded-full p-3 text-indigo-600 dark:text-indigo-200"
                            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.003 8.003 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                        <div className="hidden sm:flex items-center space-x-3 theme-user-chip px-4 py-2 rounded-full">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center theme-user-avatar">
                                <span className="text-sm font-bold">
                                    {getUserInitial()}
                                </span>
                            </div>
                            <span className="text-sm font-semibold theme-text">
                                {currentUser?.username}
                            </span>
                        </div>
                        <button
                            onClick={performLogout}
                            className="flex items-center space-x-2 px-5 py-2.5 theme-logout-button rounded-full font-semibold"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;

