"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SaborSchema extends Schema {
  up() {
    this.create("sabors", table => {
      table.increments();
      table.string("name").notNullable();
      table.integer("valor_adicional");
      table
        .integer("produto_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("produtos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("sabors");
  }
}

module.exports = SaborSchema;
