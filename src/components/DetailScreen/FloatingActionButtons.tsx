/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/FloatingActionButtons.tsx
 * @description Componente de botones flotantes (FAB)
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
  useAnimatedStyle,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";

interface FloatingActionButtonsProps {
  isFavorite: boolean;
  quantity: number;
  totalPrice: string;
  fabScale: Animated.SharedValue<number>;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  isFavorite,
  quantity,
  totalPrice,
  fabScale,
  onToggleFavorite,
  onAddToCart
}) => {
  // Debug: Verificar valores
  console.log('FloatingActionButtons Debug:', {
    quantity,
    totalPrice,
    isFavorite
  });

  const animatedFabStyle = useAnimatedStyle(() => ({
    transform: [{scale: fabScale.value}],
  }));

  return (
    <Animated.View style={[styles.container, animatedFabStyle]}>
      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        onPress={onToggleFavorite}
        activeOpacity={0.8}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={onAddToCart}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.buttonGradient}
        >
          <Text style={styles.addToCartButtonText}>
            🛒 Agregar {quantity > 1 ? `${quantity} x ${totalPrice}` : totalPrice}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 34,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f3f4f6",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8
  },
  favoriteButtonActive: {
    backgroundColor: "#fef2f2"
  },
  favoriteButtonText: {
    fontSize: 24
  },
  addToCartButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center'
  },
  addToCartButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default FloatingActionButtons;
