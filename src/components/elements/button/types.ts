import {ReactNode} from 'react';

export interface IButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  width?: number;
}
