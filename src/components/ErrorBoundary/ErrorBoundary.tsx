/* ----------------
  ErrorBoundary
---------------- */

import { Component } from "react";

interface ComponentState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component {
  state: ComponentState;

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // In production, log to external service instead of console
    if (process.env.NODE_ENV === 'development') {
      console.error(error, errorInfo);
    }
    // TODO: Add error reporting service (e.g., Sentry)
  }

  render() {
    return this.state.hasError
      ? // TODO
        // @ts-ignore
        "ERROR!"
      : this.props.children;
  }
}
