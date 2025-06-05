/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/FeaturedSection.tsx
 * @description Componente de sección de productos destacados
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, StyleSheet, FlatList, Dimensions} from "react-native";
import Animated, {
  SlideInLeft,
  FadeIn,
} from "react-native-reanimated";

/** @import components */
import FeaturedItem from "./FeaturedItem";

/** @import types */
import type {Product} from "@stores/product.store";

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;

interface FeaturedSectionProps {
  products: Product[];
  onItemPress: (item: Product) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({products, onItemPress}) => {
  const renderFeaturedItem = ({item, index}: {item: Product; index: number}) => (
    <FeaturedItem
      item={item}
      index={index}
      onPress={onItemPress}
    />
  );

  const itemSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInLeft.delay(300)}
    >
      <Animated.Text
        style={styles.sectionTitle}
        entering={FadeIn.delay(500)}
      >
        ✨ Productos Destacados
      </Animated.Text>

      <FlatList
        data={products}
        renderItem={renderFeaturedItem}
        keyExtractor={(item) => `featured-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={itemSeparator}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
    paddingHorizontal: 20
  },
  listContainer: {
    paddingLeft: 20,
    paddingRight: 4
  },
  itemSeparator: {
    width: 16
  }
});

export default FeaturedSection;
