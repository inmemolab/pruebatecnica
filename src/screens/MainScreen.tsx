/**
 * @proyect PruebaTecnica
 * @file MainScreen.tsx
 * @description Pantalla principal de la aplicación (modular)
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React, {useMemo, useEffect, useState} from "react";
import {View, StyleSheet, StatusBar, ScrollView} from "react-native";

/** @import navigation */
import {navigate} from "@navigation/navigationRef";
import {RouteScreens} from "@navigation/routes";

/** @import stores */
import {productStore, type Product} from "@stores/product.store";

/** @import components */
import {
  ProductHeader,
  FeaturedSection,
  CategorySection,
  LoadingState,
  EmptyState,
  RefreshButton
} from "../components/MainScreen";

const MainScreen: React.FC = () => {
  // Obtener estado y acciones del store
  const {products, loading, error, refreshProducts} = productStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Agrupar productos por categoría
  const productsByCategory = useMemo(() => {
    const categories: {[key: string]: Product[]} = {};

    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });

    return categories;
  }, [products]);

  // Obtener productos destacados (primeros 10)
  const featuredProducts = useMemo(() => products.slice(0, 10), [products]);

  useEffect(() => {
    if (products.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [products.length, isInitialLoad]);

  const handleItemPress = (item: Product) => {
    navigate(RouteScreens.Detail, {
      id: item.id.toString(),
      title: item.title
    });
  };

  const handleRefresh = async () => {
    setIsInitialLoad(true);
    await refreshProducts();
  };

  // Función para probar el ErrorBoundary (solo en desarrollo)
  const handleTestError = () => {
    throw new Error("Error de prueba para demostrar ErrorBoundary");
  };

  // Estado de carga
  if (loading) {
    return <LoadingState />;
  }

  // Estado vacío
  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
        <EmptyState hasError={!!error} onRetry={handleRefresh} />
      </View>
    );
  }

  // Contenido principal
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ProductHeader
          totalProducts={products.length}
          totalCategories={Object.keys(productsByCategory).length}
          onTestError={handleTestError}
          showTestButton={false}
        />

        {/* Productos Destacados */}
        <FeaturedSection
          products={featuredProducts}
          onItemPress={handleItemPress}
        />

        {/* Productos por Categoría */}
        <View style={styles.categoriesContainer}>
          {Object.entries(productsByCategory).map(([categoryName, categoryProducts], categoryIndex) => (
            <CategorySection
              key={categoryName}
              categoryName={categoryName}
              products={categoryProducts}
              categoryIndex={categoryIndex}
              onItemPress={handleItemPress}
            />
          ))}
        </View>
      </ScrollView>

      {/* Botón de refresh flotante */}
      <RefreshButton onRefresh={handleRefresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  scrollContainer: {
    flex: 1
  },
  categoriesContainer: {
    paddingBottom: 30
  }
});

export default MainScreen;
