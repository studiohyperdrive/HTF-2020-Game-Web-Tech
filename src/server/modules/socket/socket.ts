import Express from 'express';
import Http from 'http';
import SocketIO from 'socket.io';

export class Socket {
	public static instance?: Socket;

	public httpServer?: Http.Server;
	public io?: SocketIO.Server;
	public port?: number;

	constructor(app?: Express.Application, port = 3005) {
		if (!Socket.instance) {
			Socket.instance = this;

			this.port = port;
			this.httpServer = new Http.Server(app);
			this.io = new SocketIO.Server(this.httpServer);

			this.io.on('connection', (socket: SocketIO.Socket) => {
				console.log(`connect ${socket.id}`);

				socket.on('disconnect', () => {
					console.log(`disconnect ${socket.id}`);
				});
			});

			this.httpServer.listen(this.port);

			console.log(`🚀 Sockets listening on the port ${this.port}`);
		}

		return Socket.instance;
	}
}
