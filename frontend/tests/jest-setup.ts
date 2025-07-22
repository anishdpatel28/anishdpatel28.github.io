// Mock GSAP and ScrollTrigger for all tests
jest.mock('gsap', () => {
  const gsap = {
    fromTo: () => {},
    to: () => {},
    timeline: () => ({ fromTo: () => {}, to: () => {}, }),
    registerPlugin: () => {},
  };
  return { ...gsap, default: gsap };
});
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { getAll: () => [], kill: () => {} },
}));

// Mock browser APIs to speed up tests and avoid unnecessary event handling
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});
window.addEventListener = jest.fn();
window.removeEventListener = jest.fn(); 