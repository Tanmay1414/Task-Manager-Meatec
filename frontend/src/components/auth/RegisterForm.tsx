import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../utils/validation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register as registerAction, clearError } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [success, setSuccess] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const onSubmit = async (data: RegisterFormData) => {
        const result = await dispatch(registerAction({ username: data.username, password: data.password }));

        if (registerAction.fulfilled.match(result)) {
            setSuccess(true);
            reset();
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
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
                            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-extrabold gradient-text">
                            Join TaskFlow
                        </h2>
                        <p className="mt-2 text-sm theme-text-muted">
                            Start organizing your tasks today
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {error && (
                            <div className="rounded-xl border border-red-400/70 bg-red-500/10 p-4 text-sm font-medium text-red-500">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="rounded-xl border border-emerald-400/70 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-500">
                                Registration successful! Redirecting to login...
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
                                    placeholder="Pick a username"
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
                                    autoComplete="new-password"
                                    className={`mt-1 block w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 sm:text-sm transition-all theme-input ${errors.password
                                            ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                                            : 'focus:ring-indigo-200 focus:border-indigo-500'
                                        }`}
                                    placeholder="Choose a password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium theme-text">
                                    Confirm Password
                                </label>
                                <input
                                    {...register('confirmPassword')}
                                    id="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    className={`mt-1 block w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 sm:text-sm transition-all theme-input ${errors.confirmPassword
                                            ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                                            : 'focus:ring-indigo-200 focus:border-indigo-500'
                                        }`}
                                    placeholder="Verify password"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || success}
                                className="btn-primary w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <div className="spinner mr-3"></div>
                                        Setting up account...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm theme-text-muted">
                                Have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-semibold gradient-text hover:underline transition-colors"
                                >
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;

