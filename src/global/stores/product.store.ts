/**
 * @proyect PruebaTecnica
 * @file stores/product.store.ts
 * @description Store de productos de la aplicación utilizando Zustand
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo define el store de productos de la aplicación, gestionando el estado
 * de los productos de FakeStore API y proporcionando acciones para modificarlo.
 * Utiliza Zustand con persistencia para mantener el estado entre sesiones.
 */

/** @import librerias */
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {zustandStorage} from "@stores/Storage";

/**
 * @constant storageName
 * @description Nombre del almacenamiento persistente para el store de productos
 */
const storageName = "product-storage";

/**
 * @constant API_URL
 * @description URL de la API FakeStore para obtener productos
 */
const API_URL = "https://fakestoreapi.com/products";

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
 * @typedef State
 * @description Definición del estado de productos
 */
type State = {
  /** Lista de productos cargados */
  products: Product[];
  /** Estado de carga de productos */
  loading: boolean;
  /** Error en la carga de productos */
  error: string | null;
  /** Indica si los productos han sido cargados al menos una vez */
  loaded: boolean;
  /** Timestamp de la última carga exitosa */
  lastLoadTime: number | null;
};

/**
 * @typedef Actions
 * @description Definición de las acciones para modificar el estado de productos
 */
type Actions = {
  /** Carga productos desde la API */
  loadProducts: () => Promise<void>;
  /** Establece los productos manualmente */
  setProducts: (products: Product[]) => void;
  /** Establece el estado de carga */
  setLoading: (loading: boolean) => void;
  /** Establece un error */
  setError: (error: string | null) => void;
  /** Obtiene un producto por ID */
  getProductById: (id: number) => Product | undefined;
  /** Obtiene productos por categoría */
  getProductsByCategory: (category: string) => Product[];
  /** Limpia el estado de productos */
  clearProducts: () => void;
  /** Refresca los productos (fuerza nueva carga) */
  refreshProducts: () => Promise<void>;
  /** Restablece el store al estado inicial */
  resetProductStore: () => void;
};

/**
 * @constant initialState
 * @description Estado inicial del store de productos
 */
const initialState: State = {
  products: [],
  loading: false,
  error: null,
  loaded: false,
  lastLoadTime: null
};

/**
 * @constant productStore
 * @description Store de productos de la aplicación
 *
 * Este store combina el estado y las acciones para manejar productos,
 * utilizando el middleware de persistencia de Zustand para almacenar
 * el estado entre sesiones.
 */
export const productStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      // Se inicializa con el estado inicial definido anteriormente
      ...initialState,

      /**
       * @function loadProducts
       * @description Carga productos desde la API FakeStore
       */
      loadProducts: async () => {
        try {
          set({loading: true, error: null});

          console.log("🛒 ---> ProductStore - Iniciando carga de productos...");

          const response = await fetch(API_URL);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const products: Product[] = await response.json();

          console.log(`✅ ---> ProductStore - ${products.length} productos cargados correctamente`);

          set({
            products,
            loading: false,
            error: null,
            loaded: true,
            lastLoadTime: Date.now()
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Error desconocido";

          console.error("❌ ---> ProductStore - Error al cargar productos:", errorMessage);

          set({
            loading: false,
            error: errorMessage,
            loaded: false
          });
        }
      },

      /**
       * @function setProducts
       * @description Establece los productos manualmente
       * @param {Product[]} products - Lista de productos a establecer
       */
      setProducts: (products) => set({
        products,
        loaded: true,
        lastLoadTime: Date.now()
      }),

      /**
       * @function setLoading
       * @description Establece el estado de carga
       * @param {boolean} loading - Estado de carga a establecer
       */
      setLoading: (loading) => set({loading}),

      /**
       * @function setError
       * @description Establece un error
       * @param {string | null} error - Error a establecer
       */
      setError: (error) => set({error}),

      /**
       * @function getProductById
       * @description Obtiene un producto por su ID
       * @param {number} id - ID del producto
       * @returns {Product | undefined} Producto encontrado o undefined
       */
      getProductById: (id) => {
        const {products} = get();
        return products.find(product => product.id === id);
      },

      /**
       * @function getProductsByCategory
       * @description Obtiene productos filtrados por categoría
       * @param {string} category - Categoría a filtrar
       * @returns {Product[]} Lista de productos de la categoría
       */
      getProductsByCategory: (category) => {
        const {products} = get();
        return products.filter(product =>
          product.category.toLowerCase() === category.toLowerCase()
        );
      },

      /**
       * @function clearProducts
       * @description Limpia el estado de productos
       */
      clearProducts: () => set({
        products: [],
        loaded: false,
        lastLoadTime: null
      }),

      /**
       * @function refreshProducts
       * @description Refresca los productos forzando una nueva carga
       */
      refreshProducts: async () => {
        const {loadProducts} = get();
        set({loaded: false}); // Resetear loaded para forzar nueva carga
        await loadProducts();
      },

      /**
       * @function resetProductStore
       * @description Restablece el store al estado inicial
       */
      resetProductStore: () => set(initialState)
    }),
    {
      name: storageName,
      storage: createJSONStorage(() => zustandStorage),
      // Solo persistir ciertos campos para optimizar
      partialize: (state) => ({
        products: state.products,
        loaded: state.loaded,
        lastLoadTime: state.lastLoadTime
      })
    }
  )
);
