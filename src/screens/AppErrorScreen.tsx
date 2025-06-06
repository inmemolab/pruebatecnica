/**
 * @proyect PruebaTecnica
 * @file AppErrorScreen.tsx
 * @description Pantalla de error para manejar errores críticos de la aplicación
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  SlideInDown,
  BounceIn,
  ZoomIn,
  SlideInUp,
} from "react-native-reanimated";

/** @import navigation */
import {navigateAndReset} from "@navigation/navigationRef";
import {RouteScreens} from "@navigation/routes";

interface AppErrorScreenProps {
  error?: Error;
  resetError?: () => void;
}

const AppErrorScreen: React.FC<AppErrorScreenProps> = ({error, resetError}) => {
  const handleRestart = () => {
    if (resetError) {
      resetError();
    }
    // Navegar al inicio
    navigateAndReset(RouteScreens.Splash);
  };

  const handleReload = () => {
    if (resetError) {
      resetError();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Background Gradient Effect */}
        <Animated.View style={styles.backgroundGradient} entering={FadeIn.duration(1000)} />

        {/* Error Icon */}
        <Animated.View style={styles.iconContainer} entering={BounceIn.delay(200)}>
          <Text style={styles.errorIcon}>⚠️</Text>
        </Animated.View>

        {/* Error Title */}
        <Animated.Text style={styles.title} entering={SlideInDown.delay(400)}>
          ¡Ups! Algo salió mal
        </Animated.Text>

        {/* Error Description */}
        <Animated.Text style={styles.description} entering={SlideInUp.delay(600)}>
          La aplicación encontró un error inesperado. No te preocupes, puedes intentar reiniciar o contactar soporte si persiste.
        </Animated.Text>

        {/* Error Details (only in development) */}
        {__DEV__ && error && (
          <Animated.View style={styles.errorDetails} entering={FadeIn.delay(800)}>
            <Text style={styles.errorDetailsTitle}>🔍 Detalles técnicos:</Text>
            <ScrollView style={styles.errorDetailsScroll} nestedScrollEnabled>
              <Text style={styles.errorDetailsText}>
                {error.name}: {error.message}
              </Text>
              {error.stack && <Text style={styles.errorDetailsStack}>{error.stack}</Text>}
            </ScrollView>
          </Animated.View>
        )}

        {/* Action Buttons */}
        <Animated.View style={styles.buttonsContainer} entering={ZoomIn.delay(1000)}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleRestart} activeOpacity={0.8}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>🔄</Text>
              <Text style={styles.primaryButtonText}>Reiniciar App</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleReload} activeOpacity={0.8}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>🔧</Text>
              <Text style={styles.secondaryButtonText}>Intentar de nuevo</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Support Info */}
        <Animated.View style={styles.supportContainer} entering={FadeIn.delay(1200)}>
          <Text style={styles.supportText}>Si el problema persiste</Text>
          <TouchableOpacity style={styles.supportEmailContainer} activeOpacity={0.7}>
            <Text style={styles.supportLabel}>📧 Contactar soporte</Text>
            <Text style={styles.supportEmail}>soporte@pruebatecnica.com</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b"
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0f172a",
    opacity: 0.3
  },
  iconContainer: {
    marginBottom: 24,
    backgroundColor: "#374151",
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12
  },
  errorIcon: {
    fontSize: 48,
    textAlign: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  description: {
    fontSize: 16,
    color: "#cbd5e1",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
    maxWidth: 320
  },
  errorDetails: {
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    width: "100%",
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#4b5563"
  },
  errorDetailsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 12,
    textAlign: 'center'
  },
  errorDetailsScroll: {
    maxHeight: 150
  },
  errorDetailsText: {
    fontSize: 12,
    color: "#e2e8f0",
    fontFamily: "monospace",
    marginBottom: 8,
    lineHeight: 16
  },
  errorDetailsStack: {
    fontSize: 10,
    color: "#94a3b8",
    fontFamily: "monospace",
    lineHeight: 14
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,
    maxWidth: 300
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  buttonIcon: {
    fontSize: 18
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  primaryButtonText: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#6366f1",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: "#a5b4fc",
    fontSize: 16,
    fontWeight: "600"
  },
  supportContainer: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 20
  },
  supportText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 12
  },
  supportEmailContainer: {
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#4b5563",
    alignItems: 'center'
  },
  supportLabel: {
    fontSize: 12,
    color: "#a5b4fc",
    fontWeight: "600",
    marginBottom: 4
  },
  supportEmail: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
    textDecorationLine: "underline"
  }
});

export default AppErrorScreen;
