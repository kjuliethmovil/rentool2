/**
 * Archivo: src/server.ts
 * Autor: Karyn Movil Estacio
 * Descripción: Punto de entrada principal del servidor con Node.js y TypeScript.
 */

import { App } from './config/index';

async function main() {
  const app = new App();
  await app.listen();
}

main();
