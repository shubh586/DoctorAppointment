import { useState } from 'react';
import { Button, Card, Input, Modal, Badge, Spinner, SkeletonCard } from '../Components/ui';

/**
 * Component Showcase Page
 * Demonstrates all UI components and design system
 */
const ComponentShowcase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-heading">
                        UI Component Showcase
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Beautiful, accessible, and reusable components for your doctor appointment system
                    </p>
                </div>

                {/* Buttons Section */}
                <Card padding="lg" className="animate-fade-in-up">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Buttons</h2>
                    <div className="space-y-6">
                        {/* Variants */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Variants</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="danger">Danger</Button>
                                <Button variant="success">Success</Button>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>

                        {/* States */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">States</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button loading>Loading</Button>
                                <Button disabled>Disabled</Button>
                            </div>
                        </div>

                        {/* With Icons */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">With Icons</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    leftIcon={
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                        </svg>
                                    }
                                >
                                    Add Appointment
                                </Button>
                                <Button
                                    variant="outline"
                                    rightIcon={
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Cards Section */}
                <Card padding="lg" className="animate-fade-in-up">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card hover="lift" padding="md" shadow="sm">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lift on Hover</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                This card lifts when you hover over it
                            </p>
                        </Card>

                        <Card hover="glow" padding="md" shadow="md">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Glow on Hover</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                This card glows with primary color
                            </p>
                        </Card>

                        <Card hover="scale" padding="md" shadow="lg">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Scale on Hover</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                This card scales up slightly
                            </p>
                        </Card>
                    </div>
                </Card>

                {/* Inputs Section */}
                <Card padding="lg" className="animate-fade-in-up">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Inputs</h2>
                    <div className="space-y-4 max-w-md">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            helperText="We'll never share your email"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            state="default"
                        />

                        <Input
                            label="Success State"
                            type="text"
                            value="Valid input"
                            state="success"
                            helperText="Looks good!"
                        />

                        <Input
                            label="Error State"
                            type="text"
                            value="Invalid"
                            state="error"
                            errorText="This field is required"
                        />

                        <Input
                            placeholder="Search..."
                            leftIcon={
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                    </div>
                </Card>

                {/* Badges Section */}
                <Card padding="lg" className="animate-fade-in-up">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Badges</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Appointment Status</h3>
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="pending">Pending</Badge>
                                <Badge variant="confirmed">Confirmed</Badge>
                                <Badge variant="completed">Completed</Badge>
                                <Badge variant="cancelled">Cancelled</Badge>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">General States</h3>
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="default">Default</Badge>
                                <Badge variant="primary">Primary</Badge>
                                <Badge variant="success">Success</Badge>
                                <Badge variant="warning">Warning</Badge>
                                <Badge variant="error">Error</Badge>
                                <Badge variant="info">Info</Badge>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</h3>
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge size="sm" variant="primary">Small</Badge>
                                <Badge size="md" variant="primary">Medium</Badge>
                                <Badge size="lg" variant="primary">Large</Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Loading States */}
                <Card padding="lg" className="animate-fade-in-up">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Loading States</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Spinners</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                <Spinner size="sm" className="text-primary" />
                                <Spinner size="md" className="text-primary" />
                                <Spinner size="lg" className="text-primary" />
                                <Spinner size="xl" className="text-primary" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Skeleton Loaders</h3>
                            <SkeletonCard />
                        </div>
                    </div>
                </Card>

                {/* Modal Section */}
                <Card padding="lg" className="animate-fade-in-up">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Modal</h2>
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Example Modal"
                        size="md"
                        footer={
                            <>
                                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                                    Confirm
                                </Button>
                            </>
                        }
                    >
                        <p className="text-gray-600 dark:text-gray-300">
                            This is a beautiful modal with smooth animations, backdrop blur, and dark mode support.
                        </p>
                    </Modal>
                </Card>

                {/* Footer */}
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <p>Built with React, TailwindCSS, and Framer Motion</p>
                </div>
            </div>
        </div>
    );
};

export default ComponentShowcase;
