import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

/**
 * Theme Toggle Button Component
 * Animated toggle between light and dark themes
 */
const ThemeToggle = ({ className = '' }) => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    opacity: isDark ? 0 : 1,
                    rotate: isDark ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                    />
                </svg>
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    opacity: isDark ? 1 : 0,
                    rotate: isDark ? 0 : -180,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <svg
                    className="w-5 h-5 text-gray-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            </motion.div>

            {/* Invisible placeholder to maintain button size */}
            <div className="w-5 h-5 opacity-0" />
        </button>
    );
};

export default ThemeToggle;
