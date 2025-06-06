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
  BounceIn,
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
        <Animated.View entering={BounceIn.delay(800)} style={styles.testButtonContainer}>
          <TouchableOpacity
            style={styles.testErrorButton}
            onPress={onTestError}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.testErrorIcon}>⚠️</Text>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.testErrorButtonText}>Probar ErrorBoundary</Text>
                <Text style={styles.testErrorButtonSubtext}>Solo desarrollo</Text>
              </View>
            </View>
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
  testButtonContainer: {
    marginTop: 16,
    alignSelf: "flex-start"
  },
  testErrorButton: {
    backgroundColor: "#ef4444",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#ef4444",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#dc2626",
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  testErrorIcon: {
    fontSize: 20
  },
  buttonTextContainer: {
    flex: 1
  },
  testErrorButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2
  },
  testErrorButtonSubtext: {
    color: "#fecaca",
    fontSize: 11,
    fontWeight: "500"
  }
});

export default ProductHeader;
