/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/AnimatedHeader.tsx
 * @description Componente de header animado para DetailScreen
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  FadeIn,
} from "react-native-reanimated";

interface AnimatedHeaderProps {
  title: string;
  headerOpacity: Animated.SharedValue<number>;
  onGoBack: () => void;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  title,
  headerOpacity,
  onGoBack
}) => {
  const animatedHeaderStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    backgroundColor: interpolate(
      headerOpacity.value,
      [0, 1],
      [0, 255],
      'clamp'
    ) ? `rgba(255, 255, 255, ${headerOpacity.value})` : 'transparent',
  }));

  const animatedFixedButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      headerOpacity.value,
      [0, 0.5, 1],
      [1, 0.5, 0],
      'clamp'
    ),
  }));

  return (
    <>
      {/* Botón de volver fijo siempre visible */}
      <Animated.View style={[styles.fixedBackButton, animatedFixedButtonStyle]} entering={FadeIn.delay(100)}>
        <TouchableOpacity style={styles.backButtonFixed} onPress={onGoBack} activeOpacity={0.7}>
          <Text style={styles.backButtonFixedText}>‹</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Header animado con parallax */}
      <Animated.View style={[styles.animatedHeader, animatedHeaderStyle]}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.animatedHeaderTitle} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
          <Text style={styles.shareButtonText}>⋯</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  // Header animado
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight || 44,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229, 231, 235, 0.3)"
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  backButtonText: {
    fontSize: 24,
    color: "#6366f1",
    fontWeight: "600"
  },
  animatedHeaderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 16
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  shareButtonText: {
    fontSize: 18,
    color: "#6366f1",
    fontWeight: "600"
  },

  // Botón de volver fijo siempre visible
  fixedBackButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 16,
    paddingTop: StatusBar.currentHeight || 44
  },
  backButtonFixed: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  backButtonFixedText: {
    fontSize: 24,
    color: "#6366f1",
    fontWeight: "600"
  }
});

export default AnimatedHeader;
