import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

interface SkillsSectionProps {
  mode?: 'dark' | 'light';
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ mode = 'dark' }) => {

  const programmingLanguages = [
    {
      name: 'Python', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
          alt="Python"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'JavaScript', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
          alt="JavaScript"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'Java', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
          alt="Java"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'C', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
          alt="C"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'C++', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
          alt="C++"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'HTML5', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
          alt="HTML5"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'CSS', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
          alt="CSS"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    }
  ];

  const frameworks = [
    {
      name: 'React', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
          alt="React"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'Django', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg"
          alt="Django"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'NodeJS', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
          alt="NodeJS"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'OpenAPI', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg"
          alt="OpenAPI"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    }
  ];

  const tools = [
    {
      name: 'PostgreSQL', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
          alt="PostgreSQL"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'SQL', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
          alt="SQL"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'Docker', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
          alt="Docker"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'Git', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
          alt="Git"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'GitHub', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
          alt="GitHub"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'CircleCI', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/circleci/circleci-plain.svg"
          alt="CircleCI"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'VS Code', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
          alt="VS Code"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'Jira', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg"
          alt="Jira"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'Figma', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
          alt="Figma"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    },
    {
      name: 'Postman', icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
          alt="Postman"
          style={{ width: 40, height: 40, display: 'block' }}
        />
      )
    }
  ];

  const renderSkillCategory = (title: string, skills: typeof programmingLanguages, className: string) => (
    <Box className={className}>
      <Typography variant="h6" sx={{
        color: mode === 'dark' ? '#e0e1dd' : '#1b263b',
        mb: 3,
        fontWeight: 600,
        textAlign: 'left'
      }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {skills.map((skill) => (
          <Tooltip key={skill.name} title={skill.name} arrow>
            <Box sx={{
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.08)' : 'rgba(27, 38, 59, 0.15)',
              border: '2px solid rgba(224, 225, 221, 0.3)',
              fontSize: 40,
              color: '#e0e1dd',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.15)',
                backgroundColor: mode === 'dark' ? 'rgba(224, 225, 221, 0.18)' : 'rgba(27, 38, 59, 0.25)',
              }
            }}>
              {skill.icon ? skill.icon : (
                <Box sx={{ width: 40, height: 40, background: mode === 'dark' ? 'rgba(224,225,221,0.15)' : 'rgba(27,38,59,0.2)', borderRadius: 1 }} />
              )}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 1, md: 3 } }}>
      <Typography
        className="skills-title"
        variant="h3"
        sx={{ color: mode === 'dark' ? '#e0e1dd' : '#1b263b', mb: 4, fontWeight: 600, textAlign: 'center' }}
      >
        Skills & Technologies
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {renderSkillCategory('Programming Languages', programmingLanguages, 'skill-category')}
        {renderSkillCategory('Frameworks & Libraries', frameworks, 'skill-category')}
        {renderSkillCategory('Tools & Technologies', tools, 'skill-category')}
      </Box>
    </Box>
  );
};

export default SkillsSection; 