/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/ProductDescription.tsx
 * @description Componente de descripción del producto
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Animated, {
  FadeIn,
} from "react-native-reanimated";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({description}) => {
  return (
    <Animated.View style={styles.container} entering={FadeIn.delay(1100)}>
      <Text style={styles.title}>Descripción</Text>
      <Text style={styles.description}>{description}</Text>
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
  description: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24
  }
});

export default ProductDescription;
