# 📱 Prueba Técnica React Native - Catálogo de Productos

Una aplicación React Native que presenta un catálogo de productos con navegación fluida, animaciones profesionales y arquitectura modular.

## 🚀 Instrucciones para Ejecutar la Aplicación

### Requisitos Previos
- **Node.js**: >= 18.0.0
- **React Native CLI**: `npm install -g @react-native-community/cli`
- **CocoaPods**: `gem install cocoapods` (solo para iOS)

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar iOS (solo macOS)
```bash
cd ios && pod install && cd ..
```

### 3. Ejecutar la Aplicación

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

### 4. Iniciar Metro (si no se inicia automáticamente)
```bash
npm start
```

## 🏗️ Decisiones Técnicas Tomadas

### 1. **Arquitectura Modular**
- **Decisión**: Implementar separación de componentes por pantallas
- **Razón**: Facilita el mantenimiento, testing y escalabilidad
- **Estructura**:
  ```
  src/components/
  ├── MainScreen/     # 8 componentes modulares
  ├── DetailScreen/   # 8 componentes modulares
  ```

### 2. **Gestión de Estado**
- **Decisión**: Zustand para estado global
- **Razón**: Más liviano que Redux, sintaxis simple, excelente TypeScript support
- **Implementación**: Store centralizado para productos y navegación

### 3. **Animaciones**
- **Decisión**: React Native Reanimated 3
- **Razón**: Animaciones en UI thread, mejor performance que Animated API
- **Características**:
  - Animaciones parallax en DetailScreen
  - Transiciones escalonadas en MainScreen
  - Efectos de scroll y gestos fluidos

### 4. **Navegación**
- **Decisión**: React Navigation v7
- **Razón**: Estándar de la industria, soporte completo para TypeScript
- **Configuración**: Stack Navigator con transiciones personalizadas

### 5. **Tipado Fuerte**
- **Decisión**: TypeScript strict mode
- **Razón**: Reduce errores en runtime, mejor DX, mantenibilidad
- **Implementación**: Interfaces para todos los componentes y stores

### 6. **Optimización de Performance**
- **Decisión**: FlatList con optimizaciones
- **Razón**: Renderizado eficiente de listas grandes
- **Características**:
  - `getItemLayout` para mejor scroll performance
  - `removeClippedSubviews` para memoria
  - `maxToRenderPerBatch` controlado

### 7. **API Integration**
- **Decisión**: Fake Store API con Axios
- **Razón**: Datos realistas para demostración
- **Implementación**: Service layer con error handling

### 8. **Componentes Reutilizables**
- **Decisión**: Atomic Design principles
- **Razón**: Consistencia visual, reutilización, testing independiente
- **Ejemplos**:
  - `QuantitySelector` - Reutilizable en múltiples pantallas
  - `ProductCard` - Consistente en diferentes contextos
  - `LoadingState` - Estado global unificado

### 9. **Manejo de Estados**
- **Decisión**: Estados específicos (loading, error, empty)
- **Razón**: UX profesional, feedback claro al usuario
- **Implementación**: Componentes dedicados para cada estado

### 10. **Styling Strategy**
- **Decisión**: StyleSheet con constantes de diseño
- **Razón**: Performance nativa, IntelliSense, tipado
- **Características**:
  - Paleta de colores consistente
  - Spacing system estandarizado
  - Responsive design patterns

## 📊 Métricas de Mejora Logradas

### Modularización Exitosa
- **MainScreen**: 644 → 145 líneas (77% reducción)
- **DetailScreen**: 813 → 228 líneas (72% reducción)
- **Total componentes**: 16 componentes modulares creados
- **Reutilización**: 5+ componentes reutilizables

### Performance Optimizations
- FlatList optimizado con `getItemLayout`
- Animaciones en UI thread con Reanimated
- Lazy loading de imágenes
- Gesture handling optimizado

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia Metro Bundler
npm run android        # Ejecuta en Android
npm run ios           # Ejecuta en iOS

# Calidad de código
npm run lint          # Ejecuta ESLint
npm run format        # Formatea con Prettier

# Limpieza
npm run clean         # Limpia cache y reinstala
```

## 📱 Funcionalidades Implementadas

### ✅ Pantalla Principal (MainScreen)
- Lista de productos con categorías
- Sección de productos destacados
- Animaciones de entrada escalonadas
- Pull-to-refresh y estados de carga
- Navegación fluida a detalles

### ✅ Pantalla de Detalle (DetailScreen)
- Hero image con efecto parallax
- Header animado dual (fijo + scroll)
- Información completa del producto
- Selector de cantidad interactivo
- Botones flotantes (favorito + carrito)
- Animaciones de entrada/salida

### ✅ Características Técnicas
- TypeScript strict mode
- Arquitectura modular escalable
- Animaciones nativas fluidas
- Estados de error y loading
- Navegación con parámetros tipados

## 🎨 Diseño y UX

- **Tema**: Moderno con gradientes y glassmorphism
- **Colores**: Paleta profesional con acentos violeta/índigo
- **Tipografía**: Jerarquía clara con pesos variables
- **Espaciado**: Sistema consistente de 8px grid
- **Componentes**: Cards con sombras, bordes redondeados
- **Animaciones**: Transiciones suaves y naturales

## 👨‍💻 Autor

**Guillermo Corredor**
- Arquitectura modular implementada
- Optimizaciones de performance aplicadas
- Sistema de animaciones completo desarrollado

---

**Nota**: Esta prueba técnica demuestra capacidades avanzadas en React Native, incluyendo arquitectura escalable, animaciones profesionales y optimizaciones de performance.
