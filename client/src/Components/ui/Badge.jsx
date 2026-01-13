import PropTypes from 'prop-types';

/**
 * Badge Component for status indicators
 * 
 * @example
 * <Badge variant="success" size="md">Confirmed</Badge>
 * <Badge variant="pending" size="sm">Pending</Badge>
 */
const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-colors';

    // Variant styles
    const variantStyles = {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        primary: 'bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-light',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    // Size styles
    const sizeStyles = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <span className={combinedClassName}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        'default',
        'primary',
        'success',
        'warning',
        'error',
        'info',
        'pending',
        'confirmed',
        'completed',
        'cancelled',
    ]),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default Badge;
