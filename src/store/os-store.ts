import { atom } from 'nanostores';

export const isBooting = atom(true);

export interface WindowState {
  id: string;
  title: string;
  type: 'component' | 'iframe' | 'markdown';
  content: string;
  isMinimized: boolean;
  zIndex: number;
}

export const openWindows = atom<WindowState[]>([]);
export const activeWindowId = atom<string | null>(null);

export const setBootStatus = (status: boolean) => isBooting.set(status);

export const openWindow = (window: WindowState) => {
  const current = openWindows.get();
  if (current.find(w => w.id === window.id)) {
    setActiveWindow(window.id);
    return;
  }
  
  const maxZ = Math.max(0, ...current.map(w => w.zIndex));
  openWindows.set([...current, { ...window, zIndex: maxZ + 1 }]);
  activeWindowId.set(window.id);
};

export const closeWindow = (id: string) => {
  openWindows.set(openWindows.get().filter(w => w.id !== id));
};

export const setActiveWindow = (id: string) => {
  activeWindowId.set(id);
};