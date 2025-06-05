/**
 * @proyect PruebaTecnica
 * @file jest.config.js
 * @description Configuración de Jest para pruebas en el proyecto React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo configura Jest para pruebas unitarias en una arquitectura atómica,
 * incluyendo configuraciones para componentes, hooks, helpers y otros elementos.
 */

module.exports = {
  /**
   * @property preset
   * @description Preset base para React Native
   * @type {string}
   */
  preset: "react-native",

  /**
   * @property setupFiles
   * @description Archivos de configuración que se ejecutan antes de las pruebas
   * @type {string[]}
   */
  setupFiles: ["./jest.setup.js"],

  /**
   * @property setupFilesAfterEnv
   * @description Archivos que se ejecutan después de cargar el entorno
   * @type {string[]}
   */
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],

  /**
   * @property moduleFileExtensions
   * @description Extensiones de archivo que Jest buscará
   * @type {string[]}
   */
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  /**
   * @property transformIgnorePatterns
   * @description Patrones de archivos que no deben ser transformados
   * @type {string[]}
   */
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|react-native-logs|react-native-device-info)/)"
  ],

  /**
   * @property moduleNameMapper
   * @description Mapeo de alias para importaciones (sincronizado con tsconfig.json)
   * @type {Object.<string, string>}
   */
  moduleNameMapper: {
    // Alias root
    "^~(.*)$": "<rootDir>/$1",
    // Alias base app
    "^@src/(.*)$": "<rootDir>/src/$1",
    // Alias para atoms
    "^@atoms/(.*)$": "<rootDir>/src/atoms/$1",
    "^@atoms-molecule/(.*)$": "<rootDir>/src/atoms-molecule/$1",
    // Alias para core app
    "^@core-app/(.*)$": "<rootDir>/src/core-app/$1",
    // Alias para navegación
    "^@navigation/(.*)$": "<rootDir>/src/navigation/$1",
    // Alias en global
    "^@global/(.*)$": "<rootDir>/src/global/$1",
    "^@assets/(.*)$": "<rootDir>/src/global/assets/$1",
    "^@fonts/(.*)$": "<rootDir>/src/global/assets/fonts/$1",
    "^@svg/(.*)$": "<rootDir>/src/global/assets/svg/$1",
    "^@theme/(.*)$": "<rootDir>/src/global/theme/$1",
    "^@types/(.*)$": "<rootDir>/src/global/types/$1",
    "^@utils/(.*)$": "<rootDir>/src/global/utils/$1"
  },

  /**
   * @property testEnvironment
   * @description Entorno donde se ejecutarán las pruebas
   * @type {string}
   */
  testEnvironment: "jsdom",

  /**
   * @property testRegex
   * @description Patrón para encontrar archivos de prueba
   * @type {string}
   */
  testRegex: "(/__(tests|specs)__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",

  /**
   * @property collectCoverageFrom
   * @description Archivos de los que se recolectará cobertura
   * @type {string[]}
   */
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts", "!src/**/index.{js,jsx,ts,tsx}", "!src/**/__mocks__/**"],

  /**
   * @property coverageThreshold
   * @description Umbrales mínimos de cobertura
   * @type {Object}
   */
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },

  /**
   * @property testTimeout
   * @description Tiempo máximo de ejecución para cada prueba (en milisegundos)
   * @type {number}
   */
  testTimeout: 10000,

  /**
   * @property verbose
   * @description Muestra información detallada durante la ejecución
   * @type {boolean}
   */
  verbose: true,

  /**
   * @property rootDir
   * @description Directorio raíz del proyecto
   * @type {string}
   */
  rootDir: ".",

  /**
   * @property testPathIgnorePatterns
   * @description Patrones de rutas a ignorar en las pruebas
   * @type {string[]}
   */
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],

  /**
   * @property moduleDirectories
   * @description Directorios donde buscar módulos
   * @type {string[]}
   */
  moduleDirectories: ["node_modules", "src"],

  /**
   * @property transform
   * @description Configuración de transformaciones para diferentes tipos de archivos
   * @type {Object.<string, string>}
   */
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  }
};
