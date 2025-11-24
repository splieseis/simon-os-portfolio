export interface AboutMeConfig {
  name?: string;
  tagline?: string;
  bio?: string[];
  currentRole?: string;
  location?: string;
  skills?: string[];
  interests?: string[];
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    website?: string;
    email?: string;
  };
  funFacts?: string[];
}

export const aboutMeConfig: AboutMeConfig = {
  name: 'Max Mustermann',
  tagline: 'Crafting digital experiences, one pixel at a time',
  bio: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  ],
  currentRole: 'Senior Full Stack Developer',
  location: '🌍 San Francisco, CA',
  skills: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Kubernetes',
    'GraphQL',
  ],
  interests: [
    'Open Source',
    'Machine Learning',
    'Photography',
    'Hiking',
    'Reading',
    '3D Printing',
  ],
  socials: {
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
    x: 'https://x.com/example',
    website: 'https://example.com',
    email: 'max.mustermann@example.com',
  },
  funFacts: [
    'Contributed to 50+ open source projects',
    'Built a custom home automation system',
    'Published 3 technical blog posts this year',
    'Love solving complex problems with elegant solutions',
  ],
};

