"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Produto extends Model {
  tamanhos() {
    return this.hasMany("App/Models/Tamanho");
  }

  sabores() {
    return this.hasMany("App/Models/Sabor");
  }
}

module.exports = Produto;
