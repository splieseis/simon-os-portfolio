export interface CVConfig {
  name?: string;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
  };
  summary?: string[];
  experience?: Array<{
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    description?: string[];
    achievements?: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    location?: string;
    year?: string;
    description?: string[];
  }>;
  skills?: Record<string, string[]>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date?: string;
    credentialId?: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies?: string[];
    link?: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
}

export const cvConfig: CVConfig = {
  name: 'Max Mustermann',
  contact: {
    email: 'max.mustermann@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://maxmustermann.com',
  },
  summary: [
    'Experienced full-stack developer with 8+ years of expertise in building scalable web applications and leading technical teams.',
    'Passionate about clean code, modern architecture patterns, and mentoring the next generation of developers.',
    'Strong background in both frontend and backend technologies with a focus on performance optimization and user experience.',
  ],
  experience: [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      startDate: '2021',
      endDate: 'Present',
      description: [
        'Lead development of customer-facing web applications serving 1M+ users using React, TypeScript, and Node.js.',
        'Architected and implemented microservices infrastructure reducing system latency by 60%.',
        'Collaborate with cross-functional teams to define technical requirements and deliver high-quality solutions.',
      ],
      achievements: [
        'Reduced page load times by 45% through performance optimization initiatives',
        'Mentored 5 junior developers, improving team productivity by 30%',
        'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      location: 'Remote',
      startDate: '2018',
      endDate: '2021',
      description: [
        'Developed and maintained multiple client projects using modern JavaScript frameworks and cloud services.',
        'Built RESTful APIs and GraphQL endpoints serving mobile and web applications.',
        'Participated in code reviews and established best practices for the development team.',
      ],
      achievements: [
        'Delivered 15+ client projects on time and within budget',
        'Improved code quality by implementing automated testing, reducing bugs by 50%',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      startDate: '2016',
      endDate: '2018',
      description: [
        'Built responsive user interfaces using React and modern CSS frameworks.',
        'Collaborated with designers to implement pixel-perfect UI components.',
        'Optimized application performance and improved user experience metrics.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      location: 'California, USA',
      year: '2016',
      description: [
        'Graduated Magna Cum Laude',
        'Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems',
      ],
    },
  ],
  skills: {
    'Frontend': ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Sass'],
    'Backend': ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB'],
    'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    'Tools': ['Git', 'Webpack', 'Vite', 'Jest', 'Cypress', 'Figma'],
  },
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-CSA-12345',
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022',
    },
    {
      name: 'Certified Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022',
    },
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Built a scalable e-commerce platform handling 100K+ daily transactions with real-time inventory management',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
      link: 'https://github.com/example/ecommerce',
    },
    {
      name: 'Real-time Chat Application',
      description: 'Developed a real-time messaging app with WebSocket support, file sharing, and end-to-end encryption',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      link: 'https://github.com/example/chat-app',
    },
    {
      name: 'Analytics Dashboard',
      description: 'Created an interactive analytics dashboard with data visualization and custom reporting features',
      technologies: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL'],
    },
  ],
  languages: [
    { language: 'German', proficiency: 'Native' },
    { language: 'English', proficiency: 'Professional' }
  ],
};

