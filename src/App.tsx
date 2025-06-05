/**
 * @proyect PruebaTecnica
 * @file App.tsx
 * @description Componente principal de la aplicación React Native
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este es el componente raíz de la aplicación que configura el entorno,
 * inicializa servicios y renderiza los componentes principales.
 */

/** @import libraries */
import React, {useEffect, useRef} from "react";
import {useColorScheme, StatusBar} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";

/** @import navegacion */
import AppNavigator from "@navigation/AppNavigator";

/** @import stores */
import {productStore} from "@stores/product.store";

/**
 * @component App
 * @description Componente principal de la aplicación
 */
const App = () => {
  // Referencia para controlar si ya se imprimieron los logs iniciales
  const isInitialized = useRef(false);

  /** @constant scheme - Esquema de color del sistema */
  const scheme = useColorScheme();

  /**
   * @useEffect
   * @description Efecto para inicialización, logs y carga inicial de productos
   */
  useEffect(() => {
    if (!isInitialized.current) {
      /** @log para informar que inicia la aplicación */
      console.log("🎚️ ---> App - Inicia las cargas iniciales!");

      // Inicializar carga de productos
      initializeApp();

      console.log("🎯 ---> App - Aplicación iniciada correctamente");
      isInitialized.current = true;
    }
  }, []);

  /**
   * @function initializeApp
   * @description Inicializa la aplicación cargando datos esenciales
   */
  const initializeApp = async () => {
    try {
      console.log("📱 ---> App - Iniciando configuración inicial...");

      // Obtener estado actual del store de productos
      const {loaded, lastLoadTime, loadProducts} = productStore.getState();

      // Verificar si necesitamos cargar productos
      const shouldLoadProducts = !loaded || !lastLoadTime || Date.now() - lastLoadTime > 300000; // 5 minutos de cache

      if (shouldLoadProducts) {
        console.log("🛒 ---> App - Cargando productos iniciales...");
        await loadProducts();
      } else {
        console.log("✅ ---> App - Productos ya disponibles en cache");
      }
    } catch (error) {
      console.error("❌ ---> App - Error en inicialización:", error);
    }
  };

  /**
   * @useEffect
   * @description Efecto para establecer el modo oscuro
   */
  useEffect(() => {
    console.log(`🖍️ ---> App - Color scheme: ${scheme}`);
  }, [scheme]);

  /**
   * @const rootStyle
   * @description Estilo base para el contenedor principal de la aplicación.
   * Asegura que el componente ocupe todo el espacio disponible (flex: 1).
   */
  const rootStyle = {flex: 1};

  /**
   * @render
   * @description Se hace el render de la app
   */
  return (
    <GestureHandlerRootView style={rootStyle}>
      <StatusBar animated={true} backgroundColor="transparent" barStyle={scheme === "dark" ? "light-content" : "dark-content"} />
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
