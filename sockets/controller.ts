import { Socket } from 'socket.io';


export const socketController = (socket: Socket) => {
    console.log("cliente conectado", socket.id);
    socket.on("disconnect", () => {
      //console.log("cliente desconectado",socket.id);
    });
    socket.on("mensaje", (payload: any,callback) => {
      const id=123456;
      callback({id,fecha:new Date().toLocaleString()});
      socket.broadcast.emit("mensaje", payload);
    });
  }