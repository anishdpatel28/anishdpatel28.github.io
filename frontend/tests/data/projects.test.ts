import { projects, Project } from '../../src/data/projects';

describe('Projects Data', () => {
  it('should have 4 projects', () => {
    expect(projects.length).toBe(4);
  });

  it('each project should have required fields', () => {
    projects.forEach((project: Project) => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.shortDescription).toBeTruthy();
      expect(project.fullDescription).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.year).toBeTruthy();
      expect(project.status).toBeTruthy();
      expect(project.category).toBeTruthy();
      expect(project.color).toBeTruthy();
      expect(project.features.length).toBeGreaterThan(0);
    });
  });

  it('should have the pacman AI project', () => {
    const pacmanAI = projects.find(p => p.id === 'pacman-ai');
    expect(pacmanAI).toBeDefined();
    expect(pacmanAI?.title).toBe('Pacman AI Projects');
    expect(pacmanAI?.category).toBe('AI/ML');
  });

  it('should have the sentiment analysis project', () => {
    const sentiment = projects.find(p => p.id === 'sentiment-analysis');
    expect(sentiment).toBeDefined();
    expect(sentiment?.title).toBe('Sentiment Analysis for Portfolio Optimization');
    expect(sentiment?.category).toBe('AI/ML');
  });

  it('should have the college marketplace project', () => {
    const marketplace = projects.find(p => p.id === 'college-marketplace');
    expect(marketplace).toBeDefined();
    expect(marketplace?.title).toBe('College Marketplace');
    expect(marketplace?.category).toBe('Web Development');
  });

  it('should have the scary racing game project', () => {
    const racing = projects.find(p => p.id === 'scary-racing-game');
    expect(racing).toBeDefined();
    expect(racing?.title).toBe('Scary Racing Game');
    expect(racing?.category).toBe('Game Development');
  });
});

