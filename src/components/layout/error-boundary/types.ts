import {ReactNode} from 'react';

export interface IErrorBoundaryProps {
  children: ReactNode;
}

export interface IBoundaryState {
  hasError: boolean;
}
