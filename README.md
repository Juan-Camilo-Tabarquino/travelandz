# Travelandz - Desafío Técnico
  Juan Camilo Tabarquino Hernandez

# Dependencias
  Para ejecutar el proyecto de manera local realizar lo siquientes pasos
### Version recomendada de NodeJs 20.11.1

### En el proyecto de hizo uso de yarn y se recomienda utilizarlo como gestor de paquetes

Ingresar a la carpeta /backend y ejecutar en la terminal el comando yarn para instalar todas las dependencias, realizar este mismo proceso en la carpeta frontend antes de intentar arrancar el pryecto

Para arrancar el Backend abrir una terminal en la raiz del proyecto y navegar a /backend y ejecutar el comando yarn dev
Nota: El backend usa por defecto el puerto 9000 pero en caso de estar ocupado asigna uno nuevo, tener en cuenta que el programa por seguridad usa variables de entorno con dotenv por lo que para poder usar el proyecto crear en la carpeta raiz el archivo .env y dentro de el crear estas 2 variables con exactamente ese mismo nombre API_KEY = 'aqui va el api key que se vaya a utiliza' SECRET = 'aqui va el secret a usar secret'

Para arrancar el Frontend abrir una segunda terminal en la raiz del proyecto y navegar a /frontend y ejecutar el comando yarn dev
Nota: Se recomienda que antes de arrancar el frontend crear en la carpeta frontend del proyecto el archivo .env.local para configurar la variable de entorno del puerto del backend, recalcar que si se inicio el backend en la consola se nos debe desplegar el puerto que esta usando, por defecto el 9000, por lo que en el archivo .env.local crear la variable NEXT_PUBLIC_PORT y asignarle el valor del puerto que esta usando el backend