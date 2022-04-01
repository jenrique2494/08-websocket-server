import express, { Application } from "express";
import userRoutes from "../routes/usuarios";
import cors from "cors";
import db from "../db/connection";
const app = express();

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();

    this.port = process.env.PORT || "8000";

    // metodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }
  async dbConnection (){
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      throw new Error('error al conectar con la base de datos');
    }
  }

  middlewares() {
    // CORS

    this.app.use(cors());

    // lectura body
    this.app.use(express.json());

    // carpeta publica
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto ", this.port);
    });
  }
}

export default Server;
