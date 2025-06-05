/**
 * @proyect PruebaTecnica
 * @file navigation/AppNavigator.tsx
 * @description Componente principal de navegación de la aplicación
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este componente maneja la lógica de navegación y renderizado condicional basado en el estado de la aplicación.
 * Utiliza React Navigation para gestionar la navegación y ErrorBoundary para manejar errores.
 */

/** @import libraries */
import React, {useEffect} from "react";
import {Platform, StatusBar} from "react-native";

/** @import navigation */
import {RootNavigator} from "./RootNavigator";
import {navigationRef} from "./navigationRef";

/** @import components */
import ErrorBoundary from "@global/utils/ErrorBoundary";
import AppErrorScreen from "@screens/AppErrorScreen";

/**
 * @function AppNavigator
 * @description Componente principal que maneja la navegación y el estado global de la aplicación
 */
const AppNavigator: React.FC = () => {
  const errorHandler = (error: Error, stackTrace: React.ErrorInfo) => {
    console.error("❌ ---> AppNavigator - Boundary error:", error);
    console.error("🔍 ---> AppNavigator - Boundary stackTrace:", stackTrace);
  };

  useEffect(() => {
    // Listener para cambios de estado de navegación
    const unsubscribe = navigationRef.addListener('state', () => {
      // Log de navegación en desarrollo
      if (__DEV__) {
        const currentRoute = navigationRef.getCurrentRoute();
        console.log('📱 ---> Navigation changed to:', currentRoute?.name);
      }
    });

    // Configuración específica por plataforma
    if (Platform.OS === 'android') {
      // Configurar StatusBar para Android
      StatusBar.setBackgroundColor('#4338ca', true);
      StatusBar.setBarStyle('light-content', true);
    }

    return unsubscribe;
  }, []);

  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={AppErrorScreen}>
      <RootNavigator />
    </ErrorBoundary>
  );
};

export default AppNavigator;
