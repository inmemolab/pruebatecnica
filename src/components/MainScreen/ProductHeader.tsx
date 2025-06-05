/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/ProductHeader.tsx
 * @description Componente de header para la pantalla principal
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
  SlideInRight,
  FadeIn,
} from "react-native-reanimated";

interface ProductHeaderProps {
  totalProducts: number;
  totalCategories: number;
  onTestError?: () => void;
  showTestButton?: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  totalProducts,
  totalCategories,
  onTestError,
  showTestButton = false
}) => {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInRight.duration(600)}
    >
      <Text style={styles.title}>Descubre Productos</Text>
      <Text style={styles.subtitle}>
        {totalProducts} productos en {totalCategories} categorías
      </Text>

      {/* Botón de prueba del ErrorBoundary (solo en desarrollo) */}
      {showTestButton && onTestError && (
        <Animated.View entering={FadeIn.delay(400)}>
          <TouchableOpacity style={styles.testErrorButton} onPress={onTestError} activeOpacity={0.7}>
            <Text style={styles.testErrorButtonText}>🧪 Probar ErrorBoundary</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    lineHeight: 22
  },
  testErrorButton: {
    backgroundColor: "#f59e0b",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    alignSelf: "flex-start"
  },
  testErrorButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600"
  }
});

export default ProductHeader;
