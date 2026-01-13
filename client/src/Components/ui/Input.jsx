import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Enhanced Input Component with validation states, icons, and helper text
 * 
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email"
 *   state="default"
 * />
 */
const Input = forwardRef(
    (
        {
            label,
            type = 'text',
            placeholder,
            helperText,
            errorText,
            state = 'default',
            leftIcon,
            rightIcon,
            className = '',
            containerClassName = '',
            required = false,
            ...props
        },
        ref
    ) => {
        // Base input styles
        const baseStyles = 'w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white';

        // State-based styles
        const stateStyles = {
            default: 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary',
            success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
            error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        };

        // Icon container styles
        const iconStyles = 'absolute top-1/2 transform -translate-y-1/2 text-gray-400';

        const combinedInputClassName = `${baseStyles} ${stateStyles[state]} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`;

        return (
            <div className={`w-full ${containerClassName}`}>
                {/* Label */}
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                {/* Input Container */}
                <div className="relative">
                    {/* Left Icon */}
                    {leftIcon && (
                        <div className={`${iconStyles} left-3`}>
                            {leftIcon}
                        </div>
                    )}

                    {/* Input */}
                    <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        className={combinedInputClassName}
                        required={required}
                        {...props}
                    />

                    {/* Right Icon */}
                    {rightIcon && (
                        <div className={`${iconStyles} right-3`}>
                            {rightIcon}
                        </div>
                    )}
                </div>

                {/* Helper Text / Error Text */}
                {(helperText || errorText) && (
                    <p
                        className={`mt-1.5 text-sm ${state === 'error' || errorText
                                ? 'text-red-500'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {errorText || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    errorText: PropTypes.string,
    state: PropTypes.oneOf(['default', 'success', 'error']),
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    required: PropTypes.bool,
};

export default Input;
