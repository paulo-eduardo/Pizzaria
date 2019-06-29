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
  async create({ request, auth }) {
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

  async finalizar({ params, request }) {
    const pedido = await Pedido.findOrFail(params.id);
    const { observacao, cep, rua, nº, bairro } = request.body;

    pedido.observacao = observacao;
    pedido.cep = cep;
    pedido.rua = rua;
    pedido.nº = nº;
    pedido.bairro = bairro;
    pedido.status = "completo";

    await pedido.save();

    return pedido;
  }

  async listCompletos() {
    const pedidos = await Pedido.query()
      .where("status", "completo")
      .with("items")
      .with("produto")
      .with("tamanho")
      .with("sabores")
      .with("sabores.sabor")
      .fetch();

    return pedidos;
  }

  async enviarPedido() {
    const pedido = await Pedido.findOrFail(params.id);

    pedido.status = "enviado";
    await pedido.save();
    return pedido;
  }

  async confirmarEntrega() {
    const pedido = await Pedido.findOrFail(params.id);

    pedido.status = "entregue";
    await pedido.save();
    return pedido;
  }

  async listMeusPedidos({ auth }) {
    const pedidos = await Pedido.query()
      .where("user_id", auth.user.id)
      .with("items")
      .with("produto")
      .with("tamanho")
      .with("sabores")
      .with("sabores.sabor")
      .fetch();

    return pedidos;
  }
}

module.exports = PedidoController;
