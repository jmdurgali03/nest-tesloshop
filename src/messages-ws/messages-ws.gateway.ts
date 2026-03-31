import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';

import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dtos/new-message.dto';

import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,

    private readonly jwtService: JwtService
  ) { }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    }

    catch (error) {
      client.disconnect();
      return;
    }

    //console.log('Cliente conectado', client.id);
    // console.log('Clientes activos', this.messagesWsService.getConnectedClients());

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    // unir al cliente a un canal
    //client.join('ventas')

  }

  handleDisconnect(client: Socket) {
    //console.log('Cliente desconectado', client.id);
    // console.log('Clientes activos', this.messagesWsService.getConnectedClients());
    this.messagesWsService.removeClient(client.id);

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {

    // enviar el mensaje al cliente que lo envio
    /* client.emit('message-from-server', {
      fullName: 'Juan Durgali',
      message: payload.message,
    }) */

    // enviar el mensaje a todos los clientes excepto al que lo envio
    /* client.broadcast.emit('message-from-server', {
      fullName: 'Juan Durgali',
      message: payload.message,
    }) */

    // enviar el mensaje a todos los clientes incluyendo al que lo envio
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullNameBySocketId(client.id),
      message: payload.message,
    })
  }
}
