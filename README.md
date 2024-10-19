# [Dexmate](https://dexmate.shuntr.dev/)

[Dexmate](https://dexmate.shuntr.dev/) es una plataforma automatizada para la creación y gestión de productos en una tienda online. Aprovecha la inteligencia artificial y diversas tecnologías para generar descripciones, imágenes y traducciones de productos de manera eficiente y escalable.

Puedes encontrar el backend en este otro repo: https://github.com/ShunTr-dev/dexmate-shop-backend

## [Descripción General](https://dexmate.shuntr.dev/features)

[Dexmate](https://dexmate.shuntr.dev/) automatiza la creación de productos para tiendas online mediante el uso de inteligencia artificial. El sistema puede generar descripciones, traducirlas a varios idiomas, crear imágenes de productos y gestionar toda la información necesaria para el inventario y las ventas, lo que facilita y acelera el proceso de añadir nuevos artículos a una tienda.



![Static Badge](https://img.shields.io/badge/https%3A%2F%2Fdexmate.shuntr.dev%2F_caca)






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
