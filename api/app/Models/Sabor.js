"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Sabor extends Model {
  produto() {
    return this.belongsTo("App/Models/Produto");
  }
}

module.exports = Sabor;
