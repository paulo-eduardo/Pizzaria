"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SaboresItemSchema extends Schema {
  up() {
    this.create("sabores_items", table => {
      table.increments();
      table
        .integer("item_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("items")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("sabor_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("sabors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("sabores_items");
  }
}

module.exports = SaboresItemSchema;
