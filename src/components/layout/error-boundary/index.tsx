import React, {Component, ErrorInfo, ReactNode} from 'react';
// import {ErrorScreen} from '@/screens';
import type {IErrorBoundaryProps, IBoundaryState} from './types';
import ErrorScreen from '@/screens/error';

class ErrorBoundary extends Component<IErrorBoundaryProps, IBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(_error: Error): IBoundaryState {
    return {hasError: true};
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {}

  private resetState = (): void => {
    this.setState({hasError: false});
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorScreen resetError={this.resetState} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
