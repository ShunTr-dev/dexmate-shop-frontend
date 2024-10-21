# [Dexmate](https://dexmate.shuntr.dev/)

[Dexmate](https://dexmate.shuntr.dev/) es una plataforma automatizada para la creación y gestión de productos en una tienda online. Aprovecha la inteligencia artificial y diversas tecnologías para generar descripciones, imágenes y traducciones de productos de manera eficiente y escalable.

Puedes encontrar el backend en este otro repo: https://github.com/ShunTr-dev/dexmate-shop-backend

## [Descripción General](https://dexmate.shuntr.dev/features)

[Dexmate](https://dexmate.shuntr.dev/) automatiza la creación de productos para tiendas online mediante el uso de inteligencia artificial. El sistema puede generar descripciones, traducirlas a varios idiomas, crear imágenes de productos y gestionar toda la información necesaria para el inventario y las ventas, lo que facilita y acelera el proceso de añadir nuevos artículos a una tienda.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/-Stripe-008CDD?logo=stripe&logoColor=white&style=for-the-badge)
![OpenAI](https://img.shields.io/badge/-OpenAI-412991?logo=openai&logoColor=white&style=for-the-badge)
![DeepL](https://img.shields.io/badge/-DeepL-0F2B46?logo=deepl&logoColor=white&style=for-the-badge)
![Atlas](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![AWS S3](https://img.shields.io/badge/amazons3-%569A31.svg?style=for-the-badge&logo=amazons3&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## [Arquitectura del Sistema](https://dexmate.shuntr.dev/features)

La aplicación está dividida en varios componentes:

-   [**Frontend**](https://github.com/ShunTr-dev/dexmate-shop-frontend): Desarrollado con React y alojado en Vercel.
-   [**Backend**](https://github.com/ShunTr-dev/dexmate-shop-backend): Desarrollado con Node.js y Express, alojado en Netlify.
-   **Base de Datos**: MongoDB alojada en Atlas.
-   **Almacenamiento de Archivos**: AWS S3 para imágenes y documentos.
-   **Envío de Correos**: SendGrid para notificaciones y correos transaccionales.
-   **Traducciones**: DeepL para traducciones automáticas en tiempo real.
-   **Generación de Imágenes**: DALL-E para la creación de imágenes a partir de texto.
-   **Pasarela de Pago**: Stripe para gestionar pagos seguros.
-   **Monitorización**: Uptime Robot para monitorear el estado de la aplicación.

## [Características Principales](https://dexmate.shuntr.dev/features)

-   **Creación automática de productos**: Utiliza inteligencia artificial (GPT y DALL-E) para generar descripciones y imágenes de productos.
-   **Traducciones en tiempo real**: Gracias a la integración con DeepL, el contenido puede ser traducido automáticamente a varios idiomas.
-   **Gestión de inventario y ventas**: Controla el stock, carrito de compra, estadísticas y notificaciones.
-   **Optimización continua**: Se aplican las recomendaciones de Google Lighthouse para asegurar un alto rendimiento en el frontend.

## [Tecnologías Utilizadas](https://dexmate.shuntr.dev/features)

-   [**Frontend**](https://github.com/ShunTr-dev/dexmate-shop-frontend): React, Vercel
-   [**Backend**](https://github.com/ShunTr-dev/dexmate-shop-backend): Node.js, Express, Netlify
-   **Base de Datos**: MongoDB Atlas
-   **Almacenamiento**: AWS S3
-   **Correo Electrónico**: SendGrid
-   **IA**: OpenAI GPT para generación de texto y DALL-E para imágenes
-   **Traducción**: DeepL
-   **Pasarela de Pago**: Stripe
-   **Monitorización**: Uptime Robot

## Instalación y Configuración

### Requisitos Previos

-   Node.js (v14 o superior)
-   MongoDB Atlas o una base de datos MongoDB local
-   Cuentas en servicios externos como AWS S3, SendGrid, DeepL y Stripe

### Clonar el Repositorio

```bash
git clone https://github.com/ShunTr-dev/dexmate-shop-frontend.git
cd dexmate
```

### Instalar Dependencias

```bash
npm install
```

### Variables de Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables de entorno:

```bash
REACT_APP_API_BASE_URL = "your_base_url"
```

### Iniciar el Servidor

```bash
npm start
```

### Frontend

El frontend está desplegado en Vercel, pero si necesitas ejecutarlo localmente:

```bash
cd dexmate-shop-frontend
npm install
npm start
```

## Uso

1. Inicia la aplicación y navega hasta el panel de administración.
2. Añade el nombre de un producto en el campo correspondiente.
3. La aplicación generará automáticamente una descripción del producto usando GPT.
4. El sistema traducirá la descripción usando DeepL y generará una imagen con DALL-E.
5. La imagen se comprimirá y subirá a AWS S3, mientras que la información del producto se guardará en MongoDB.

## Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
