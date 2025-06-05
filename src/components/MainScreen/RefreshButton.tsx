/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/RefreshButton.tsx
 * @description Componente de botón de actualizar
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({onRefresh}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onRefresh} activeOpacity={0.7}>
      <Text style={styles.text}>🔄</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
    backgroundColor: "#6366f1",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  text: {
    fontSize: 16,
    color: "#ffffff"
  }
});

export default RefreshButton;
