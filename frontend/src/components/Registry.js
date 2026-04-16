import { ActionButton, ActionCard } from '../rxgui/primitives';

/**
 * Component Registry (The Empire's DNA)
 * ------------------------------------
 * Maps Manifest Types to physical React Components.
 */

export const Registry = {
  ActionButton: {
    component: ActionButton,
    defaultProps: {
      label: 'NEW_ACTION',
      variant: 'primary',
    },
    editable: ['label', 'variant', 'intent']
  },
  ActionCard: {
    component: ActionCard,
    defaultProps: {
      title: 'Neural_Node',
      icon: 'Zap'
    },
    editable: ['title', 'icon']
  },
  Container: {
    component: ({ children, style }) => <div style={style}>{children}</div>,
    defaultProps: {},
    editable: ['style']
  }
};
