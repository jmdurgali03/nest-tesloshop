- 140. New entity images
Creamos la nueva entidad y la agregamos al module.

- 141. Uno a muchos - Muchos a uno. Relaciones
El OneToMany espera 2 argumentos:
- Una función que retorne la entidad con la que se relaciona.
- Una función que retorne la relación.

En el ManyToOne solo se pasa la función que retorna la entidad con la que se relaciona. (La callback)

Agregar al DTO cada vez que agregamos un atributo.

- 143. Aplanar las imagenes
Como creamos solo la relacion en las entity, es decir q la tabla de products no tiene una columna para las imagenes, debemos agregar la relacion en el find.

Si utilizamos un queryBuilder, debemos usar el leftJoinAndSelect para traer las relaciones. Dentro de esa funcion, espera 2 argumentos:
- El nombre de la relacion.
- Un alias para la relacion.

- 144. Query Runner
Aplica para transacciones, es decir, para ejecutar varias consultas en una sola transacción.

- 146. Eliminar en cascada
Al tener una relacion no podemos hacer el delete sin antes eliminar la relacion. Por lo tanto, debemos eliminar la relacion antes de eliminar el producto. 

Se recomienda crear una transaccion para eliminar ya que otorga mayor control. Pero en este caso como la tabla productImage es muy simple, no es necesario crear una transaccion.

Agregamos la prop en la entity de:
- onDelete: 'CASCADE'