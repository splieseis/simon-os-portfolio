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

export const setBootStatus = (status: boolean) => isBooting.set(status);

export const openApp = (id: string) => {
  activeAppId.set(id);
};

export const closeApp = () => {
  activeAppId.set(null);
};