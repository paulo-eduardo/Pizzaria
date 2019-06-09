"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class SaboresItem extends Model {
  items() {
    return this.hasMany("App/Models/Item");
  }

  sabores() {
    return this.hasMany("App/Models/Sabores");
  }
}

module.exports = SaboresItem;
