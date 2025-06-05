/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/LoadingState.tsx
 * @description Componente de estado de carga
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, StatusBar} from "react-native";
import Animated, {
  FadeIn,
} from "react-native-reanimated";

const LoadingState: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      <Animated.Text
        style={styles.loadingText}
        entering={FadeIn.duration(600)}
      >
        Cargando productos...
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f8fafc"
  },
  loadingText: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 16
  }
});

export default LoadingState;
