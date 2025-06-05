/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/CategoryItem.tsx
 * @description Componente para item de categoría con animaciones
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React, {useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from "react-native-reanimated";

/** @import types */
import type {Product} from "@stores/product.store";

interface CategoryItemProps {
  item: Product;
  index: number;
  categoryIndex: number;
  onPress: (item: Product) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({item, index, categoryIndex, onPress}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotation = useSharedValue(-10);

  useEffect(() => {
    const delay = (categoryIndex * 200) + (index * 100); // Delay basado en categoría e índice

    opacity.value = withDelay(delay, withTiming(1, {duration: 500}));
    scale.value = withDelay(delay, withSpring(1, {damping: 12, stiffness: 120}));
    rotation.value = withDelay(delay, withSpring(0, {damping: 15, stiffness: 100}));
  }, [index, categoryIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {scale: scale.value},
      {rotate: `${rotation.value}deg`},
    ],
  }));

  const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

  const truncateText = (text: string, maxLength: number = 50): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        activeOpacity={0.8}
        style={styles.touchable}
      >
        <Image source={{uri: item.image}} style={styles.image} resizeMode="contain" />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {truncateText(item.title, 25)}
          </Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  touchable: {
    padding: 12,
    flex: 1
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    marginBottom: 8
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
    lineHeight: 16
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#059669"
  }
});

export default CategoryItem;
