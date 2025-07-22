require('@testing-library/jest-dom');
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('act')
  ) {
    return;
  }
  originalError(...args);
}; 