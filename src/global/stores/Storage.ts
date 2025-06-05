/**
 * @proyect PruebaTecnica
 * @file stores/Storage.ts
 * @description Utilidades para el manejo de la persistencia de los stores
 * @author Guillermo Corredor
 * @created 5/06/2025
 *
 * @note
 * Este archivo proporciona funciones y configuraciones para el almacenamiento
 * encriptado de datos utilizando MMKV y CryptoJS, adaptado para su uso con Zustand.
 */

/** @import librerias */
import Config from "react-native-config";
import {MMKV} from "react-native-mmkv";
import {AES, enc} from "react-native-crypto-js";
import type {StateStorage} from "zustand/middleware";

/**
 * @constant storage
 * @description Instancia de MMKV para el almacenamiento local
 */
const storage = new MMKV();

/**
 * @constant encryptionKey
 * @description Clave de encriptación para los stores
 */
const encryptionKey = Config.APP_ENCRIP_KEY;

if (!encryptionKey) {
  throw new Error("APP_ENCRIP_KEY no está definida en las variables de entorno");
}

console.log("🔐 ---> Storage ~ Usando clave de encriptación de variables de entorno");

/**
 * @interface EncryptedData
 * @description Interfaz para los datos encriptados
 */
interface EncryptedData {
  [key: string]: any;
}

/**
 * @function encryptData
 * @description Encripta los datos utilizando AES
 * @param {EncryptedData} data - Datos a encriptar
 * @returns {string} Datos encriptados en formato string
 */
const encryptData = (data: EncryptedData): string => {
  return AES.encrypt(JSON.stringify(data), encryptionKey).toString();
};

/**
 * @function decryptData
 * @description Desencripta los datos utilizando AES
 * @param {string} encryptedData - Datos encriptados
 * @returns {EncryptedData} Datos desencriptados
 */
const decryptData = (encryptedData: string): EncryptedData => {
  const bytes = AES.decrypt(encryptedData, encryptionKey);
  return JSON.parse(bytes.toString(enc.Utf8));
};

/**
 * @constant zustandStorage
 * @description Implementación de StateStorage para Zustand con encriptación
 */
export const zustandStorage: StateStorage = {
  /**
   * @function setItem
   * @description Almacena un item encriptado
   * @param {string} name - Nombre del item
   * @param {string} value - Valor del item (en formato JSON string)
   */
  setItem: (name: string, value: string): void => {
    try {
      const encryptedValue = encryptData(JSON.parse(value));
      storage.set(name, encryptedValue);
    } catch (error) {
      console.error("🧨 ---> Storage ~ Error al almacenar datos:", error);
    }
  },

  /**
   * @function getItem
   * @description Recupera y desencripta un item
   * @param {string} name - Nombre del item
   * @returns {string | null} Valor desencriptado del item o null si no existe
   */
  getItem: (name: string): string | null => {
    try {
      const encryptedValue = storage.getString(name);
      if (encryptedValue) {
        return JSON.stringify(decryptData(encryptedValue));
      }
    } catch (error) {
      console.error("🧨 ---> Storage ~ Error al recuperar datos:", error);
    }
    return null;
  },

  /**
   * @function removeItem
   * @description Elimina un item del almacenamiento
   * @param {string} name - Nombre del item a eliminar
   */
  removeItem: (name) => {
    return storage.delete(name);
  }
};
