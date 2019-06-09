"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PedidoSchema extends Schema {
  up() {
    this.create("pedidos", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("observacao", 150);
      table.string("cep", 10);
      table.string("rua", 25);
      table.string("numero", 4);
      table.string("bairro", 20);
      table.string("status", 20).defaultTo("incompleto");
      table.timestamps();
    });
  }

  down() {
    this.drop("pedidos");
  }
}

module.exports = PedidoSchema;
