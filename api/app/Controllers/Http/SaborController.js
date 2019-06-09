"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Sabor = use("App/Models/Sabor");

/**
 * Resourceful controller for interacting with sabors
 */
class SaborController {
  /**
   * Show a list of all sabors.
   * GET sabors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const sabores = await Sabor.query()
      .with("produto")
      .fetch();

    return sabores;
  }

  /**
   * Show a list of all tamanhos for selected produto
   * GET tamanhos/produto/:produto
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexForProdutos({ params }) {
    const sabores = await Sabor.query()
      .where("produto_id", params.produto)
      .with("produto")
      .fetch();

    return sabores;
  }

  /**
   * Create/save a new sabor.
   * POST sabors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["name", "valor_adicional", "produto_id"]);
    const sabor = await Sabor.create(data);

    return sabor;
  }

  /**
   * Display a single sabor.
   * GET sabors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const sabor = await Sabor.query()
      .where("id", params.id)
      .with("produto")
      .fetch();

    return sabor;
  }

  /**
   * Update sabor details.
   * PUT or PATCH sabors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const sabor = await Sabor.findOrFail(params.id);
    const { name, valor_adicional } = request.body;

    sabor.name = name || sabor.name;
    sabor.valor_adicional = valor_adicional || sabor.valor_adicional;

    sabor.save();

    return sabor;
  }

  /**
   * Delete a sabor with id.
   * DELETE sabors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const sabor = await Sabor.findOrFail(params.id);

    await sabor.delete();
  }
}

module.exports = SaborController;
