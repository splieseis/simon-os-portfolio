import type { ComponentType } from 'react';
import { AboutMe } from '../components/react/AboutMe';
import { CV } from '../components/react/CV';

export const AppRegistry: Record<string, ComponentType<Record<string, unknown>>> = {
  AboutMe,
  CV,
  JsonFormatter: () => <div>JSON Tool</div>,
};
