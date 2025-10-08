/**
 * Archivo: src/faker/populate_data.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Genera datos de ejemplo para poblar la base de datos de Rentool.
 */

import { faker } from "@faker-js/faker";
import { sequelize } from "../database/connection"; // ✅ importante
import { Client } from "../models/Client";
import { Provider } from "../models/Provider";
import { Category } from "../models/Category";
import { Equipment } from "../models/Equipment";
import { Contract } from "../models/Contract";
import { ContractDetail } from "../models/ContractDetail";

async function createFakeData() {
  console.log("🌱 Iniciando carga de datos falsos...");

  try {
    // ✅ Conexión con la base de datos
    await sequelize.authenticate();
    console.log("✅ Conexión establecida correctamente con la base de datos.");

    // Limpiar tablas opcionalmente
    await Promise.all([
      ContractDetail.destroy({ where: {} }),
      Contract.destroy({ where: {} }),
      Equipment.destroy({ where: {} }),
      Category.destroy({ where: {} }),
      Provider.destroy({ where: {} }),
      Client.destroy({ where: {} }),
    ]);

    // Crear clientes
    for (let i = 0; i < 20; i++) {
      await Client.create({
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: "ACTIVE",
      });
    }

    // Crear proveedores
    for (let i = 0; i < 10; i++) {
      await Provider.create({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        contact_person: faker.person.fullName(),
        status: "ACTIVE",
      });
    }

    // Crear categorías
    for (let i = 0; i < 5; i++) {
      await Category.create({
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        status: "ACTIVE",
      });
    }

    // Crear equipos
    const providers = await Provider.findAll();
    const categories = await Category.findAll();
    for (let i = 0; i < 30; i++) {
      await Equipment.create({
        name: faker.commerce.productName(),
        brand: faker.company.name(),
        price: faker.number.int({ min: 50, max: 1000 }),
        stock: faker.number.int({ min: 1, max: 50 }),
        category_id: faker.helpers.arrayElement(categories).id,
        provider_id: faker.helpers.arrayElement(providers).id,
        status: "ACTIVE",
      });
    }

    console.log("✅ Datos falsos creados exitosamente.");
  } catch (error) {
    console.error("❌ Error generando datos falsos:", error);
  } finally {
    await sequelize.close();
    console.log("🔌 Conexión cerrada.");
  }
}

createFakeData();
