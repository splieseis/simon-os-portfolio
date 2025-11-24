import { atom } from 'nanostores';

export const isBooting = atom(true);
export const activeAppId = atom<string | null>(null);

export interface WindowConfig {
  id: string;
  title: string;
  type: 'component' | 'iframe' | 'markdown';
  content: string;
  zIndex: number;
  position?: { top: number; left: number };
  size?: { width: number; height: number };
}

export const openWindows = atom<WindowConfig[]>([]);

export const activeGroup = atom<string | null>(null);
export const activeCategoryTab = atom<string | null>(null);
export const categoryTabHistory = atom<string[]>([]);

export const setBootStatus = (status: boolean) => isBooting.set(status);

export const openApp = (id: string) => {
  activeAppId.set(id);
};

export const closeApp = () => {
  activeAppId.set(null);
};

export const setActiveGroup = (groupId: string | null) => {
  activeGroup.set(groupId);
};

export const setActiveCategoryTab = (categoryId: string | null) => {
  if (categoryId) {
    const history = categoryTabHistory.get();
    if (!history.includes(categoryId)) {
      categoryTabHistory.set([...history, categoryId]);
    }
  }
  activeCategoryTab.set(categoryId);
};

export const closeCategoryTab = () => {
  activeCategoryTab.set(null);
  categoryTabHistory.set([]);
};