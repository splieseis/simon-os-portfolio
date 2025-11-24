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
  /** Identifies items that ARE categories (e.g., "mini-apps", "side-hustles") */
  category?: string;
  /** Identifies which category an item BELONGS to */
  categoryId?: string;
  /** Identifies which group(s) an item belongs to (e.g., "personal", "professional", or ["personal", "professional"]) */
  group?: string | string[];
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