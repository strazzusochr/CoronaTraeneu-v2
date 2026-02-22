import '@testing-library/jest-dom';

// Setup Mock for standard browser features used in Three.js/R3F if needed
if (typeof window !== 'undefined') {
    window.URL.createObjectURL = () => '';
    window.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
}
