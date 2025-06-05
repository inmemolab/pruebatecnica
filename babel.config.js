/**
 * @proyect PruebaTecnica
 * @file babel.config.js
 * @description Configuración de Babel para el proyecto React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo configura Babel para el proyecto, incluyendo presets y plugins.
 * Define también los alias de importación sincronizados con tsconfig.json.
 */

module.exports = {
  /**
   * @property presets
   * @description Presets de Babel para React Native
   * @type {string[]}
   */
  presets: ["module:@react-native/babel-preset"],

  /**
   * @property plugins
   * @description Plugins de Babel utilizados en el proyecto
   * @type {Array<string|Array>}
   */
  plugins: [
    /**
     * Plugin para React Native Reanimated
     * @type {string}
     */
    "react-native-reanimated/plugin",

    /**
     * Plugin para resolver módulos y definir alias (sincronizado con tsconfig.json)
     * @type {Array}
     */
    [
      "module-resolver",
      {
        /**
         * @property root
         * @description Directorio raíz del proyecto
         * @type {string[]}
         */
        root: ["."],

        /**
         * @property alias
         * @description Definición de alias para importaciones
         * @type {Object.<string, string>}
         */
        alias: {
          // Alias root
          "~": "./",
          // Alias base app
          "@src": "./src",
          // Alias para atoms
          "@atoms": "./src/atoms",
          "@atoms-molecule": "./src/atoms-molecule",
          // Alias para core app
          "@core-app": "./src/core-app",
          // Alias para navegación
          "@navigation": "./src/navigation",
          // Alias en global
          "@global": "./src/global",
          "@assets": "./src/global/assets",
          "@fonts": "./src/global/assets/fonts",
          "@svg": "./src/global/assets/svg",
          "@theme": "./src/global/theme",
          "@types": "./src/global/types",
          "@utils": "./src/global/utils"
        }
      }
    ]
  ]
};
