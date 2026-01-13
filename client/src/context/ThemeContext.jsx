import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Create Theme Context
const ThemeContext = createContext();

// Hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

/**
 * Theme Provider Component
 * Manages theme state (light/dark) with localStorage persistence
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }

        setMounted(true);
    }, []);

    // Update document attribute when theme changes
    useEffect(() => {
        if (mounted) {
            const root = document.documentElement;

            // Remove old theme
            root.removeAttribute('data-theme');
            root.classList.remove('light', 'dark');

            // Add new theme
            root.setAttribute('data-theme', theme);
            root.classList.add(theme);

            // Persist to localStorage
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    // Toggle theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Set specific theme
    const setLightTheme = () => setTheme('light');
    const setDarkTheme = () => setTheme('dark');

    const value = {
        theme,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
        isDark: theme === 'dark',
    };

    // Prevent flash of wrong theme on initial load
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeContext;
