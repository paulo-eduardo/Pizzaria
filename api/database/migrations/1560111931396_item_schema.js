"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItemSchema extends Schema {
  up() {
    this.create("items", table => {
      table.increments();
      table
        .integer("pedido_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("pedidos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("produto_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("produtos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("tamanho_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tamanhos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("items");
  }
}

module.exports = ItemSchema;
