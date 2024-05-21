# acortador_de_urls

El proyecto es un acortador de URLs que ofrece un plan gratuito y un plan de pago que proporciona un mayor control sobre las URLs. Para fines de la hackaton, no se va a integrar los pagos.

## Ejecutar aplicación

- Lo primero será clonar el repositorio.

```bash
git clone https://github.com/angelchavez19/acortador_de_urls.git
```

- Instalar las librerias necesarias.

```bash
npm install
```

- La aplicación tiene una funcionalidad para enviar correos, en mi caso uso Gmail.

- La aplicación necesita variables de entorno, asi que debes crear un archivo `.env` y configurar las variables de entorno

```
SERVER=http://localhost:3000/
SECRET_KEY=secret-key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=email-para-enviar-correos
EMAIL_HOST_PASSWORD=contraseña-de-aplicacion

DATABASE_URL=postgresql://user:password@host:port/url_shortener?schema=public
```

- Hacer las migraciones.

```bash
npx prisma migrate dev --name init
```

- Finalmente, ejecutar la aplicación.

```bash
npm run dev
```

## Funcionalidades

- Light/Dark Mode
- Seguridad:
  - Creación de usuarios con confirmación por correo.
  - Inicio de sesión de usuarios con JWT.
  - Recuperación de contraseñas.
- Plan gratuito:
  - URLs de 30 usos máximo.
  - Longitud fija de 8 caracteres.
- Plan Pro:
  - URLs sin límite de uso.
  - Personalización de URLs.
  - Gestión de URLs.
  - Generación de códigos QR.

## Modelo Relacional de la Base de Datos

![Modelo Relacional de la Base de Datos](./docs/acortador-urls-bd.png)
