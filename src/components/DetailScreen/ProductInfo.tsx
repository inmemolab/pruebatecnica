/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/ProductInfo.tsx
 * @description Componente de información básica del producto
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Animated, {
  SlideInLeft,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

/** @import types */
import type {Product} from "@stores/product.store";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({product}) => {
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const capitalizeCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <>
      {/* Category Badge */}
      <Animated.View entering={SlideInLeft.delay(700)}>
        <Text style={styles.category}>{capitalizeCategory(product.category)}</Text>
      </Animated.View>

      {/* Title */}
      <Animated.Text style={styles.title} entering={SlideInRight.delay(800)}>
        {product.title}
      </Animated.Text>

      {/* Price Section */}
      <Animated.View style={styles.priceContainer} entering={ZoomIn.delay(900)}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.currency}>USD</Text>
      </Animated.View>

      {/* Rating Section (Mock) */}
      <Animated.View style={styles.ratingContainer} entering={SlideInLeft.delay(1000)}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text key={star} style={styles.star}>⭐</Text>
          ))}
        </View>
        <Text style={styles.ratingText}>4.8 (127 reseñas)</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    fontSize: 14,
    color: "#6366f1",
    backgroundColor: "#eef2ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    lineHeight: 36,
    marginBottom: 16
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#059669",
    marginRight: 8
  },
  currency: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6b7280"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  stars: {
    flexDirection: 'row',
    marginRight: 12
  },
  star: {
    fontSize: 16,
    marginRight: 2
  },
  ratingText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500"
  }
});

export default ProductInfo;
