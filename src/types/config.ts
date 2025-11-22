export interface InventoryItem {
  id: string;
  title: string;
  type: string;
  icon?: string;
  [key: string]: unknown;
}

export interface SiteConfig {
  title: string;
  description?: string;
  version?: string;
  [key: string]: unknown;
}

