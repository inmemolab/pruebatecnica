/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/EmptyState.tsx
 * @description Componente de estado vacío
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
  FadeIn,
  BounceIn,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

interface EmptyStateProps {
  hasError: boolean;
  onRetry?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({hasError, onRetry}) => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(800)}
    >
      <Animated.Text
        style={styles.icon}
        entering={BounceIn.delay(200)}
      >
        🛍️
      </Animated.Text>
      <Animated.Text
        style={styles.title}
        entering={SlideInRight.delay(400)}
      >
        No hay productos
      </Animated.Text>
      <Animated.Text
        style={styles.subtitle}
        entering={SlideInRight.delay(600)}
      >
        {hasError ? "Error al cargar los productos" : "No se encontraron productos disponibles"}
      </Animated.Text>
      {hasError && onRetry && (
        <Animated.View entering={ZoomIn.delay(800)}>
          <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.7}>
            <Text style={styles.retryButtonText}>🔄 Reintentar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 20
  },
  icon: {
    fontSize: 48,
    marginBottom: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16
  },
  retryButton: {
    backgroundColor: "#ef4444",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600"
  }
});

export default EmptyState;
