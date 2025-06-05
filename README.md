# 📱 Prueba Técnica React Native Senior

Una aplicación React Native robusta y escalable que demuestra las mejores prácticas de desarrollo para aplicaciones móviles empresariales.

## 🚀 Características Principales

- **Arquitectura Modular**: Implementación de Atomic Design para componentes escalables
- **TypeScript**: Tipado fuerte para mayor robustez y mantenibilidad
- **Navegación Avanzada**: Stack, Tabs y Drawer navigation con React Navigation v7
- **Gestión de Estado**: Zustand para un estado global eficiente y persistente
- **API Integration**: Cliente HTTP robusto con Axios e interceptores
- **Animaciones**: React Native Reanimated 3 para animaciones fluidas
- **Almacenamiento**: AsyncStorage y MMKV para persistencia de datos
- **Testing**: Configuración completa con Jest y Testing Library
- **Error Handling**: Boundary de errores y manejo global de excepciones
- **Internacionalización**: Soporte multi-idioma preparado

## 🏗️ Arquitectura del Proyecto

```
src/
├── atoms/                    # Componentes atómicos básicos (botones, inputs, texto)
├── atoms-molecule/           # Componentes moleculares (cards, forms, modals)
├── core-app/                 # Núcleo de la aplicación (providers, configuración)
├── navigation/               # Configuración de navegación y rutas
└── global/                   # Recursos globales compartidos
    ├── assets/               # Recursos estáticos (imágenes, iconos)
    │   ├── fonts/           # Fuentes personalizadas
    │   └── svg/             # Iconos SVG
    ├── theme/                # Sistema de temas y estilos
    ├── types/                # Definiciones TypeScript globales
    └── utils/                # Funciones utilitarias y helpers
```

## 🛠️ Tecnologías Utilizadas

### Core

- **React Native**: 0.78.2
- **React**: 19.0.0
- **TypeScript**: 5.8.3

### Navegación

- **@react-navigation/native**: ^7.1.10
- **@react-navigation/stack**: ^7.3.3
- **@react-navigation/bottom-tabs**: ^7.3.14
- **@react-navigation/drawer**: ^7.4.1

### Estado y Datos

- **Zustand**: ^5.0.5
- **Axios**: ^1.9.0
- **@react-native-async-storage/async-storage**: ^2.1.2
- **react-native-mmkv**: ^3.2.0

### UI y Animaciones

- **react-native-reanimated**: 3.17.2
- **react-native-gesture-handler**: ^2.25.0
- **react-native-svg**: ^15.12.0
- **react-native-linear-gradient**: ^2.8.3

### Desarrollo

- **ESLint**: ^9.28.0
- **Prettier**: 3.5.3
- **Husky**: ^9.1.7
- **Jest**: ^29.7.0

## 📋 Requisitos Previos

- **Node.js**: >= 18.0.0
- **npm** o **Yarn**
- **React Native CLI**
- **Android Studio** (para Android)
- **Xcode** (para iOS - solo macOS)

## ⚡ Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd pruebatecnica
```

### 2. Instalar dependencias

```bash
# Usando npm
npm install

# O usando Yarn
yarn install
```

### 3. Configuración iOS (solo macOS)

```bash
# Instalar CocoaPods dependencies
cd ios && pod install && cd ..
```

### 4. Iniciar Metro Bundler

```bash
# Usando npm
npm start

# O usando Yarn
yarn start
```

### 5. Ejecutar la aplicación

#### Android

```bash
# Usando npm
npm run android

# O usando Yarn
yarn android
```

#### iOS

```bash
# Usando npm
npm run ios

# O usando Yarn
yarn ios
```

## 🧹 Scripts Disponibles

### Desarrollo

- `npm start` - Inicia Metro Bundler
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS

### Calidad de Código

- `npm run lint` - Ejecuta ESLint
- `npm run format` - Formatea código con Prettier
- `npm run format:all` - Formatea todos los archivos TypeScript/JavaScript

### Testing

- `npm test` - Ejecuta tests con Jest

### Limpieza

- `npm run clean:node` - Limpia node_modules y reinstala
- `npm run clean:android` - Limpieza completa de Android
- `npm run clean:ios` - Limpieza completa de iOS
- `npm run pod:reset` - Resetea CocoaPods en iOS

## 📱 Funcionalidades Implementadas

### 🔐 Autenticación

- Sistema de login/registro completo
- Persistencia de sesión
- Recuperación de contraseña
- Gestión de tokens JWT

### 🧭 Navegación

- Stack Navigation para flujos lineales
- Tab Navigation para navegación principal
- Drawer Navigation para menú lateral
- Deep linking configurado

### 📊 Gestión de Estado

- Store global con Zustand
- Persistencia automática
- Estados de loading y error
- Optimistic updates

### 🌐 API Integration

- Cliente HTTP robusto
- Interceptores de request/response
- Manejo de errores centralizado
- Refresh de tokens automático

### 🎨 UI/UX

- Sistema de temas dinámico
- Componentes reutilizables
- Animaciones fluidas
- Diseño responsive

### 📱 Características Nativas

- Almacenamiento seguro
- Gestión de permisos
- Navegación por gestos
- Safe Area handling

## 🔧 Configuración de Alias

El proyecto utiliza alias de importación para una mejor organización:

```typescript
// Ejemplos de uso
import {Button} from "@atoms/Button";
import {LoginForm} from "@atoms-molecule/LoginForm";
import {theme} from "@theme/index";
import {User} from "@types/index";
import {formatDate} from "@utils/dateUtils";
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con coverage
npm test -- --coverage
```

## 📝 Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuthStore.ts`)
- **Utilities**: camelCase (`formatUtils.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Estructura de Archivos

- Cada componente en su propia carpeta con `index.ts`
- Tests junto a los archivos correspondientes (`.test.tsx`)
- Tipos en archivos separados cuando son complejos

## 🚀 Deployment

### Android

```bash
# Build de producción
npx react-native build-android --mode=release
```

### iOS

```bash
# Build de producción
npx react-native build-ios --mode=Release
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Guillermo Corredor**

- Email: [tu-email@example.com]
- LinkedIn: [tu-linkedin]
- GitHub: [tu-github]

## 📞 Soporte

Si tienes alguna pregunta o problema:

1. Revisa los [Issues existentes](../../issues)
2. Crea un [nuevo Issue](../../issues/new)
3. Contacta al autor directamente

---

⭐ **¡No olvides dar una estrella si este proyecto te fue útil!**

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```
