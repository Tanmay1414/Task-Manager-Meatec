import { useId } from 'react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    withText?: boolean;
    textClassName?: string;
}

const sizeMap = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
};

const textSizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
};

const TaskFlowLogo = ({ size = 'md', withText = true, textClassName }: LogoProps) => {
    const gradientId = useId();
    const sparkId = useId();

    return (
        <div className="flex items-center space-x-3">
            <div
                className={`rounded-2xl bg-white/15 backdrop-blur-md p-2 shadow-[0_10px_30px_rgba(15,23,42,0.25)] ${sizeMap[size]}`}
            >
                <svg viewBox="0 0 64 64" className="h-full w-full">
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                        <linearGradient id={sparkId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f9a8d4" />
                            <stop offset="100%" stopColor="#fbcfe8" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredShadow" />
                            <feMerge>
                                <feMergeNode in="coloredShadow" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <rect width="64" height="64" rx="18" fill={`url(#${gradientId})`} />
                    <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 37l8 8 16-20" strokeWidth="5" filter="url(#glow)" />
                        <path d="M20 43c0 0 4 6 12 6s12-5 12-10" strokeWidth="3" opacity="0.35" />
                    </g>
                    <circle cx="22" cy="20" r="5" fill={`url(#${sparkId})`} opacity="0.85" />
                    <circle cx="46" cy="14" r="3" fill="#c4b5fd" opacity="0.7" />
                    <circle cx="48" cy="28" r="2" fill="#e879f9" opacity="0.5" />
                </svg>
            </div>
            {withText && (
                <div className="flex flex-col leading-tight">
                    <span className={`font-extrabold tracking-tight text-white ${textSizeMap[size]} ${textClassName ?? ''}`}>
                        TaskFlow
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-white/70">Task Management</span>
                </div>
            )}
        </div>
    );
};

export default TaskFlowLogo;


