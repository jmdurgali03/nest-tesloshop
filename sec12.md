- 154. Subir archivos al back
La carga de archivos es algo general, bastante comun. Creamos un nuevo resource para manejar la carga de archivos.
Instalar multer. NO es recomendable usarlo en produccion. Se usa solo para pruebas. En produccion se usa Cloudinary o servicios de aws.

- 156. Guardar imagen en filesystem.
El problema es que si guardamos archivos en la carpeta public, no podemos agregar controladores de autenticacion. Por lo tanto, creamos una carpeta que se llame static.

Podemos agregar un .gitkeep para que la carpeta no se borre.

Lo gestiona con uuids a los nombres para que no haya colisiones, de tener el mismo nombre de archivo y no se pise.

- 158. Servir archivos de manera controlada.
Hariamos un get al path de donde estan almacenadas los archivos.
Usamos un nuevo decorador llamado @Res: que seria la response de Node.js
Con ese decorador le estamos diciendo a Nest que no queremos que haga nada, que nosotros nos encargaremos de la respuesta.

- 159. Ahora retonar la secureURL
Es dinamico debido a que cuando desplegamos la app los PORTS van cambiando. 
Por lo que utilizamos las variables de entorno para servir la url dinamica.

Servir archivos de forma public, si bien no tenemos control de acceso para usuarios. Es facil de mostrar recursos para todo el publico.