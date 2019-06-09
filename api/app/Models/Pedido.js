"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Pedido extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  items() {
    return this.hasMany("App/Models/Item");
  }
}

module.exports = Pedido;
