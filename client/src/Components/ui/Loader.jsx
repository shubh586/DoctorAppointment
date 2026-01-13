import PropTypes from 'prop-types';

/**
 * Spinner Loader Component
 */
export const Spinner = ({ size = 'md', className = '' }) => {
    const sizeStyles = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    return (
        <svg
            className={`animate-spin ${sizeStyles[size]} ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
};

Spinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    className: PropTypes.string,
};

/**
 * Skeleton Loader for Text
 */
export const SkeletonText = ({ lines = 3, className = '' }) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton"
                    style={{ width: index === lines - 1 ? '80%' : '100%' }}
                />
            ))}
        </div>
    );
};

SkeletonText.propTypes = {
    lines: PropTypes.number,
    className: PropTypes.string,
};

/**
 * Skeleton Loader for Card
 */
export const SkeletonCard = ({ className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
            <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full skeleton" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded skeleton w-1/2" />
                </div>
            </div>
            <SkeletonText lines={2} />
        </div>
    );
};

SkeletonCard.propTypes = {
    className: PropTypes.string,
};

/**
 * Skeleton Loader for Avatar
 */
export const SkeletonAvatar = ({ size = 'md', className = '' }) => {
    const sizeStyles = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
        xl: 'h-24 w-24',
    };

    return (
        <div className={`${sizeStyles[size]} bg-gray-200 dark:bg-gray-700 rounded-full skeleton ${className}`} />
    );
};

SkeletonAvatar.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    className: PropTypes.string,
};

/**
 * Full Page Loader
 */
export const PageLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <Spinner size="xl" className="text-primary mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
        </div>
    );
};

/**
 * Default export
 */
const Loader = {
    Spinner,
    SkeletonText,
    SkeletonCard,
    SkeletonAvatar,
    PageLoader,
};

export default Loader;
