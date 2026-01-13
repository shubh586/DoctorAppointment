import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Card Component with hover effects and customizable styling
 * 
 * @example
 * <Card hover="lift" padding="md">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
const Card = forwardRef(
    (
        {
            children,
            hover = 'none',
            padding = 'md',
            shadow = 'sm',
            className = '',
            ...props
        },
        ref
    ) => {
        // Base styles
        const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200';

        // Hover effect styles
        const hoverStyles = {
            none: '',
            lift: 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
            glow: 'hover:shadow-primary cursor-pointer',
            scale: 'hover:scale-[1.02] cursor-pointer',
        };

        // Padding styles
        const paddingStyles = {
            none: '',
            sm: 'p-3',
            md: 'p-4',
            lg: 'p-6',
            xl: 'p-8',
        };

        // Shadow styles
        const shadowStyles = {
            none: '',
            sm: 'shadow-sm',
            md: 'shadow-md',
            lg: 'shadow-lg',
        };

        const combinedClassName = `${baseStyles} ${hoverStyles[hover]} ${paddingStyles[padding]} ${shadowStyles[shadow]} ${className}`;

        return (
            <div ref={ref} className={combinedClassName} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

Card.propTypes = {
    children: PropTypes.node.isRequired,
    hover: PropTypes.oneOf(['none', 'lift', 'glow', 'scale']),
    padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
    shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default Card;
