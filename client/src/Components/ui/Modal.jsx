import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

/**
 * Modal/Dialog Component with backdrop and animations
 * 
 * @example
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
 *   <p>Modal content goes here</p>
 * </Modal>
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    closeOnBackdrop = true,
}) => {
    // Size styles
    const sizeStyles = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={closeOnBackdrop ? onClose : () => { }}
            >
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal Container */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`w-full ${sizeStyles[size]} transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all`}
                            >
                                {/* Header */}
                                {title && (
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-4"
                                    >
                                        {title}
                                    </Dialog.Title>
                                )}

                                {/* Close Button */}
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                    onClick={onClose}
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                {/* Body */}
                                <div className="mt-2 text-gray-600 dark:text-gray-300">
                                    {children}
                                </div>

                                {/* Footer */}
                                {footer && (
                                    <div className="mt-6 flex justify-end gap-3">
                                        {footer}
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
    closeOnBackdrop: PropTypes.bool,
};

export default Modal;
