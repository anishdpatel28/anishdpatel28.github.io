import { theme, sectionBackgrounds } from '../../src/themes/theme';

describe('theme', () => {
  it('should have dark mode enabled', () => {
    expect(theme.palette.mode).toBe('dark');
  });

  it('should have correct primary and secondary colors', () => {
    expect(theme.palette.primary.main).toBe('#415a77');
    expect(theme.palette.secondary.main).toBe('#778da9');
  });

  it('should have correct typography settings', () => {
    expect(theme.typography.fontFamily).toContain('Roboto');
    expect(theme.typography.h1.fontWeight).toBe(600);
  });

  it('should have MuiButton style overrides', () => {
    expect(theme.components?.MuiButton?.styleOverrides?.root).toBeDefined();
  });
});

describe('sectionBackgrounds', () => {
  it('should have a background for each section', () => {
    expect(Object.keys(sectionBackgrounds)).toEqual(
      expect.arrayContaining(['home', 'about', 'skills', 'projects', 'resume', 'contact'])
    );
  });

  it('should use linear-gradient for each section', () => {
    Object.values(sectionBackgrounds).forEach(bg => {
      expect(bg).toContain('linear-gradient');
    });
  });
}); 