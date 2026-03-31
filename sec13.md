- 166. Entidad de Usuarios
El objetivo de las entidades es tener una relacion con una tabla de la base de datos. Relacion 1 a 1.

Podemos agregar el tipado : never para indicar que una funcion no retorna ningun valor.

Cuando creamos una entity, debemos importar en el module correspiente a: 
- TypeOrmModule.forFeature([Entity])

- 168. Encriptar la contraseña
 yarn add bcrypt
 yarn add -D @types/bcrypt

Mediante bcrypt podemos hashear la contraseña, para que no se almacene en texto plano en la base de datos. Solo se puede obtener la contraseña original mediante un proceso de desencriptacion.

En este caso el Dto, no puede ser una extension del create.
En la entity de user agregamos una propiedad al password --> select: false. Hace que no se muestre en las consultas.

- 170. Passport - Nest Auth
Instalamos las dependencias: 
yarn add @nestjs/passport passport
yarn add @nestjs/jwt passport-jwt
yarn add -D @types/passport-jwt

- 171. Modulos asincronos
Cuando dependemos de variables de entorno, es mejor usar modulos asincronos. 
Mediante el metodo del configService, si la variable de entorno existe pero no esta cargada, nos lanzara un error de undefined.

- Jwt Strategy

Es un string que tiene 3 partes: 
* header: Indica el tipo de token y el algoritmo que se uso para crearlo. 
* payload: Contiene la informacion del usuario. 
* signature: Es la firma del token.

- 175. Guards - Private Routes
Son funciones que se ejecutan antes de que una ruta sea atendida por un controlador. 
En el GetUser el ctx es el contexto de la peticion. Sirve para obtener la peticion, la respuesta, etc.

Si bien creamos el decorator para obtener los headers, ya existe uno propiamente de nestjs para obtener los headers:
@Headers() headers: IncomingHttpHeaders

Las metadata sirve para pasarle informacion a los guards.

Para que un Guard sea valido tiene que implementar la interfaz CanActivate y el metodo canActivate.

Los Guards no llevan parentesis cuando se usan en los decoradores, porque son clases y no funciones. Es decir que es la misma instancia la que se pasa al decorador. 

Para obtener la metadata usamos el Reflector.

Evitamos tener los SetMetadata crudos porque son muy propensos a errores de tipeo. Por eso creamos un decorador personalizado.

Ahora con el Auth, podemos simplificar el codigo. Verificamos que un usuario este autenticado y que tenga los roles necesarios.

La prop: { eager: true } hace que la relacion se cargue automaticamente. En el caso de las imagenes, es mejor que no sea eager, porque son muchas y pesadas.