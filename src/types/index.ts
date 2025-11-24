export type ItemType = 'project' | 'mini-app' | 'experience' | 'recipe' | 'writing' | 'social';

export type ItemAction = 'link' | 'iframe' | 'component' | 'download';

export interface InventoryItem {
  id: string;
  type: ItemType;
  title: string;
  description?: string;
  icon: string;
  color?: string;
  action?: ItemAction;
  link?: string;
  componentKey?: string;
  downloadPath?: string;
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