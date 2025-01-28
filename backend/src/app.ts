import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import ProdutoRoutes from './routes/ProdutoRoutes';  
import VendaRoutes from "./routes/VendaRoutes";
import CompraRoutes from "./routes/CompraRoutes";

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use("/api/produto", ProdutoRoutes);
app.use("/api/venda", VendaRoutes);
app.use("/api/compra", CompraRoutes);


AppDataSource.initialize()
  .then(() => {
    console.log('Conectado com o banco de dados!');
    app.listen(5000, () => console.log('Servidor iniciado na porta 5000'));
  })
  .catch((error) => {
    console.error('Falha na conexão com o banco de dados', error);
  });
