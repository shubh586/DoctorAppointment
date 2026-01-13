import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Button Component with multiple variants, sizes, and states
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" size="sm" loading>Loading...</Button>
 */
const Button = forwardRef(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            loading = false,
            disabled = false,
            leftIcon = null,
            rightIcon = null,
            className = '',
            ...props
        },
        ref
    ) => {
        // Base styles
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        // Variant styles
        const variantStyles = {
            primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm hover:shadow-md',
            secondary: 'bg-medical-blue text-white hover:bg-medical-blue-dark focus:ring-medical-blue shadow-sm hover:shadow-md',
            outline: 'border-2 border-primary text-primary hover:bg-primary-light focus:ring-primary',
            ghost: 'text-primary hover:bg-primary-light focus:ring-primary',
            danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
            success: 'bg-medical-green text-white hover:bg-medical-green-dark focus:ring-medical-green shadow-sm hover:shadow-md',
        };

        // Size styles
        const sizeStyles = {
            sm: 'px-3 py-1.5 text-sm gap-1.5',
            md: 'px-4 py-2 text-base gap-2',
            lg: 'px-6 py-3 text-lg gap-2.5',
        };

        const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

        return (
            <button
                ref={ref}
                className={combinedClassName}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin h-4 w-4"
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
                )}
                {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                {children}
                {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
};

export default Button;
