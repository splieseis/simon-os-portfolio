import type { InventoryItem } from '../types';

export const inventory: InventoryItem[] = [
  {
    id: 'about-simon',
    type: 'experience',
    title: 'About Me',
    description: 'The developer behind the OS.',
    icon: 'user',
    componentKey: 'AboutMe',
  },
  {
    id: 'json-tool',
    type: 'mini-app',
    title: 'JSON Formatter',
    description: 'Prettify ugly JSON.',
    icon: 'braces',
    componentKey: 'JsonFormatter',
  },
  {
    id: 'simon-os-repo',
    type: 'project',
    title: 'SimonOS Source',
    description: 'View the source code on GitHub.',
    icon: 'github',
    link: 'https://github.com/splieseis/simon-os',
  }
];