/**
 * @proyect PruebaTecnica
 * @file navigation/routes.ts
 * @description Definición de rutas y tipos para la navegación de la aplicación
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo define las rutas, tipos de parámetros y estructuras de navegación para la aplicación.
 * Es crucial para el tipado estático y la navegación tipo-segura en toda la aplicación.
 */

/** @import libraries */
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";

/**
 * @enum RouteScreens
 * @description Enumeración de todas las pantallas disponibles en la aplicación
 * @example
 * navigation.navigate(RouteScreens.Main);
 */
export enum RouteScreens {
  // System
  AppError = "AppError",
  // Core App Screens
  Splash = "Splash",
  Main = "Main",
  Detail = "Detail"
}

/**
 * @interface RouteItem
 * @description Interfaz para los parámetros comunes de las rutas
 */
export interface RouteItem {
  screenTitle?: string;
  showBack?: boolean;
  goHome?: boolean;
  params?: any;
}

/**
 * @type RootStackParamList
 * @description Tipo para los parámetros de todas las rutas de la aplicación
 */
export type RootStackParamList = {
  // System screens
  [RouteScreens.AppError]: undefined;

  // Core App Screens
  [RouteScreens.Splash]: undefined;
  [RouteScreens.Main]: undefined;
  [RouteScreens.Detail]: {
    id: string;
    title: string;
  };
};

/**
 * @type RootNavigationProp
 * @description Tipo de navegación para toda la aplicación
 */
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
