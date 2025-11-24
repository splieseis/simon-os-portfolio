export interface GroupConfig {
  id: string;
  label: string;
  description?: string;
}

export type TabStyle = 'silicon-chip' | 'classic' | 'minimal';

export interface TabConfig {
  style: TabStyle;
}

export const tabConfig: TabConfig = {
  style: 'silicon-chip', // 'silicon-chip' | 'classic' | 'minimal'
};

export const groups: GroupConfig[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'personal', label: 'Personal' },
  // { id: 'recipes', label: 'Recipes' },
  // { id: 'blogs', label: 'Blogs' },
];

