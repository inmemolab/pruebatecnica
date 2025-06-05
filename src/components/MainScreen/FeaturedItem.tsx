/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/FeaturedItem.tsx
 * @description Componente para item destacado con animaciones
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React, {useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  BounceIn,
} from "react-native-reanimated";

/** @import types */
import type {Product} from "@stores/product.store";

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = 280;

interface FeaturedItemProps {
  item: Product;
  index: number;
  onPress: (item: Product) => void;
}

const FeaturedItem: React.FC<FeaturedItemProps> = ({item, index, onPress}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(30);

  useEffect(() => {
    const delay = index * 150; // Animación escalonada

    opacity.value = withDelay(delay, withTiming(1, {duration: 600, easing: Easing.out(Easing.exp)}));
    scale.value = withDelay(delay, withSpring(1, {damping: 15, stiffness: 100}));
    translateY.value = withDelay(delay, withTiming(0, {duration: 600, easing: Easing.out(Easing.exp)}));
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {scale: scale.value},
      {translateY: translateY.value},
    ],
  }));

  const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

  const truncateText = (text: string, maxLength: number = 50): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const capitalizeCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={styles.image} resizeMode="contain" />
          <Animated.View
            style={styles.priceTag}
            entering={BounceIn.delay(index * 150 + 400)}
          >
            <Text style={styles.priceTagText}>{formatPrice(item.price)}</Text>
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{capitalizeCategory(item.category)}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {truncateText(item.title, 35)}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {truncateText(item.description, 60)}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden'
  },
  touchable: {
    flex: 1
  },
  imageContainer: {
    height: 180,
    backgroundColor: "#f8fafc",
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '80%',
    height: '80%'
  },
  priceTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: "#059669",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  priceTagText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold"
  },
  content: {
    padding: 16,
    flex: 1
  },
  category: {
    fontSize: 12,
    color: "#6366f1",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 6,
    lineHeight: 20
  },
  description: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18
  }
});

export default FeaturedItem;
