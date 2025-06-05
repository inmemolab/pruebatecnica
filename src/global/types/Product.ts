/**
 * @proyect PruebaTecnica
 * @file Product.ts
 * @description Tipos TypeScript para productos de FakeStore API
 * @author Guillermo Corredor
 * @created 5/06/2025
 */

/**
 * @interface Product
 * @description Estructura de un producto de FakeStore API
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

/**
 * @interface ProductsState
 * @description Estado para el manejo de productos
 */
export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

/**
 * @type ProductCategory
 * @description Categorías disponibles en FakeStore API
 */
export type ProductCategory =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

/**
 * @interface ApiResponse
 * @description Respuesta genérica de la API
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}