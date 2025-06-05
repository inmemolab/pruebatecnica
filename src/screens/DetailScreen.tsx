/**
 * @proyect PruebaTecnica
 * @file DetailScreen.tsx
 * @description Pantalla de detalle de producto (modular)
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

import React, {useEffect, useState} from "react";
import {View, StyleSheet, ScrollView, StatusBar, Alert, Dimensions} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
} from "react-native-reanimated";

/** @import navigation */
import {useRoute} from "@react-navigation/native";
import {goBackWithDelay} from "@navigation/navigationRef";

/** @import stores */
import {productStore} from "@stores/product.store";

/** @import components */
import {
  AnimatedHeader,
  HeroSection,
  ProductInfo,
  ProductDescription,
  QuantitySelector,
  ProductFeatures,
  FloatingActionButtons,
  ProductNotFound
} from "../components/DetailScreen";

const {height: screenHeight} = Dimensions.get("window");

const DetailScreen: React.FC = () => {
  const route = useRoute();
  const {id} = route.params as {id: string; title: string};

  // Estados locales
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Obtener función del store para buscar producto por ID
  const {getProductById} = productStore();
  const product = getProductById(Number(id));

  // Valores compartidos para animaciones
  const scrollY = useSharedValue(0);
  const headerOpacity = useSharedValue(0);
  const imageScale = useSharedValue(0.8);
  const contentOpacity = useSharedValue(0);
  const fabScale = useSharedValue(0);

  // Scroll handler animado
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      headerOpacity.value = interpolate(
        event.contentOffset.y,
        [0, 100],
        [0, 1],
        'clamp'
      );
    },
  });

  useEffect(() => {
    // Animaciones de entrada escalonadas
    imageScale.value = withDelay(300, withSpring(1, {damping: 15, stiffness: 100}));
    contentOpacity.value = withDelay(600, withTiming(1, {duration: 800}));
    fabScale.value = withDelay(1000, withSpring(1, {damping: 12, stiffness: 120}));
  }, []);

  const handleGoBack = () => {
    // Animación de salida antes de navegar
    imageScale.value = withTiming(0.8, {duration: 200});
    contentOpacity.value = withTiming(0, {duration: 200});
    fabScale.value = withTiming(0, {duration: 200});

    // Navegar con delay para completar animación
    goBackWithDelay(250);
  };

  const handleAddToCart = () => {
    Alert.alert(
      "Producto agregado",
      `${product?.title} se agregó al carrito (${quantity} unidades)`,
      [{text: "OK", style: "default"}]
    );
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Animación del botón favorito
    fabScale.value = withSequence(
      withTiming(1.3, {duration: 150}),
      withTiming(1, {duration: 150})
    );
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Función para formatear precio
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  // Estilos animados para el contenido
  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [
      {
        translateY: interpolate(
          contentOpacity.value,
          [0, 1],
          [30, 0]
        )
      }
    ],
  }));

  // Si no se encuentra el producto
  if (!product) {
    return <ProductNotFound onGoBack={handleGoBack} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header animado */}
      <AnimatedHeader
        title={product.title}
        headerOpacity={headerOpacity}
        onGoBack={handleGoBack}
      />

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero Image Section */}
        <HeroSection
          product={product}
          scrollY={scrollY}
          imageScale={imageScale}
        />

        {/* Content Section */}
        <Animated.View style={[styles.contentContainer, animatedContentStyle]}>
          {/* Product Info */}
          <ProductInfo product={product} />

          {/* Description */}
          <ProductDescription description={product.description} />

          {/* Quantity Selector */}
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />

          {/* Features Section */}
          <ProductFeatures />

          {/* Spacer for FAB */}
          <View style={styles.bottomSpacer} />
        </Animated.View>
      </Animated.ScrollView>

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        isFavorite={isFavorite}
        quantity={quantity}
        totalPrice={formatPrice(product.price * quantity)}
        fabScale={fabScale}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  scrollView: {
    flex: 1
  },
  contentContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    minHeight: screenHeight * 0.6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12
  },
  bottomSpacer: {
    height: 120 // Space for FAB
  }
});

export default DetailScreen;
