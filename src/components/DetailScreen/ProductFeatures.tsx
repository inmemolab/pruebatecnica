/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/ProductFeatures.tsx
 * @description Componente de características del producto
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Animated, {
  SlideInRight,
} from "react-native-reanimated";

const ProductFeatures: React.FC = () => {
  const features = [
    { icon: "✓", text: "Envío gratuito" },
    { icon: "✓", text: "Garantía de 30 días" },
    { icon: "✓", text: "Soporte 24/7" },
  ];

  return (
    <Animated.View style={styles.container} entering={SlideInRight.delay(1300)}>
      <Text style={styles.title}>Características</Text>
      <View style={styles.featuresList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12
  },
  featuresList: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  featureIcon: {
    fontSize: 16,
    color: "#059669",
    marginRight: 12,
    fontWeight: "bold"
  },
  featureText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500"
  }
});

export default ProductFeatures;
