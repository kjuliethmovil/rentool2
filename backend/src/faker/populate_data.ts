/**
 * Archivo: src/faker/populate_data.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 09/10/2025
 * Descripción: Genera datos de ejemplo para poblar todas las tablas del sistema Rentool.
 */

import { faker } from "@faker-js/faker";
import { sequelize } from "../database/connection";

// Importar modelos
import { Client } from "../models/Client";
import { Provider } from "../models/Provider";
import { Category } from "../models/Category";
import { Equipment } from "../models/Equipment";
import { Contract } from "../models/Contract";
import { ContractDetail } from "../models/ContractDetail";
import { Warranty } from "../models/Warranty";
import { Delivery } from "../models/Delivery";
import { Returns } from "../models/Returns";
import { Payment } from "../models/Payment";
import { Maintenance } from "../models/Maintenance";

async function createFakeData() {
  console.log("🌱 Iniciando carga de datos falsos...");

  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida correctamente con la base de datos.");

    // Limpieza (vaciar todas las tablas)
    await Promise.all([
      Warranty.destroy({ where: {} }),
      Returns.destroy({ where: {} }),
      Delivery.destroy({ where: {} }),
      Payment.destroy({ where: {} }),
      Maintenance.destroy({ where: {} }),
      ContractDetail.destroy({ where: {} }),
      Contract.destroy({ where: {} }),
      Equipment.destroy({ where: {} }),
      Category.destroy({ where: {} }),
      Provider.destroy({ where: {} }),
      Client.destroy({ where: {} }),
    ]);

    // 1️⃣ Crear clientes
    for (let i = 0; i < 100; i++) {
      await Client.create({
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: "ACTIVE",
      });
    }

    // 2️⃣ Crear proveedores
    for (let i = 0; i < 100; i++) {
      await Provider.create({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        contact_person: faker.person.fullName(),
        status: "ACTIVE",
      });
    }

    // 3️⃣ Crear categorías (menos registros porque son estables)
    for (let i = 0; i < 10; i++) {
      await Category.create({
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        status: "ACTIVE",
      });
    }

    // 4️⃣ Crear equipos
    const providers = await Provider.findAll();
    const categories = await Category.findAll();
    for (let i = 0; i < 100; i++) {
      await Equipment.create({
        name: faker.commerce.productName(),
        brand: faker.company.name(),
        price: faker.number.int({ min: 50, max: 2000 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        category_id: faker.helpers.arrayElement(categories).id,
        provider_id: faker.helpers.arrayElement(providers).id,
        status: "ACTIVE",
      });
    }

    // 5️⃣ Crear contratos
    const clients = await Client.findAll();
    const contracts: Contract[] = [];
    for (let i = 0; i < 100; i++) {
      const startDate = faker.date.recent({ days: 90 });
      const endDate = faker.date.soon({ days: faker.number.int({ min: 1, max: 30 }), refDate: startDate });

      const contract = await Contract.create({
        start_date: startDate,
        end_date: endDate,
        total_days: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
        total_amount: faker.number.int({ min: 100, max: 5000 }),
        client_id: faker.helpers.arrayElement(clients).id,
        status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
      });
      contracts.push(contract);
    }

    // 6️⃣ Crear detalles de contratos
    const equipments = await Equipment.findAll();
    for (const contract of contracts) {
      const items = faker.number.int({ min: 1, max: 3 });
      for (let i = 0; i < items; i++) {
        await ContractDetail.create({
          contract_id: contract.id,
          equipment_id: faker.helpers.arrayElement(equipments).id,
          days: faker.number.int({ min: 1, max: 15 }),
          rate: faker.number.int({ min: 50, max: 500 }),
        });
      }
    }

    // 7️⃣ Crear mantenimientos
    for (let i = 0; i < 100; i++) {
      await Maintenance.create({
        equipment_id: faker.helpers.arrayElement(equipments).id,
        date: faker.date.recent({ days: 180 }),
        description: faker.commerce.productDescription(),
        cost: faker.number.int({ min: 50, max: 1000 }),
        status: faker.helpers.arrayElement(["PENDING", "COMPLETED", "IN_PROGRESS"]),
      });
    }

    // 8️⃣ Crear entregas
    for (let i = 0; i < 100; i++) {
      await Delivery.create({
        contract_id: faker.helpers.arrayElement(contracts).id,
        delivery_date: faker.date.recent({ days: 60 }),
        status: faker.helpers.arrayElement(["PENDING", "COMPLETED", "RETURNED"]),
      });
    }

    // 9️⃣ Crear devoluciones
    for (let i = 0; i < 100; i++) {
      await Returns.create({
        contract_id: faker.helpers.arrayElement(contracts).id,
        return_date: faker.date.recent({ days: 30 }),
        damage_report: faker.helpers.arrayElement([
          "Sin daños",
          "Daños menores",
          "Daños importantes",
        ]),
      });
    }

    // 🔟 Crear pagos
    for (let i = 0; i < 100; i++) {
      await Payment.create({
        contract_id: faker.helpers.arrayElement(contracts).id,
        payment_date: faker.date.recent({ days: 60 }),
        amount: faker.number.int({ min: 100, max: 2000 }),
        method: faker.helpers.arrayElement(["CASH", "CARD", "TRANSFER"]),
        status: faker.helpers.arrayElement(["PENDING", "PAID", "FAILED"]),
        reference: faker.string.alphanumeric(10),
      });
    }

    // 1️⃣1️⃣ Crear garantías
    for (let i = 0; i < 50; i++) {
      await Warranty.create({
        contract_id: faker.helpers.arrayElement(contracts).id,
        equipment_id: faker.helpers.arrayElement(equipments).id,
        issue_date: faker.date.recent({ days: 90 }),
        expiration_date: faker.date.soon({ days: 365 }),
        description: faker.commerce.productDescription(),
        status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
      });
    }

    console.log("✅ Todos los datos falsos fueron creados exitosamente.");
  } catch (error) {
    console.error("❌ Error generando datos falsos:", error);
  } finally {
    await sequelize.close();
    console.log("🔌 Conexión cerrada.");
  }
}

createFakeData();
