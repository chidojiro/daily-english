import React from 'react';
import { withRouter } from 'react-router';

export class ErrorBoundaryWrapped extends React.Component<any, any> {
  componentDidCatch() {
    this.props.history.push('/');
  }

  render() {
    return this.props.children;
  }
}

export const ErrorBoundary = withRouter(ErrorBoundaryWrapped);