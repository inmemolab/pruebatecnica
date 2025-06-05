/**
 * @proyect PruebaTecnica
 * @file stores/app.store.ts
 * @description Store de datos de la aplicación utilizando Zustand
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo define el store principal de la aplicación, gestionando el estado
 * global y proporcionando acciones para modificarlo. Utiliza Zustand con
 * persistencia para mantener el estado entre sesiones.
 */

/** @import librerias */
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {zustandStorage} from "@stores/Storage";

/**
 * @constant storageName
 * @description Nombre del almacenamiento persistente para el store
 */
const storageName = "app-storage";

/**
 * @typedef State
 * @description Definición del estado de la aplicación
 */
type State = {
  /** Modo de depuración del sistema de la aplicación */
  appIsDebugMode: boolean;
  /** Configuración regional de la aplicación */
  appLocale: string | null;
  /** Modo oscuro de la aplicación */
  appIsDark: boolean;
  /** Ruta actual de la aplicación */
  appPath: string | null;
  /** Visibilidad del botón de retroceso */
  appShowBack: number;
  /** Estado de carga de la aplicación */
  isLoading: boolean;
};

/**
 * @typedef Actions
 * @description Definición de las acciones para modificar el estado
 */
type Actions = {
  /** Establece el modo de depuración del sistema */
  setAppIsDebugMode: (appIsDebugMode: boolean) => void;
  /** Establece la configuración regional */
  setAppLocale: (appLocale: string) => void;
  /** Establece el modo oscuro */
  setAppIsDark: (appIsDark: boolean) => void;
  /** Establece la ruta actual */
  setPath: (appPath: string) => void;
  /** Establece la visibilidad del botón de retroceso */
  setShowBack: (appShowBack: number) => void;
  /** Inicia el estado de carga */
  startLoading: () => void;
  /** Detiene el estado de carga */
  stopLoading: () => void;
  /** Restablece la aplicación al estado inicial */
  resetApp: () => void;
};

/**
 * @constant initialState
 * @description Estado inicial de la aplicación
 */
const initialState: State = {
  appIsDebugMode: false,
  appLocale: "es_CO",
  appIsDark: false,
  appPath: null,
  appShowBack: 0,
  isLoading: false
};

/**
 * @constant appStore
 * @description Store principal de la aplicación
 *
 * Este store combina el estado y las acciones, utilizando el middleware de
 * persistencia de Zustand para almacenar el estado entre sesiones.
 */
export const appStore = create<State & Actions>()(
  persist(
    (set) => ({
      // Se inicializa con el estado inicial definido anteriormente
      ...initialState,
      /**
       * @function setAppIsDebugMode
       * @description Establece el modo de depuración del sistema de la aplicación
       * @param {boolean} appIsDebugMode - Modo de depuración del sistema a establecer
       */
      setAppIsDebugMode: (appIsDebugMode) => set({appIsDebugMode}),

      /**
       * @function setAppLocale
       * @description Establece la configuración regional de la aplicación
       * @param {string} appLocale - Configuración regional a establecer
       */
      setAppLocale: (appLocale) => set({appLocale}),

      /**
       * @function setAppIsDark
       * @description Establece el modo oscuro de la aplicación
       * @param {boolean} appIsDark - Estado del modo oscuro a establecer
       */
      setAppIsDark: (appIsDark) => set({appIsDark}),

      /**
       * @function setPath
       * @description Establece la ruta actual de la aplicación
       * @param {string} appPath - Ruta a establecer
       */
      setPath: (appPath) => set({appPath}),

      /**
       * @function setShowBack
       * @description Establece la visibilidad del botón de retroceso
       * @param {number} appShowBack - Visibilidad del botón de retroceso a establecer
       */
      setShowBack: (appShowBack) => set({appShowBack}),

      /**
       * @function startLoading
       * @description Inicia el estado de carga de la aplicación
       */
      startLoading: () => set({isLoading: true}),

      /**
       * @function stopLoading
       * @description Detiene el estado de carga de la aplicación
       */
      stopLoading: () => set({isLoading: false}),

      /**
       * @function resetApp
       * @description Restablece la aplicación al estado inicial
       */
      resetApp: () => set(initialState)
    }),
    {
      name: storageName,
      storage: createJSONStorage(() => zustandStorage)
    }
  )
);
