import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

// WebSocketGateway();
// export class EventsGateway {
//   @SubscribeMessage('newMessage')
//   onNewMessage(@MessageBody() body: any) {
//     console.log(body);
//   }
// }

@WebSocketGateway()
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', (Socket) => {
      console.log(Socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('events')
  newMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('hello', {
      msg: 'events',
      content: body,
    });
  }
}
