import { Router } from "express";
import { CompraController } from "../controllers/CompraController";

const routes = Router();
const compraController = new CompraController();


routes.post("/", async (req, res) => {
    try {
        await compraController.purchaseUnit(req, res);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar compra" });
    }
});

routes.post("/todos/:saleId", async (req, res) => {
    try {
        await compraController.purchaseAllProducts(req, res);
    } catch (error) {
        res.status(500).json({ error: "Erro ao comprar produtos" });
    }
})

routes.get("/", async (req, res) => {
    try {
        await compraController.getAllPurchases(req, res);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter compras" });
    }
});

export default routes;
