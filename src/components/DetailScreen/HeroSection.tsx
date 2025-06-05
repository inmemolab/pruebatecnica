/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/HeroSection.tsx
 * @description Componente de hero section con imagen del producto
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React, {useState} from "react";
import {View, StyleSheet, Image, Dimensions} from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  FadeIn,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";

/** @import types */
import type {Product} from "@stores/product.store";

const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

interface HeroSectionProps {
  product: Product;
  scrollY: Animated.SharedValue<number>;
  imageScale: Animated.SharedValue<number>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  product,
  scrollY,
  imageScale
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [-100, 0, 100],
          [1.2, imageScale.value, 0.9],
          'clamp'
        )
      },
      {
        translateY: interpolate(
          scrollY.value,
          [0, 200],
          [0, -50],
          'clamp'
        )
      }
    ],
  }));

  return (
    <View style={styles.heroContainer}>
      <LinearGradient
        colors={['#f8fafc', '#ffffff']}
        style={styles.heroGradient}
      />
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
        <Image
          source={{uri: product.image}}
          style={styles.productImage}
          resizeMode="contain"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <Animated.View style={styles.imagePlaceholder} entering={FadeIn}>
            <Animated.Text style={styles.placeholderText}>Cargando...</Animated.Text>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    height: screenHeight * 0.5,
    position: 'relative',
    overflow: 'hidden'
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60, // Space for header
  },
  productImage: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.35,
    maxWidth: 400
  },
  imagePlaceholder: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.8,
    height: screenHeight * 0.35,
    backgroundColor: "#f3f4f6",
    borderRadius: 12
  },
  placeholderText: {
    color: "#6b7280",
    fontSize: 16
  }
});

export default HeroSection;
