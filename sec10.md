- 121. Configurar PostreSQL con Nest
Primero agregar la configuracion para variables de entorno (PDF al final).

Instalar typeorm, configurar en el app module:
TypeOrmModule.forRoot

La prop synchronize: true, solo se usa en desarrollo, en producción no se debe usar. Lo que hace basicamente es que si hay un cambio en el modelo de la base de datos, se actualiza automaticamente en la base de datos. En produccion se hace mediante migraciones. 

Si cambiamos algo en el .env y no reiniciamos el servidor, dara un error. 

- 122. Entity de products
Agregarle el decorador a la clase @Entity de typeorm. 

- 125. Insertar usando TypeORM
Usando el patron repositorio de typeorm.

- 126. Manejo de errores
Crear una propiedad dentro de la clase de service, llamado logger. Para manejar los errores. 

- 127. BeforeInsert y BeforeUpdate
Procedimientos que se ejecutan antes de insertar o actualizar un registro. Sirven para limpiar datos, darle otro formato, validar, etc.

No hace falta llamarlos, se ejecutan automaticamente porque esta decorado en el entity.

- 128. Pagination
Tenemos 2 opciones, utilizar el @Type(() => Number) o configuramos en el main el enableImplicitConversion: true.

Type orm defiende de las query injection.

Before Upadte & Before Insert
Son metodos que insertamos en las entity y nos sirven para no sobrecargar al modulo de service.

Si hacemos un cambio en las entity debemos agregarlo al DTO.