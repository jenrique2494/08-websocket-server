import dotenv from "dotenv";
import ServerIo from './models/server';
dotenv.config();

const server= new ServerIo();

server.listen();