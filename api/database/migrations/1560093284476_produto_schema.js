"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProdutoSchema extends Schema {
  up() {
    this.create("produtos", table => {
      table.increments();
      table
        .string("name", 80)
        .notNullable()
        .unique();
      table
        .string("description", 80)
        .notNullable()
        .unique();
      table.integer("time").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("produtos");
  }
}

module.exports = ProdutoSchema;
