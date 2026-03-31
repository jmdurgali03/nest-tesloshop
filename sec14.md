Documentacion de la API

Mediante el Export en Postman en una coleccion se puede generar la documentacion de la API.

Instalamos Swagger en NestJS: (lenguaje agnostico: no depende de ningun framework)
yarn add @nestjs/swagger

En el main configuramos el swagger.

@ApiTags('') para agrupar los endpoints por controlador.
@ApiProperty() para documentar los campos de las entidades.
@ApiResponse() para documentar las respuestas de los endpoints.
