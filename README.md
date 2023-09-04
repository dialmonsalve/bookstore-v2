This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Este es un proyecto personal basado en una librería.


El proyecto tiene modo de autenticación con next-auth, su estado es manejado con react-query. La base de datos es local creada con MongoDB y ejecutada con docker que funciona en el puerto http://localhost:8081. Tiene 2 rutas privadas y una pública las rutas privadas permiten tanto al administrador del sistema como al personal gestionar la creación de libro, papelería, juguetería y ropa.

Esta app está enfocada en autenticaciones tanto con proveedores como Gmail y Facebook como autenticación personalizada. En el futuro se implementará sharp para lograr un mejor performance, ya que al estar creada con Next permite tener un mejor rendimiento para el SEO. El diseño está creado con Saas

### Tecnologías que debes tener en tu pc:

- Nodejs
- Docker
- Docker-compose

### Getting Started

 1. Instalar dependencias. En la ruta de la app:

 ```bash
npm install
```

2. Cambiar el nombre de .env.example a .env y configurar las variables de entorno.

3. Correr docker. En la ruta de la app:

```bash
npm docker-compose up -d
```

Abrir mongo compass [http://localhost:8081](http://localhost:8081)

3. Abrir el servidor en modo desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

#### TECNOLOGÍAS:

- Typescript
- React 18
- Next 13
- Mongo db
- Tanstack-query
- Saas
- Axios
- Recharts
- sharp
- Axios

