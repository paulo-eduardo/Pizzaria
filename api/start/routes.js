"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
}).middleware("auth");

Route.post("/register", "UserController.register");
Route.post("/authenticate", "UserController.authenticate");

Route.group(() => {
  Route.resource("produtos", "ProdutoController").apiOnly();

  Route.resource("tamanhos", "TamanhoController").apiOnly();
  Route.get("tamanhos/produto/:produto", "TamanhoController.indexForProdutos");

  Route.resource("sabores", "SaborController").apiOnly();
  Route.get("sabores/produto/:produto", "SaborController.indexForProdutos");

  Route.post("pedido", "PedidoController.create");
  Route.post("finalizar/pedido/:id", "PedidoController.finalizar");
  Route.post("pedidos/completo", "PedidoController.listCompletos");
  Route.post("pedido/enviar/:id", "PedidoController.enviarPedido");
  Route.post("pedido/entregue/:id", "PedidoController.pedido.confirmarEntrega");
  Route.post("pedidos/meu", "PedidoController.pedido.listMeusPedidos");
}).middleware("auth");
