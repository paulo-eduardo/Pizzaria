"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class SaboresItem extends Model {
  item() {
    return this.belongsTo("App/Models/Item");
  }

  sabor() {
    return this.belongsTo("App/Models/Sabor");
  }
}

module.exports = SaboresItem;
