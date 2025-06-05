/**
 * @proyect PruebaTecnica
 * @file SplashScreen.tsx
 * @description Pantalla de carga inicial de la aplicación
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ActivityIndicator, StatusBar, Dimensions} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import Svg, {Path} from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";

/** @import navigation */
import {replace} from "@navigation/navigationRef";
import {RouteScreens} from "@navigation/routes";

/** @import stores */
import {productStore} from "@stores/product.store";

const {width, height} = Dimensions.get("window");

// Componente SVG del icono Building Store
const BuildingStoreIcon: React.FC<{size?: number; color?: string}> = ({
  size = 80,
  color = "#ffffff",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" stroke={color} fill="none">
    <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <Path d="M3 21l18 0" />
    <Path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
    <Path d="M5 21l0 -10.15" />
    <Path d="M19 21l0 -10.15" />
    <Path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
  </Svg>
);

const SplashScreen: React.FC = () => {
  const [loadingText, setLoadingText] = useState("Iniciando...");
  const [animationComplete, setAnimationComplete] = useState(false);

  // Obtener estado del store de productos
  const {products, loading, error, loaded} = productStore();

  // Valores compartidos para animaciones
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);

  useEffect(() => {
    // Actualizar texto de carga basado en el estado
    if (loading) {
      setLoadingText("Cargando productos...");
    } else if (error) {
      setLoadingText("Conectando...");
    } else if (loaded && products.length > 0) {
      setLoadingText("¡Todo listo!");
    }
  }, [loading, error, loaded, products.length]);

  useEffect(() => {
    // Iniciar animación de entrada
    backgroundOpacity.value = withTiming(1, {duration: 1000});

    setTimeout(() => {
      // Animación del logo
      logoOpacity.value = withTiming(1, {duration: 800});
      logoScale.value = withSequence(
        withTiming(1.2, {duration: 600, easing: Easing.out(Easing.exp)}),
        withTiming(1, {duration: 400, easing: Easing.inOut(Easing.quad)})
      );

      // Rotación sutil del icono
      logoRotation.value = withRepeat(
        withSequence(
          withTiming(5, {duration: 2000}),
          withTiming(-5, {duration: 2000}),
          withTiming(0, {duration: 2000})
        ),
        -1,
        false
      );

      // Efecto de pulso
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.1, {duration: 1500}),
          withTiming(1, {duration: 1500})
        ),
        -1,
        false
      );
    }, 500);

    setTimeout(() => {
      textOpacity.value = withTiming(1, {duration: 600});
      runOnJS(setAnimationComplete)(true);
    }, 1200);
  }, []);

  useEffect(() => {
    if (!animationComplete) return;

    // Navegar a Main después del tiempo mínimo o cuando los datos estén listos
    const minTime = 3000; // Tiempo mínimo para mostrar splash
    const startTime = Date.now();

    const checkAndNavigate = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minTime - elapsedTime);

      setTimeout(() => {
        console.log(`🚀 ---> SplashScreen - Navegando a Main. Productos: ${products.length}`);
        replace(RouteScreens.Main);
      }, remainingTime);
    };

    // Si hay error, navegar después del tiempo mínimo
    if (error) {
      console.warn("⚠️ ---> SplashScreen - Error en carga, navegando:", error);
      checkAndNavigate();
    }
    // Si los datos están cargados, navegar
    else if (loaded && products.length > 0) {
      checkAndNavigate();
    }
    // Timeout de seguridad
    else {
      const maxTimeout = setTimeout(() => {
        console.warn("⏰ ---> SplashScreen - Timeout alcanzado, navegando");
        replace(RouteScreens.Main);
      }, 12000);

      return () => clearTimeout(maxTimeout);
    }
  }, [error, loaded, products.length, animationComplete]);

  // Estilos animados
  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      {scale: logoScale.value},
      {rotate: `${logoRotation.value}deg`},
    ],
  }));

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{scale: pulseScale.value}],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [
      {
        translateY: interpolate(textOpacity.value, [0, 1], [20, 0]),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4338ca" />

      {/* Gradiente de fondo animado */}
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedBackgroundStyle]}>
        <LinearGradient
          colors={['#4338ca', '#7c3aed', '#9333ea']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>

      {/* Círculos decorativos de fondo */}
      <View style={styles.backgroundCircles}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      {/* Logo container principal */}
      <View style={styles.logoContainer}>
        {/* Logo con sombra y animación */}
        <Animated.View style={[styles.logoWrapper, animatedLogoStyle]}>
          <Animated.View style={[styles.logoShadowContainer, animatedPulseStyle]}>
            <View style={styles.logoShadow} />
            <View style={styles.logoBackground}>
              <BuildingStoreIcon size={100} color="#ffffff" />
            </View>
          </Animated.View>
        </Animated.View>

        {/* Título animado */}
        <Animated.View style={[styles.titleContainer, animatedTextStyle]}>
          <Text style={styles.appName}>PruebaTecnica</Text>
          <Text style={styles.subtitle}>React Native Senior</Text>
        </Animated.View>
      </View>

      {/* Indicador de carga animado */}
      <Animated.View style={[styles.loadingContainer, animatedTextStyle]}>
        <ActivityIndicator size="large" color="#ffffff" style={styles.spinner} />
        <Text style={styles.loadingText}>{loadingText}</Text>

        {/* Información adicional en desarrollo */}
        {__DEV__ && (
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>
              Estado: {loading ? "Cargando" : error ? "Error" : loaded ? "Cargado" : "Iniciando"}
            </Text>
            {products.length > 0 && (
              <Text style={styles.debugText}>Productos: {products.length}</Text>
            )}
            {error && (
              <Text style={styles.debugTextError}>Error: {error}</Text>
            )}
          </View>
        )}
      </Animated.View>

      {/* Footer */}
      <Animated.View style={[styles.footer, animatedTextStyle]}>
        <Text style={styles.footerText}>Versión 1.0.0</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4338ca",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  backgroundCircles: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  circle: {
    position: "absolute",
    borderRadius: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  circle1: {
    width: width * 0.8,
    height: width * 0.8,
    top: -width * 0.4,
    right: -width * 0.2,
  },
  circle2: {
    width: width * 0.6,
    height: width * 0.6,
    bottom: -width * 0.2,
    left: -width * 0.3,
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    top: height * 0.3,
    right: -width * 0.1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoWrapper: {
    marginBottom: 40,
  },
  logoShadowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoShadow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    top: 8,
    left: 8,
  },
  logoBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  titleContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#e0e7ff",
    textAlign: "center",
    opacity: 0.9,
    fontWeight: "300",
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  spinner: {
    marginBottom: 16,
    transform: [{scale: 1.2}],
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    opacity: 0.8,
    fontWeight: "500",
  },
  debugInfo: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  debugText: {
    color: "#e0e7ff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 2
  },
  debugTextError: {
    color: "#fecaca",
    fontSize: 10,
    textAlign: "center",
    marginTop: 4
  },
  footer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center"
  },
  footerText: {
    color: "#e0e7ff",
    fontSize: 12,
    opacity: 0.7,
    fontWeight: "300",
  }
});

export default SplashScreen;
