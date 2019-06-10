"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pedido = use("App/Models/Pedido");
const Item = use("App/Models/Item");
const SaborItem = use("App/Models/SaboresItem");

/**
 * Resourceful controller for interacting with pedidos
 */
class PedidoController {
  /**
   * Show a list of all pedidos.
   * GET pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async pedido({ request, auth }) {
    const { produto, tamanho, sabores } = request.body;
    const user_id = auth.user.id;

    const pedido = await Pedido.findOrCreate(
      { user_id, status: "incompleto" },
      { user_id }
    );

    const item = await Item.create({
      pedido_id: pedido.id,
      produto_id: produto,
      tamanho_id: tamanho
    });

    sabores.forEach(async sabor => {
      await SaborItem.create({ item_id: item.id, sabor_id: sabor });
    });

    pedido.items = await Item.query()
      .where("pedido_id", pedido.id)
      .with("produto")
      .with("tamanho")
      .with("sabores")
      .with("sabores.sabor")
      .fetch();

    return pedido;
  }

  /**
   * Show a list of all pedidos.
   * GET pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new pedido.
   * GET pedidos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new pedido.
   * POST pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single pedido.
   * GET pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing pedido.
   * GET pedidos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update pedido details.
   * PUT or PATCH pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a pedido with id.
   * DELETE pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = PedidoController;
