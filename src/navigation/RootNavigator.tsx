/**
 * @proyect PruebaTecnica
 * @file navigation/RootNavigator.tsx
 * @description Componente principal de navegación de la aplicación
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @notes
 * Este componente define la estructura de navegación principal de la aplicación,
 * manejando diferentes estados como:
 * - Splash: Pantalla de carga inicial
 * - Main: Flujo principal con lista de elementos
 * - Detail: Pantalla de detalle de elementos
 */

/** @import libraries */
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {Platform} from "react-native";

/** @import navigation */
import {navigationRef} from "./navigationRef";
import {RootStackParamList, RouteScreens} from "./routes";

/** @import screens */
import SplashScreen from "@screens/SplashScreen";
import MainScreen from "@screens/MainScreen";
import DetailScreen from "@screens/DetailScreen";

/** @constant Stack */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * @component RootNavigator
 * @description Componente principal de navegación
 */
export const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={RouteScreens.Splash}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          // Animación por defecto
          animation: "slide_from_right",
          animationDuration: 300,
        }}>

        {/* Splash Screen - Sin animación de entrada, fade out al salir */}
        <Stack.Screen
          name={RouteScreens.Splash}
          component={SplashScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // No permitir gesto para volver
            animation: "fade",
            animationDuration: 500,
            animationTypeForReplace: "pop", // Animación de reemplazo suave
          }}
        />

        {/* Main Screen - Slide elegante desde el splash */}
        <Stack.Screen
          name={RouteScreens.Main}
          component={MainScreen}
          options={{
            headerShown: true,
            title: "Tienda",
            gestureEnabled: false, // No permitir volver al splash
            animation: "slide_from_bottom",
            animationDuration: 400,
            headerStyle: {
              backgroundColor: "#6366f1",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
            headerShadowVisible: true,
            // Animación personalizada del header
            headerTitleAlign: "center",
          }}
        />

        {/* Detail Screen - Presentación modal moderna */}
        <Stack.Screen
          name={RouteScreens.Detail}
          component={DetailScreen}
          options={{
            headerShown: true,
            title: "Detalle del Producto",
            gestureEnabled: true,
            // Animación tipo modal en iOS, slide en Android
            animation: Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
            animationDuration: 350,
            presentation: Platform.OS === "ios" ? "modal" : "card",
            headerStyle: {
              backgroundColor: "#6366f1",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 16,
            },
            headerShadowVisible: true,
            headerTitleAlign: "center",
            // Configuración específica para modal en iOS
            ...(Platform.OS === "ios" && {
              headerLeft: undefined, // En modal no mostrar botón de back automático
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
