export type ItemType = 'project' | 'mini-app' | 'experience' | 'recipe' | 'writing' | 'social';

export interface InventoryItem {
  id: string;
  type: ItemType;
  title: string;
  description?: string;
  icon: string;
  color?: string;
  link?: string;
  componentKey?: string;
  tags?: string[];
  date?: string; 
  featured?: boolean;
}

export interface SiteConfig {
  title: string;
  description: string;
  email: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}