"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Tamanho = use("App/Models/Tamanho");

/**
 * Resourceful controller for interacting with tamanhos
 */
class TamanhoController {
  /**
   * Show a list of all tamanhos.
   * GET tamanhos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    const tamanhos = await Tamanho.query()
      .with("produto")
      .fetch();

    return response.json(tamanhos);
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
  async indexForProdutos({ params, response }) {
    const tamanhos = await Tamanho.query()
      .where("produto_id", params.produto)
      .with("produto")
      .fetch();

    return response.json(tamanhos);
  }

  /**
   * Create/save a new tamanho.
   * POST tamanhos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "description",
      "value",
      "qnt_flavors",
      "produto_id"
    ]);
    const tamanho = await Tamanho.create(data);

    return tamanho;
  }

  /**
   * Display a single tamanho.
   * GET tamanhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const tamanho = await Tamanho.query()
      .where("id", params.id)
      .with("produto")
      .fetch();

    return tamanho;
  }

  /**
   * Update tamanho details.
   * PUT or PATCH tamanhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const tamanho = await Tamanho.findOrFail(params.id);
    const { description, value, qnt_flavors, produto_id } = request.body;

    tamanho.description = description || produto.description;
    tamanho.value = value || produto.value;
    tamanho.qnt_flavors = qnt_flavors || produto.qnt_flavors;
    tamanho.produto_id = produto_id || produto.produto_id;

    await tamanho.save();

    return response.json(tamanho);
  }

  /**
   * Delete a tamanho with id.
   * DELETE tamanhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const tamanho = await Tamanho.findOrFail(params.id);

    await tamanho.delete();
  }
}

module.exports = TamanhoController;
