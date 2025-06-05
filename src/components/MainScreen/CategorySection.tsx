/**
 * @proyect PruebaTecnica
 * @file components/MainScreen/CategorySection.tsx
 * @description Componente de sección de productos por categoría
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import Animated, {
  SlideInLeft,
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";

/** @import components */
import CategoryItem from "./CategoryItem";

/** @import types */
import type {Product} from "@stores/product.store";

interface CategorySectionProps {
  categoryName: string;
  products: Product[];
  categoryIndex: number;
  onItemPress: (item: Product) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categoryName,
  products,
  categoryIndex,
  onItemPress
}) => {
  const capitalizeCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const renderCategoryItem = ({item, index}: {item: Product; index: number}) => (
    <CategoryItem
      item={item}
      index={index}
      categoryIndex={categoryIndex}
      onPress={onItemPress}
    />
  );

  const itemSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInLeft.delay(categoryIndex * 300)}
    >
      <Animated.View
        style={styles.header}
        entering={FadeIn.delay(categoryIndex * 300 + 100)}
      >
        <Text style={styles.title}>{capitalizeCategory(categoryName)}</Text>
        <Animated.View
          style={styles.countContainer}
          entering={ZoomIn.delay(categoryIndex * 300 + 200)}
        >
          <Text style={styles.count}>{products.length} productos</Text>
        </Animated.View>
      </Animated.View>

      <FlatList
        data={products}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => `${categoryName}-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={itemSeparator}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b"
  },
  countContainer: {
    // Container para animación del contador
  },
  count: {
    fontSize: 14,
    color: "#64748b",
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  listContainer: {
    paddingLeft: 20,
    paddingRight: 4
  },
  itemSeparator: {
    width: 12
  }
});

export default CategorySection;
