## Websockets sec15

Protocolo de red que establece un canal de comunicacion persistente, bidireccional y full-duplex(envia y recibe al mismo tiempo) sobre una unica conexion TCP, a diferencia de http que es unidireccional y request/response.

WebSockets: 
Le permiten al servidor enviar información al cliente sin que este la solicite. Los dos estan conectados y se pueden comunicar en tiempo real. Ej, cuando el cliente se conecta, cuando el servidor detecta un cambio en la base de datos, etc.

GateWays: 
Son una forma de manejar los eventos de los websockets. Son como los controladores de los websockets.
Pendiente de escuchar las solicitudes del cliente. 
La diferencia con los controladores es que los gateways manejan eventos y los controladores manejan peticiones http.

yarn add @nestjs/websockets @nestjs/platform-socket.io

nest g res messagesWs --no-spec
seleccionamos WebSockets y no CRUD
yarn add socket.io

- 204. Server - escuchar conexiones y desconexiones.
Namespace: es como un canal de comunicacion dentro del websocket. Por defecto es '/', pero se puede cambiar.

dentro del gateway podemos definir el namespace y el cors.
@WebSocketGateway({ cors: true, namespace: '/' })

Para el cliente en el front instalamos:
 - yarn add socket.io-client

Verificar que las versiones sean las mismas de socket.io en el front y en el back.

Los clientes no hablan entre ellos, hablan con el servidor. El servidor es el que se encarga de enviar los mensajes a los clientes.

