import { colorTypes } from '@styles/theme';
import { ReactNode } from 'react';

declare module ButtonTypes {
  export interface IButtonProps {
    onClick?: (_event: unknown) => void;
    onClickCapture?: (_event: unknown) => void;
    children: ReactNode;
    disabled?: boolean;
    w?: string;
    h?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
    minW?: string;
    minH?: string;
    bg?: colorTypes;
    brR?: string; // border-radius
    color?: colorTypes;
    outline?: boolean;
    outlineColor?: colorTypes;
    fontFamily?: string;
    fontWeight?: number;
    state?: 'danger' | 'warning';
    active?: boolean;
    activeBg?: string;
    hover?: boolean;
    badgeValue?: number | string;
  }
}