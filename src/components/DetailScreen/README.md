# DetailScreen - Componentes Modulares

Esta carpeta contiene los componentes modulares para la pantalla de detalle (`DetailScreen`) de la aplicación PruebaTecnica.

## 📁 Estructura de Componentes

### 🎯 Componentes de Navegación

#### `AnimatedHeader.tsx`
- **Propósito**: Header animado con botones de navegación
- **Características**:
  - Botón de volver fijo siempre visible
  - Header con parallax que aparece al hacer scroll
  - Botón de compartir
  - Animaciones de opacity basadas en scroll
- **Props**: `title`, `headerOpacity`, `onGoBack`

### 🖼️ Sección Visual

#### `HeroSection.tsx`  
- **Propósito**: Sección principal con imagen del producto
- **Características**:
  - Imagen con efectos parallax
  - Gradiente de fondo
  - Placeholder mientras carga la imagen
  - Animaciones de escala y translateY
- **Props**: `product`, `scrollY`, `imageScale`

### 📱 Información del Producto

#### `ProductInfo.tsx`
- **Propósito**: Información básica del producto
- **Características**:
  - Badge de categoría animado
  - Título principal
  - Precio con moneda
  - Sistema de rating con estrellas
  - Animaciones de entrada escalonadas
- **Props**: `product`

#### `ProductDescription.tsx`
- **Propósito**: Descripción detallada del producto
- **Características**:
  - Título de sección
  - Texto de descripción formateado
  - Animación de fade-in
- **Props**: `description`

### 🛠️ Componentes Interactivos

#### `QuantitySelector.tsx`
- **Propósito**: Selector de cantidad del producto
- **Características**:
  - Botones + y - con design system
  - Valor central destacado
  - Validación de cantidad mínima
  - Animación slide-up
- **Props**: `quantity`, `onQuantityChange`

#### `ProductFeatures.tsx`
- **Propósito**: Lista de características del producto
- **Características**:
  - Lista de beneficios (envío, garantía, soporte)
  - Iconos de verificación
  - Diseño en card con background
  - Animación slide-right
- **Props**: Ninguna (datos estáticos)

### 🎭 Componentes de Acción

#### `FloatingActionButtons.tsx`
- **Propósito**: Botones flotantes de acción principal
- **Características**:
  - Botón de favorito con toggle animado
  - Botón de agregar al carrito con gradiente
  - Precio total calculado dinámicamente
  - Animaciones de escala
- **Props**: `isFavorite`, `quantity`, `totalPrice`, `fabScale`, `onToggleFavorite`, `onAddToCart`

### 📱 Estados de Error

#### `ProductNotFound.tsx`
- **Propósito**: Pantalla de producto no encontrado
- **Características**:
  - Header simple con botón de volver
  - Mensaje de error con emoji
  - Botón de acción para volver a la tienda
  - Animaciones de entrada escalonadas
- **Props**: `onGoBack`

## 🏗️ Arquitectura Modular

### ✅ Beneficios de la Modularización

1. **Separación de Responsabilidades**: Cada componente maneja una función específica
2. **Reutilización**: Componentes como `QuantitySelector` pueden usarse en otras pantallas
3. **Mantenibilidad**: Bugs y updates se localizan fácilmente
4. **Testeo**: Cada componente se puede testear independientemente
5. **Escalabilidad**: Fácil agregar nuevas secciones o modificar existentes
6. **Performance**: Optimizaciones específicas por componente

### 📦 Exportaciones Centralizadas

El archivo `index.ts` exporta todos los componentes:

```typescript
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
```

### 🎭 Sistema de Animaciones

#### **Animaciones Compartidas**
- `scrollY`: Controla efectos parallax
- `headerOpacity`: Transición del header
- `imageScale`: Animación de entrada de la imagen
- `contentOpacity`: Fade-in del contenido
- `fabScale`: Animaciones de los botones flotantes

#### **Animaciones por Componente**
- **ProductInfo**: SlideInLeft, SlideInRight, ZoomIn con delays escalonados
- **ProductDescription**: FadeIn simple
- **QuantitySelector**: SlideInUp 
- **ProductFeatures**: SlideInRight
- **FloatingActionButtons**: Scale con animación de toggle

### 🔧 Patrones de Props

#### **Props de Datos**
```typescript
product: Product          // Datos del producto
quantity: number         // Cantidad seleccionada
isFavorite: boolean     // Estado de favorito
```

#### **Props de Animación**
```typescript
scrollY: Animated.SharedValue<number>        // Valor de scroll
headerOpacity: Animated.SharedValue<number>  // Opacity del header
imageScale: Animated.SharedValue<number>     // Escala de imagen
fabScale: Animated.SharedValue<number>       // Escala de FAB
```

#### **Props de Callbacks**
```typescript
onGoBack: () => void                         // Navegación
onQuantityChange: (increment: boolean) => void // Cambio de cantidad
onToggleFavorite: () => void                 // Toggle favorito
onAddToCart: () => void                      // Agregar al carrito
```

## 🚀 Uso en DetailScreen

El `DetailScreen.tsx` ahora es mucho más limpio:

```typescript
return (
  <View style={styles.container}>
    <AnimatedHeader {...headerProps} />
    
    <Animated.ScrollView onScroll={scrollHandler}>
      <HeroSection {...heroProps} />
      
      <Animated.View style={contentStyle}>
        <ProductInfo product={product} />
        <ProductDescription description={product.description} />
        <QuantitySelector {...quantityProps} />
        <ProductFeatures />
        <View style={styles.bottomSpacer} />
      </Animated.View>
    </Animated.ScrollView>
    
    <FloatingActionButtons {...fabProps} />
  </View>
);
```

### 📊 Métricas de Mejora

- **Antes**: 813 líneas de código
- **Después**: ~180 líneas de código
- **Reducción**: 78% del código original
- **Componentes**: 8 componentes modulares
- **Mantenibilidad**: Significativamente mejorada

### 🔮 Extensibilidad Futura

La estructura modular permite fácilmente:
- Agregar nuevas secciones (reviews, productos relacionados)
- Modificar componentes individuales sin afectar otros
- Implementar variantes de componentes (ej: diferentes estilos de botones)
- Crear tests unitarios específicos
- Optimizar performance por componente

Esta modularización hace el código más profesional, mantenible y escalable, siguiendo las mejores prácticas de React Native y arquitectura de componentes. 
