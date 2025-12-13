# Guía de Despliegue en Hostinger

Esta guía explica cómo subir y poner en funcionamiento tu sitio web estático en Hostinger.

## Paso 1: Comprimir los archivos del sitio web

Antes de subir los archivos a Hostinger, es una buena práctica comprimirlos en un único archivo ZIP.

1.  Selecciona todos los archivos y carpetas de tu proyecto (`index.html`, `css/`, `js/`, `img/`, etc.).
2.  Haz clic derecho y selecciona "Enviar a" > "Carpeta comprimida (en zip)".
3.  Nombra el archivo como `belleaesthetic.zip`.

## Paso 2: Subir los archivos a Hostinger

1.  **Inicia sesión en tu cuenta de Hostinger.**
2.  Ve al **hPanel** (el panel de control de Hostinger).
3.  En la sección "Archivos", haz clic en **"Administrador de archivos"**.
4.  Se abrirá una nueva pestaña con el administrador de archivos. En el árbol de directorios de la izquierda, verás una carpeta llamada `public_html`. **Este es el directorio raíz de tu sitio web.**
5.  Haz doble clic en `public_html` para abrirla.
6.  **Elimina el archivo `default.php`** que Hostinger crea por defecto.
7.  En la barra de herramientas superior, haz clic en el icono de **"Subir archivos"** (una nube con una flecha hacia arriba).
8.  Selecciona el archivo `belleaesthetic.zip` que creaste en el paso anterior.
9.  Una vez que el archivo se haya subido, haz clic derecho sobre él y selecciona **"Extraer"**.
10. Se te pedirá que elijas una carpeta de destino. Escribe `.` (un punto) para extraer los archivos directamente en `public_html`.
11. Después de la extracción, puedes eliminar el archivo `belleaesthetic.zip` para ahorrar espacio.

## Paso 3: Verificar el sitio web

1.  Abre tu navegador y escribe tu nombre de dominio (por ejemplo, `www.belleaesthetic.com`).
2.  Tu sitio web debería cargarse correctamente.
3.  Navega por las diferentes páginas (`index.html`, `nosotros.html`, `turismo-estetico.html`) para asegurarte de que todos los enlaces funcionan.
4.  Prueba el formulario de contacto en la página "Nosotros" para confirmar que redirige a WhatsApp correctamente.

## Consideraciones de Seguridad (Evitar Phishing)

Tu sitio web es estático (HTML, CSS, JS), lo que lo hace muy seguro por naturaleza. Los principales riesgos de phishing no provienen de tu código, sino de factores externos. Aquí tienes algunas recomendaciones:

1.  **Usa HTTPS (SSL):** Hostinger generalmente ofrece un certificado SSL gratuito. Asegúrate de que esté activado para tu dominio. Esto encripta la conexión entre el usuario y tu sitio, y muestra un candado en la barra de direcciones del navegador, lo que genera confianza.
2.  **Verifica los enlaces salientes:** Asegúrate de que todos los enlaces a redes sociales y Google Maps sean los correctos (`https://instagram.com/belleaesthetic`, etc.). Un atacante podría intentar engañarte para que enlaces a sitios falsos. Los que tienes actualmente son correctos.
3.  **Correo electrónico profesional:** Utiliza un correo electrónico con tu propio dominio (ej. `info@belleaesthetic.com`) en lugar de un correo público como Gmail. Hostinger te permite crear cuentas de correo electrónico. Esto da una imagen más profesional y es más difícil de suplantar.
4.  **Monitoreo de la reputación del dominio:** Utiliza herramientas como Google Safe Browsing para verificar que tu sitio no ha sido marcado como malicioso.

Tu código actual no presenta vulnerabilidades de phishing porque no procesa datos sensibles en el servidor ni tiene una base de datos. La redirección a WhatsApp es segura.
