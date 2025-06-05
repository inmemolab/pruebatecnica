/**
 * @proyect PruebaTecnica
 * @file metro.config.js
 * @description Configuración de Metro para React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo configura Metro, el empaquetador de JavaScript utilizado por React Native.
 * Incluye configuraciones para el transformador y el resolvedor, con soporte específico para SVG.
 */

/** @import configuración por defecto de Metro */
const {getDefaultConfig, mergeConfig} = require("@react-native/metro-config");

/** @import extensiones de archivo fuente por defecto */
const defaultSourceExts = require("metro-config/src/defaults/defaults").sourceExts;

/** @import extensiones de archivo de activos por defecto */
const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

/** @import módulo de manejo de rutas */
const path = require("path");

/**
 * @type {import('metro-config').MetroConfig}
 * @description Configuración de Metro
 * @see https://facebook.github.io/metro/docs/configuration
 */
module.exports = mergeConfig(getDefaultConfig(__dirname), {
  /**
   * @property transformer
   * @description Configuración del transformador de Metro
   */
  transformer: {
    /**
     * @property babelTransformerPath
     * @description Ruta al transformador de Babel para SVG
     */
    babelTransformerPath: require.resolve("react-native-svg-transformer"),

    /**
     * @property getTransformOptions
     * @description Opciones de transformación asincrónicas
     * @returns {Promise<Object>} Opciones de transformación
     */
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  },

  /**
   * @property resolver
   * @description Configuración del resolvedor de Metro
   */
  resolver: {
    /**
     * @property assetExts
     * @description Extensiones de archivo de activos, excluyendo SVG
     */
    assetExts: defaultAssetExts.filter((ext) => ext !== "svg"),

    /**
     * @property sourceExts
     * @description Extensiones de archivo fuente, incluyendo SVG
     */
    sourceExts: [...defaultSourceExts, "svg"]
  },
  /**
   * @property watchFolders
   * @description Carpetas adicionales a observar por Metro
   */
  watchFolders: [path.resolve(__dirname, "./src/global/assets/svg")]
});
