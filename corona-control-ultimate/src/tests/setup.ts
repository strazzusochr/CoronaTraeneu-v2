import '@testing-library/jest-dom';

// Mocks für Browser APIs die in Node nicht existieren
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Canvas Mock (für Three.js Komponenten)
HTMLCanvasElement.prototype.getContext = () => null;

const __origWarn = console.warn;
console.warn = (...args: any[]) => {
  const msg = args[0];
  if (typeof msg === 'string' && msg.includes('Multiple instances of Three.js')) {
    return;
  }
  __origWarn(...args);
};
