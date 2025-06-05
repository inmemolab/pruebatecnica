/**
 * @proyect PruebaTecnica
 * @file navigation/navigationRef.ts
 * @description Utilidades de navegación para la aplicación
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo contiene funciones y utilidades para manejar la navegación en la aplicación.
 * Utiliza React Navigation y proporciona una interfaz para navegar entre pantallas.
 */

/** @import libraries */
import {createNavigationContainerRef, StackActions, CommonActions} from "@react-navigation/native";

/** @import navigation */
import {RootStackParamList, RouteScreens} from "./routes";

/**
 * @constant navigationRef
 * @description Referencia al contenedor de navegación
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * @function navigate
 * @description Navega a una pantalla específica
 * @param {keyof RootStackParamList} name - Nombre de la pantalla
 * @param {RootStackParamList[T]} params - Parámetros opcionales
 * @example
 * navigate(RouteScreens.Detail, { id: '1', title: 'Elemento 1' });
 */
export function navigate<T extends keyof RootStackParamList>(name: T, params?: RootStackParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
}

/**
 * @function navigateWithAnimation
 * @description Navega a una pantalla con animación personalizada
 * @param {keyof RootStackParamList} name - Nombre de la pantalla
 * @param {RootStackParamList[T]} params - Parámetros opcionales
 * @param {string} animation - Tipo de animación ('slide_from_right', 'slide_from_bottom', 'fade', 'flip')
 * @example
 * navigateWithAnimation(RouteScreens.Detail, { id: '1' }, 'slide_from_bottom');
 */
export function navigateWithAnimation<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
  animation: 'slide_from_right' | 'slide_from_bottom' | 'fade' | 'flip' = 'slide_from_right'
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

/**
 * @function navigateToDetail
 * @description Navega a la pantalla de detalle con animación elegante
 * @param {number} id - ID del producto
 * @example
 * navigateToDetail(1);
 */
export function navigateToDetail(id: number) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(RouteScreens.Detail, { id });
  }
}

/**
 * @function navigateToMain
 * @description Navega a la pantalla principal con animación suave
 * @example
 * navigateToMain();
 */
export function navigateToMain() {
  if (navigationRef.isReady()) {
    navigationRef.navigate(RouteScreens.Main);
  }
}

/**
 * @function reset
 * @description Reinicia el estado de navegación
 * @param {any} state - Nuevo estado de navegación
 * @example
 * reset({
 *   index: 0,
 *   routes: [{ name: RouteScreens.Main }]
 * });
 */
export function reset(state: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}

/**
 * @function navigateAndReset
 * @description Navega a una pantalla y reinicia la pila de navegación
 * @param {keyof RootStackParamList} name - Nombre de la ruta
 * @param {RootStackParamList[T]} params - Parámetros de la ruta
 * @example
 * navigateAndReset(RouteScreens.Main);
 */
export function navigateAndReset<T extends keyof RootStackParamList>(name: T, params?: RootStackParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name, params}]
    });
  }
}

/**
 * @function goBack
 * @description Navega hacia atrás con animación suave
 * @example
 * goBack();
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

/**
 * @function goBackWithDelay
 * @description Navega hacia atrás con un pequeño delay para mejor UX
 * @param {number} delay - Delay en milisegundos (por defecto 100ms)
 * @example
 * goBackWithDelay(200);
 */
export function goBackWithDelay(delay: number = 100) {
  setTimeout(() => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }, delay);
}

/**
 * @function replace
 * @description Reemplaza la pantalla actual con animación fade
 * @param {keyof RootStackParamList} name - Nombre de la ruta
 * @param {RootStackParamList[T]} params - Parámetros de la ruta
 * @example
 * replace(RouteScreens.Main);
 */
export function replace<T extends keyof RootStackParamList>(name: T, params?: RootStackParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

/**
 * @function replaceWithAnimation
 * @description Reemplaza la pantalla actual con animación personalizada
 * @param {keyof RootStackParamList} name - Nombre de la ruta
 * @param {RootStackParamList[T]} params - Parámetros de la ruta
 * @param {string} animation - Tipo de animación
 * @example
 * replaceWithAnimation(RouteScreens.Main, undefined, 'fade');
 */
export function replaceWithAnimation<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
  animation: 'fade' | 'slide_from_bottom' = 'fade'
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

/**
 * @function push
 * @description Agrega una nueva pantalla a la pila de navegación
 * @param {keyof RootStackParamList} name - Nombre de la ruta
 * @param {RootStackParamList[T]} params - Parámetros de la ruta
 * @example
 * push(RouteScreens.Detail, { id: '2', title: 'Elemento 2' });
 */
export function push<T extends keyof RootStackParamList>(name: T, params?: RootStackParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

/**
 * @function getCurrentRoute
 * @description Obtiene la ruta actual
 * @returns {Route<string> | undefined} Ruta actual
 * @example
 * const currentRoute = getCurrentRoute();
 * console.log('Ruta actual:', currentRoute?.name);
 */
export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
  return undefined;
}

/**
 * @function canGoBack
 * @description Verifica si se puede navegar hacia atrás
 * @returns {boolean} true si se puede navegar hacia atrás
 * @example
 * if (canGoBack()) {
 *   goBack();
 * }
 */
export function canGoBack(): boolean {
  if (navigationRef.isReady()) {
    return navigationRef.canGoBack();
  }
  return false;
}

/**
 * @function dispatch
 * @description Ejecuta una acción de navegación personalizada
 * @param {any} action - Acción de navegación
 * @example
 * dispatch(StackActions.popToTop());
 */
export function dispatch(action: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}

/**
 * @function animateTransition
 * @description Ejecuta una transición animada personalizada
 * @param {Function} callback - Función a ejecutar después de la animación
 * @param {number} duration - Duración de la animación en ms
 * @example
 * animateTransition(() => navigate(RouteScreens.Main), 300);
 */
export function animateTransition(callback: () => void, duration: number = 300) {
  // Pequeño delay para permitir que la animación se complete
  setTimeout(callback, duration);
}
