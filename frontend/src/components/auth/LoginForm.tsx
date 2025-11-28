import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../utils/validation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, clearError } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const onSubmit = async (data: LoginFormData) => {
        await dispatch(login(data));
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center theme-background transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-6 right-6">
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="theme-icon-button theme-floating-button rounded-full p-3"
                    title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.003 8.003 0 1 0 10.586 10.586z" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="max-w-md w-full space-y-8">
                <div className="theme-surface border theme-border rounded-3xl shadow-2xl p-10 transition-colors duration-300">
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 bg-gradient-to-br from-indigo-100/70 to-purple-100/70 rounded-2xl mb-4">
                            <svg className="w-12 h-12 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-extrabold gradient-text">
                            Welcome Back!
                        </h2>
                        <p className="mt-2 text-sm theme-text-muted">
                            Access your workspace
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {error && (
                            <div className="rounded-xl border border-red-400/70 bg-red-500/10 p-4 text-sm font-medium text-red-500">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium theme-text">
                                    Username
                                </label>
                                <input
                                    {...register('username')}
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    className={`mt-1 block w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 sm:text-sm transition-all theme-input ${errors.username
                                            ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                                            : 'focus:ring-indigo-200 focus:border-indigo-500'
                                        }`}
                                    placeholder="Your username"
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium theme-text">
                                    Password
                                </label>
                                <input
                                    {...register('password')}
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={`mt-1 block w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 sm:text-sm transition-all theme-input ${errors.password
                                            ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                                            : 'focus:ring-indigo-200 focus:border-indigo-500'
                                        }`}
                                    placeholder="Your password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <div className="spinner mr-3"></div>
                                        Authenticating...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm theme-text-muted">
                                Need an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-semibold gradient-text hover:underline transition-colors"
                                >
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

