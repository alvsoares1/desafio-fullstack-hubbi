import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import ProdutoRoutes from './routes/ProdutoRoutes';  
import VendaRoutes from "./routes/VendaRoutes";
import CompraRoutes from "./routes/CompraRoutes";

const app = express();


app.use(cors());
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado com o banco de dados!');
    app.listen(5000, () => console.log('Servidor iniciado na porta 5000'));
  })
  .catch((error) => {
    console.error('Falha na conexão com o banco de dados', error);
  });
