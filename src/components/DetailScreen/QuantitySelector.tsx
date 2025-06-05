/**
 * @proyect PruebaTecnica
 * @file components/DetailScreen/QuantitySelector.tsx
 * @description Componente selector de cantidad
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
  SlideInUp,
} from "react-native-reanimated";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (increment: boolean) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange
}) => {
  return (
    <Animated.View style={styles.container} entering={SlideInUp.delay(1200)}>
      <Text style={styles.label}>Cantidad</Text>
      <View style={styles.selector}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onQuantityChange(false)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{quantity}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onQuantityChange(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 4,
    alignSelf: 'flex-start'
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6366f1"
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center'
  }
});

export default QuantitySelector;
