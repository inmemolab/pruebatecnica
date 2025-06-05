/**
 * @proyect PruebaTecnica
 * @file jest.setup.js
 * @description Configuración global de Jest para pruebas unitarias en React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo configura Jest para pruebas unitarias en un proyecto de React Native.
 * Incluye mocks para módulos comunes de React Native, así como configuraciones globales
 * para el entorno de pruebas.
 */

/** @import libraries */
import "@testing-library/jest-native/extend-expect";
import {jest} from "@jest/globals";

// Mock para react-native
jest.mock("react-native", () => ({
  Platform: {
    OS: "ios",
    select: jest.fn((obj) => obj.ios)
  },
  Alert: {
    alert: jest.fn()
  },
  NativeModules: {},
  NativeEventEmitter: jest.fn(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))
}));

// Mock para react-native-reanimated
jest.mock("react-native-reanimated", () => ({
  useAnimatedStyle: () => ({}),
  useSharedValue: jest.fn(),
  withTiming: jest.fn(),
  withSpring: jest.fn(),
  withSequence: jest.fn(),
  withDelay: jest.fn(),
  withRepeat: jest.fn(),
  Value: jest.fn()
}));

// Mock para react-native-gesture-handler
jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
  State: {}
}));

// Configuración global para pruebas
if (typeof window !== "undefined") {
  global.window = window;
}
global.console = {
  ...console,
  // Ignora los mensajes de log durante las pruebas
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn()
};

/**
 * @function setupJestMocks
 * @description Configuración global de mocks para todas las pruebas
 */
beforeAll(() => {
  // Configuración adicional antes de todas las pruebas
  jest.useFakeTimers();
});

/**
 * @function cleanupJestMocks
 * @description Limpieza después de cada prueba
 */
afterEach(() => {
  // Limpiar todos los mocks
  jest.clearAllMocks();
  jest.clearAllTimers();
});

/**
 * @function globalTeardown
 * @description Limpieza global después de todas las pruebas
 */
afterAll(() => {
  // Restaurar timers reales
  jest.useRealTimers();
});
