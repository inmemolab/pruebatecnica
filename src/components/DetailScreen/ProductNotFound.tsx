/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/ProductNotFound.tsx
 * @description Componente de producto no encontrado
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Animated, {
  SlideInDown,
  FadeIn,
  BounceIn,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

interface ProductNotFoundProps {
  onGoBack: () => void;
}

const ProductNotFound: React.FC<ProductNotFoundProps> = ({onGoBack}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Animated.View style={styles.header} entering={SlideInDown.duration(400)}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>‹ Volver</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={styles.errorContainer} entering={FadeIn.delay(200).duration(600)}>
        <Animated.Text style={styles.errorIcon} entering={BounceIn.delay(400)}>
          ❌
        </Animated.Text>
        <Animated.Text style={styles.errorTitle} entering={SlideInRight.delay(600)}>
          Producto no encontrado
        </Animated.Text>
        <Animated.Text style={styles.errorSubtitle} entering={SlideInRight.delay(800)}>
          El producto que buscas no está disponible o ha sido eliminado.
        </Animated.Text>
        <Animated.View entering={ZoomIn.delay(1000)}>
          <TouchableOpacity style={styles.retryButton} onPress={onGoBack} activeOpacity={0.7}>
            <Text style={styles.retryButtonText}>Volver a la tienda</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb"
  },
  backButton: {
    padding: 8
  },
  backButtonText: {
    fontSize: 18,
    color: "#6366f1",
    fontWeight: "600"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc2626",
    textAlign: "center",
    marginBottom: 8
  },
  errorSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24
  },
  retryButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default ProductNotFound;
