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
      <StatusBar barStyle="light-content" backgroundColor="#dc2626" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Error Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
        </View>

        {/* Error Title */}
        <Text style={styles.title}>¡Ups! Algo salió mal</Text>

        {/* Error Description */}
        <Text style={styles.description}>
          La aplicación ha encontrado un error inesperado. No te preocupes, puedes intentar reiniciar la aplicación o contactar soporte si el problema
          persiste.
        </Text>

        {/* Error Details (only in development) */}
        {__DEV__ && error && (
          <View style={styles.errorDetails}>
            <Text style={styles.errorDetailsTitle}>Detalles del error (desarrollo):</Text>
            <ScrollView style={styles.errorDetailsScroll}>
              <Text style={styles.errorDetailsText}>
                {error.name}: {error.message}
              </Text>
              {error.stack && <Text style={styles.errorDetailsStack}>{error.stack}</Text>}
            </ScrollView>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleRestart} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Reiniciar App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleReload} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Intentar de nuevo</Text>
          </TouchableOpacity>
        </View>

        {/* Support Info */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>Si el problema persiste, contacta al soporte técnico</Text>
          <Text style={styles.supportEmail}>soporte@pruebatecnica.com</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dc2626"
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    marginBottom: 24
  },
  errorIcon: {
    fontSize: 64,
    textAlign: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    color: "#fee2e2",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16
  },
  errorDetails: {
    backgroundColor: "#991b1b",
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
    width: "100%",
    maxHeight: 200
  },
  errorDetailsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fecaca",
    marginBottom: 8
  },
  errorDetailsScroll: {
    maxHeight: 150
  },
  errorDetailsText: {
    fontSize: 12,
    color: "#fecaca",
    fontFamily: "monospace",
    marginBottom: 8
  },
  errorDetailsStack: {
    fontSize: 10,
    color: "#fed7d7",
    fontFamily: "monospace",
    lineHeight: 14
  },
  buttonsContainer: {
    width: "100%",
    gap: 12
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  primaryButtonText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600"
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500"
  },
  supportContainer: {
    marginTop: 32,
    alignItems: "center"
  },
  supportText: {
    fontSize: 14,
    color: "#fecaca",
    textAlign: "center",
    marginBottom: 4
  },
  supportEmail: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "500",
    textDecorationLine: "underline"
  }
});

export default AppErrorScreen;
