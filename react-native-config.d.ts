/**
 * @proyect PruebaTecnica
 * @file react-native-config.d.ts
 * @description Declaración de tipos para react-native-config
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo proporciona definiciones de tipos para las variables de entorno
 * utilizadas en la aplicación a través de react-native-config.
 */

declare module "react-native-config" {
  /**
   * @interface NativeConfig
   * @description Interfaz que define los tipos de las variables de entorno
   */
  export interface NativeConfig {
    /** @property {string} [APP_ON] - Indica si la aplicación está activa */
    APP_ON?: string;

    /** @property {string} [APP_RUN] - Modo de ejecución de la aplicación */
    APP_RUN?: string;

    /** @property {string} [APP_ENCRIP_KEY] - Clave de encriptación de la aplicación */
    APP_ENCRIP_KEY?: string;
  }

  /**
   * @const Config
   * @description Objeto que contiene las variables de entorno de la aplicación
   * @type {NativeConfig}
   */
  export const Config: NativeConfig;

  export default Config;
}
