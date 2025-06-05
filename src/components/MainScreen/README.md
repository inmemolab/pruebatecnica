# MainScreen - Componentes Modulares

Esta carpeta contiene los componentes modulares para la pantalla principal (`MainScreen`) de la aplicación PruebaTecnica.

## 📁 Estructura de Componentes

### 🎯 Componentes Principales

#### `FeaturedItem.tsx`
- **Propósito**: Componente individual para productos destacados
- **Características**: 
  - Animaciones de entrada escalonadas
  - Card con imagen, precio, categoría y descripción
  - Efectos de sombra y glassmorphism
- **Props**: `item`, `index`, `onPress`

#### `CategoryItem.tsx`
- **Propósito**: Componente individual para productos por categoría
- **Características**:
  - Animaciones con rotación y escala
  - Card compacta con imagen y precio
  - Diseño responsive de 140px de ancho
- **Props**: `item`, `index`, `categoryIndex`, `onPress`

### 🎨 Secciones de UI

#### `ProductHeader.tsx`
- **Propósito**: Header principal con título y estadísticas
- **Características**:
  - Cuenta total de productos y categorías
  - Botón de prueba ErrorBoundary (solo desarrollo)
  - Animaciones de entrada
- **Props**: `totalProducts`, `totalCategories`, `onTestError`, `showTestButton`

#### `FeaturedSection.tsx`
- **Propósito**: Sección completa de productos destacados
- **Características**:
  - FlatList horizontal con snap
  - Título animado con emoji
  - Manejo de separadores
- **Props**: `products`, `onItemPress`

#### `CategorySection.tsx`
- **Propósito**: Sección completa por categoría
- **Características**:
  - Header con nombre de categoría y contador
  - FlatList horizontal de productos
  - Animaciones escalonadas por categoría
- **Props**: `categoryName`, `products`, `categoryIndex`, `onItemPress`

### 📱 Estados de la App

#### `LoadingState.tsx`
- **Propósito**: Pantalla de carga
- **Características**:
  - Diseño centrado y minimalista
  - StatusBar configurado
  - Animación de fade-in

#### `EmptyState.tsx`
- **Propósito**: Estado vacío o de error
- **Características**:
  - Diferencia entre estado vacío y error
  - Botón de reintento condicional
  - Animaciones de emoji y texto
- **Props**: `hasError`, `onRetry`

#### `RefreshButton.tsx`
- **Propósito**: Botón flotante de actualización
- **Características**:
  - Posición absoluta en esquina superior derecha
  - Diseño circular con sombra
  - Emoji de recarga
- **Props**: `onRefresh`

## 🏗️ Arquitectura Modular

### ✅ Ventajas de la Modularización

1. **Reutilización**: Cada componente puede usarse independientemente
2. **Mantenibilidad**: Código más fácil de debuggear y actualizar
3. **Testeo**: Cada componente se puede testear por separado
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **Separación de Responsabilidades**: Cada componente tiene un propósito específico

### 📦 Exportaciones

El archivo `index.ts` exporta todos los componentes para importación limpia:

```typescript
import {
  ProductHeader,
  FeaturedSection,
  CategorySection,
  LoadingState,
  EmptyState,
  RefreshButton
} from "../components/MainScreen";
```

### 🎭 Animaciones Conservadas

Todas las animaciones originales se mantuvieron:
- **FeaturedItem**: Animaciones escalonadas con spring y timing
- **CategoryItem**: Rotación y escala por categoría
- **Secciones**: SlideIn, FadeIn, ZoomIn con delays apropiados
- **Estados**: Animaciones de entrada para loading y empty

### 🔧 Patrón de Props

Todos los componentes siguen patrones consistentes:
- Props tipadas con TypeScript
- Callbacks para eventos (`onPress`, `onRefresh`, etc.)
- Props opcionales con valores por defecto
- Separación entre datos y comportamiento

## 🚀 Uso en MainScreen

El `MainScreen.tsx` ahora es mucho más limpio y legible:

```typescript
return (
  <View style={styles.container}>
    <ScrollView>
      <ProductHeader {...headerProps} />
      <FeaturedSection {...featuredProps} />
      <View>
        {categories.map((category, index) => (
          <CategorySection {...categoryProps} />
        ))}
      </View>
    </ScrollView>
    <RefreshButton onRefresh={handleRefresh} />
  </View>
);
```

Esta estructura modular facilita el mantenimiento y permite future expansiones del código de manera ordenada y escalable. 
