/**
 * @proyect PruebaTecnica
 * @file .eslintrc.js
 * @description Configuración de ESLint para el proyecto React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo configura las reglas de linting para el proyecto,
 * extendiendo la configuración base de React Native y añadiendo
 * reglas personalizadas.
 */

module.exports = {
  /**
   * @property root
   * @description Indica que este es el archivo de configuración raíz de ESLint
   * @type {boolean}
   */
  root: true,

  /**
   * @property extends
   * @description Extiende la configuración base de ESLint para React Native
   * @type {string}
   */
  extends: "@react-native",

  /**
   * @property rules
   * @description Reglas personalizadas de ESLint para el proyecto
   * @type {Object}
   */
  rules: {
    /**
     * @rule quotes
     * @description Fuerza el uso de comillas dobles
     * @type {array}
     */
    quotes: ["error", "double", {allowTemplateLiterals: true}],
    /**
     * @rule react-native/no-unused-styles
     * @description Advierte sobre estilos no utilizados en componentes de React Native
     * @type {number}
     * @value 1 - Configurado como advertencia (warning)
     */
    "react-native/no-unused-styles": 1,
    /**
     * @rule comma-dangle
     * @description Desactiva la regla de comas finales
     * @type {array}
     */
    "comma-dangle": ["error", "never"]
  }
};
