/**
 * @proyect PruebaTecnica
 * @file ErrorBoundary.tsx
 * @description Componente ErrorBoundary para capturar y manejar errores de React
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React, {Component, ReactNode} from "react";

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  FallbackComponent?: React.ComponentType<{error?: Error; resetError?: () => void}>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Llamar al handler personalizado si existe
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({hasError: false, error: null});
  };

  render() {
    if (this.state.hasError) {
      const {FallbackComponent} = this.props;

      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error || undefined} resetError={this.resetError} />;
      }

      // Fallback por defecto si no se proporciona componente
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
