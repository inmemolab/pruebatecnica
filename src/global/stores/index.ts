/**
 * @proyect PruebaTecnica
 * @file stores/index.ts
 * @description Exportaciones centrales de stores de Zustand
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

// App Store
export {appStore} from "./app.store";

// Product Store
export {productStore, type Product} from "./product.store";

// Storage utility
export {zustandStorage} from "./Storage";
