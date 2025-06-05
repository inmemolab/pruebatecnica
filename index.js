/**
 * @proyect PruebaTecnica
 * @file index.js
 * @description Punto de entrada principal de la aplicación React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo configura el punto de entrada de la aplicación, incluyendo
 * la configuración de notificaciones en segundo plano y el registro del
 * componente principal de la aplicación.
 */

/** @import Soporte para gestos */
import "react-native-gesture-handler";

/** @import Registro de componentes de React Native */
import {AppRegistry} from "react-native";

/** @import Componente principal de la aplicación */
import App from "./src/App";

/** @import Nombre de la aplicación desde el archivo de configuración */
import {name as appName} from "./app.json";

/**
 * @function
 * @description Registra el componente principal de la aplicación para su renderizado
 * @param {string} appName - Nombre de la aplicación obtenido de app.json
 * @param {Function} App - Componente raíz de la aplicación React Native
 */
AppRegistry.registerComponent(appName, () => App);
