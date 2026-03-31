# 🛡️ Guía de Autenticación y Autorización (Sección 13)

¡Hola! Este documento es un resumen sencillo y paso a paso de todo lo que has construido en la **Sección 13** del curso respecto a la autenticación en tu proyecto **Teslo Shop**.

Todo este flujo permite que tus usuarios puedan **registrarse**, **iniciar sesión** y acceder a **rutas privadas** de forma segura utilizando *JSON Web Tokens (JWT)*.

---

## 🛠️ ¿Qué tecnologías y librerías usamos?
* **Passport.js & JWT**: Para la creación, firmado y validación de los tokens de acceso.
* **Bcrypt**: Para encriptar las contraseñas antes de guardarlas en la base de datos (y nunca guardarlas en texto plano).
* **TypeORM**: Para interactuar con PostgreSQL y guardar los usuarios.

---

## 📖 Paso a Paso de lo Implementado

### 1. La Entidad de Usuario (`user.entity.ts`)
Creamos la representación de nuestra tabla `users` en la base de datos.
* Definimos campos importantes como `email` (único), `password`, `fullName`, y `roles`.
* Al campo `password` le pusimos `select: false` para evitar que, por error, se envíe la contraseña al hacer consultas (`select`) a la base de datos.
* Usamos decoradores especiales como `@BeforeInsert()` y `@BeforeUpdate()` para asegurarnos de que el email siempre se guarde en minúsculas y sin espacios al inicio/final.

### 2. El Servicio de Autenticación (`auth.service.ts`)
Es el "cerebro" donde ocurre toda la lógica de negocio:
* **Registro (`create`)**: Recibe los datos, le aplica un *hash* (encriptación) a la contraseña usando `bcrypt.hashSync()` y guarda al usuario. Finalmente genera su token JWT de bienvenida.
* **Login (`login`)**: Busca al usuario por su `email`. Si existe, compara la contraseña enviada con la contraseña encriptada en la BD mediante `bcrypt.compareSync()`. Si todo está ok, genera su token JWT.
* Además, tiene un método privado `getJwtToken()` encargado de firmar y entregar los tokens con la información (payload) del `id` del usuario.

### 3. Configuración del Módulo (`auth.module.ts`)
Aquí es donde conectamos todas las piezas:
* Importamos `TypeOrmModule` para la entidad `User`.
* Configuramos `PassportModule` indicando que nuestra estrategia por defecto es `jwt`.
* Configuramos de la forma *asíncrona* el `JwtModule` utilizando `ConfigModule` y `ConfigService` para que el módulo sea capaz de leer la llave súper secreta (`JWT_SECRET`) desde tus variables de entorno globales (`.env`). ¡Esto es clave para la seguridad!

### 4. La Estrategia de Passport (`jwt.strategy.ts`)
Esta clase intercepta las peticiones que necesitan estar protegidas:
* Revisa el header de la solicitud HTTP buscando un "Bearer Token".
* Si un token es válido, extrae el Payload (en nuestro caso, el `id`).
* Realiza una búsqueda a la BD para validar si el usuario todavía existe y si está "activo" (`isActive: true`). Si pasa esto, permite el acceso a la ruta. ¡Esto garantiza que usuarios borrados o bloqueados no puedan usar tokens viejos!

### 5. Controladores y Protección de Rutas (`auth.controller.ts`)
Finalmente, expusimos todo el sistema al mundo web:
* `@Post('register')`: Ruta libre para registrar cuenta.
* `@Post('login')`: Ruta libre para iniciar sesión.
* **Ruta Privada (El candado 🔒)**: Creamos `@Get('private')` y le agregamos en la parte superior el decorador `@UseGuards(AuthGuard())`. Si no envías un token válido o lo mandas mal, NestJS te responderá automáticamente con un *401 Unauthorized*.

---

## 🎯 En Resumen
1. Cuando un usuario se **registra**, guardamos su clave encriptada mediante `bcrypt`.
2. Cuando hace **login**, verificamos la clave con `bcrypt.compareSync` y le entregamos un **carnet virtual (JWT)** firmado por nuestro servidor.
3. Para entrar a una zona VIP (ej. `/auth/private`), es obligatorio presentar ese **carnet** como `Bearer <Token>`. La Estrategia de Passport (`JwtStrategy`) lee ese carnet, busca al usuario en la BD para ver si aún está activo, revisa que no sea falso y finalmente deja pasar la petición.
