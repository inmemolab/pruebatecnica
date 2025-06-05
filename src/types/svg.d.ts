/**
 * @proyect PruebaTecnica
 * @file types/svg.d.ts
 * @description Declaración de módulo para archivos SVG en React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo proporciona la declaración de tipo para importar archivos SVG
 * como componentes React en un proyecto de React Native.
 */

/**
 * @module "*.svg"
 * @description Declara el tipo para importaciones de archivos SVG
 */
declare module "*.svg" {
  /**
   * @import React
   * @description Importa React para usar el tipo FC (Functional Component)
   */
  import React from "react";

  /**
   * @import SvgProps
   * @description Importa el tipo SvgProps de react-native-svg
   */
  import {SvgProps} from "react-native-svg";

  /**
   * @constant content
   * @type {React.FC<SvgProps>}
   * @description Define el tipo del componente SVG como un Functional Component de React
   * que acepta propiedades de tipo SvgProps
   */
  const content: React.FC<SvgProps>;

  /**
   * @export
   * @default content
   * @description Exporta el componente SVG como el export default del módulo
   */
  export default content;
}
