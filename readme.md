#  👾✨ Proyecto Tienda Élite de Videojuegos 👾✨

## Descripción 👩‍💻
Este proyecto es una tienda **élite** de videojuegos donde los usuarios pueden registrarse, autenticarse y realizar una **única** compra.  
La aplicación está construida con Node.js, usando Sequelize para gestionar la base de datos MySQL y asegurando la autenticación y autorización con JWT.

---

## Tecnologías usadas 🛠

- Node.js (Express)

- Sequelize ORM (v6.37.7)

- MySQL2 (v3.14.1)

- Jsonwebtoken (v9.0.2)

- Bcryptjs (v3.0.2)

- Nodemailer (v7.0.3)

- Nodemon (v3.1.10) — solo desarrollo

---

## Requisitos 👀

- Node.js (recomendada versión compatible con las dependencias usadas)  
- MySQL Server **instalado**  
- Sequelize CLI instalado **globalmente** (`npm i -g sequelize-cli`) para ejecutar migraciones y seeders  

---

## Instalación 🤷‍♀️

1. Clonar el repositorio  
2. Ejecutar `npm install` para instalar dependencias  
3. Configurar el archivo `config/config.json` con tus datos de conexión a MySQL y el secreto JWT.  
4. Puedes usar `example.json` como plantilla para crear tu propio archivo `config.json`.

Ejemplo básico para entorno `development`:

```json
{
  "development": {
    "username": "root",
    "password": "tucontraseña",
    "database": "data_tienda",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "jwt_secret": "tusecretito"
  }
}
```

## Configuración de base de datos 📌

La base de datos se crea mediante **migraciones** para asegurar que las tablas y sus relaciones estén correctamente configuradas.

## Migraciones 🛫
Ejecuta las migraciones en **orden** para crear lsa tablas y sus relaciones:

```bash
sequelize db:migrate --name 20250530134006-create-product
sequelize db:migrate --name 20250530134142-create-category
sequelize db:migrate --name 20250530134348-create-product-category
sequelize db:migrate --name 20250530170033-create-order
sequelize db:migrate --name 20250530171107-create-user
sequelize db:migrate --name 20250601120923-create-token
sequelize db:migrate --name 20250601123939-changeUserColumn
sequelize db:migrate --name 20250601134516-changeProductColumn
```
## Seeders 🌱
Para cargar datos de prueba ejecuta:

```bash
sequelize db:seed:all
```
## Scripts disponibles (package.json) ✍

- `npm start` — Ejecuta el servidor en producción (`node index.js`)

- `npm run dev` — Ejecuta el servidor en modo desarrollo con recarga automática (`nodemon index.js`)

## Estructura del proyecto ⚔

- `/models` — Modelos Sequelize y asociaciones

- `/migrations` — Scripts para crear y modificar tablas

- `/seeders` — Datos iniciales para poblar la base

- `/controllers` — Lógica de negocio y manejo de peticiones HTTP

- `/routes` — Definición de rutas y endpoints REST

- `/middleware` — Middlewares (ej. autenticación)

- `/config` — Configuraciones de base de datos y JWT
----------
# Modelos y asociaciones principales 💻
## User 👩
### Campos 📈
- `fullName`
- `email`
- `password`
- `role`
- `confirmed`

### Relaciones 🧩
- `hasOne Order` (un usuario tiene una **única** orden)
- `hasMany Token` (un usuario puede tener **varios** tokens para autenticación)

### Validaciones ✅
- En Sequelize, nombre y email son **obligatorios**
- Email debe ser **válido**

### Ejemplo de uso en POSTMAN ⛑


```http
POST url: http://localhost:{tu servidor}/users
Content-Type: raw/json

{
  "fullName": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```
A lo cual te debe responder:
```json
{
  "message": "Te hemos enviado un correo para confirmar el registro",
  "user": {
    "id": 1,
    "fullName": "Juan Pérez",
    "email": "juan@example.com",
    "confirmed": false,
    "role": "user"
  }
}
```
El resto de ejemplos están en la **documentación de Postman**.📖
## Order 🛒

### Campos 📈
- `userId`

### Relaciones 🧩
- `hasMany Product` (una orden puede tener **muchos** productos)
- `belongsTo User` (la orden pertenece a **un usuario**)

Los ejemplos de uso de postman están en su respectiva **documentación**.📖

## Product 🎮

### Campos 📈
- `nameProduct`
- `descriptionProduct`
- `price`
- `orderId`

### Relaciones 🧩
- `belongsToMany Category` (relación **muchos a muchos** con categorías, a través de **ProductCategory**)
- `belongsTo Order` (cada producto pertenece a **una orden**, mediante `orderId`)

Los ejemplos de uso de postman están en su respectiva **documentación**.📖

## Category 🎯

### Campos 📈
- `nameCategory`
- `descriptionCategory`

### Relaciones 🧩
- `belongsToMany Product` (**muchos a muchos** con productos, a través de **ProductCategory**)

Los ejemplos de uso de postman están en su respectiva **documentación**.📖

## ProductCategory (tabla intermedia) 🔧

### Campos 📈
- `productId`
- `categoryId`

No tiene asociaciones explícitas en el modelo, pero es la **tabla puente** para la relación muchos a muchos **Product** ↔ **Category**.

Los ejemplos de uso de postman están en su respectiva **documentación**.📖

## Token 🙊

### Campos 📈
- `token`
- `UserId`

### Relaciones 🧩
- `belongsTo User` (cada token pertenece a **un usuario**, para controlar sesiones)

Los ejemplos de uso de postman están en su respectiva **documentación**.📖

## Importante 👀❗
- En la consulta de **órdenes** debes usar el alias `'Products'` para incluir los productos relacionados con la orden.

- La relación muchos a muchos entre **productos y categorías** está correctamente definida usando la tabla **ProductCategory**.

- La tabla **Token** sirve para controlar la **validez** de sesiones y tokens JWT activos.

- Las validaciones en **User** aseguran que **no** se puedan crear usuarios **sin nombre ni email válido**.

- Las migraciones deben **respetar este esquema** para que las claves foráneas y relaciones funcionen **correctamente**.

- El token JWT debe enviarse en el header `Authorization`.
- Para confirmar el usuario, se envía un email con un **enlace con token válido por 48h**.

- Al hacer logout, el token se **elimina** de la base de datos para invalidarlo.

# Uso y endpoints principales 🔰
## Usuarios 👩‍👩‍👧‍👧

- **`POST /users`** — Crear nuevo usuario

- **`POST /users/login`** — Login y obtención de token JWT

- **`GET /users`** — Obtener todos los usuarios (requiere autenticación)

- **`PUT /users/id/:id`** — Actualizar usuario (requiere autenticación)

- **`DELETE /users/id/:id`** — Eliminar usuario (requiere autenticación)

- **`DELETE /users/logout`** — Logout (requiere autenticación)

- **`GET /users/confirm/:emailToken`** — Confirmar cuenta vía email
## Productos 🎮

- **`POST /products`** — Crear producto

- **`GET /products`** — Obtener todos los productos

- **`GET /products/id/:id`** — Obtener producto por ID

- **`GET /products/nameProduct/:nameProduct`** — Buscar producto por nombre

- **`GET /products/price/:price`** — Filtrar productos por precio

- **`GET /products/orderPrice`** — Ordenar productos por precio

- **`PUT /products/id/:id`** — Actualizar producto

- **`DELETE /products/id/:id`** — Eliminar producto
## Categorías 🎯

- **`POST /categories`** — Crear categoría

- **`PUT /categories/:id`** — Actualizar categoría

- **`DELETE /categories/:id`** — Eliminar categoría

- **`GET /categories/:id`** — Obtener categoría por ID

- **`GET /categories/byname`** — Buscar categoría por nombre

- **`GET /categories`** — Obtener todas las categorías
## Órdenes 🛒

- **`POST /orders`** — Crear orden (relaciona usuario y productos)

- **`GET /orders`** — Obtener todas las órdenes con sus productos asociados


## Endpoints principales 🔰

- **POST /users** — Crear usuario

- **POST /users/login** — Login de usuario (retorna token JWT)

- **GET /users** — Obtener todos los usuarios (requiere token)

- **POST /orders** — Crear orden (requiere token)

- **GET /orders** — Obtener todas las órdenes con productos (requiere token)
-------------
# Middleware de Autenticación ✅

Este proyecto usa un **middleware** personalizado para proteger rutas que requieren usuario autenticado.

## Funcionamiento 🔧

1. Obtiene el token JWT del header `Authorization`.

2. Verifica que el token sea válido con la clave secreta configurada (`jwt_secret`).

3. Extrae el **id del usuario** del payload del token y busca el usuario en la base de datos.

4. Verifica que el token **exista** en la tabla **Token** (para asegurar que la sesión **está activa**).

5. Si todo es correcto, adjunta el usuario a `req.user` para usarlo en los controladores.

6. Si alguna verificación falla, responde con error 401 o 500.


## Ejecución en modo desarrollo 👩‍💻

```bash
npm run dev
```
Esto **levantará el servidor** con nodemon para recarga automática.


## Comandos útiles 🍀

- **`npm install`** — instalar dependencias

- **`npm run dev`** — levantar servidor en modo desarrollo

- **`sequelize db:migrate`** — ejecutar migraciones

- **`sequelize db:seed:all`** — cargar seeders
----------

# **¡Muchas gracias! ❤**

## ¡Esperamos que disfrutes de este proyecto de Backend y que aprendas un montón! 🚀