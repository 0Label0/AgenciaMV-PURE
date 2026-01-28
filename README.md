# Proyecto AgenciaMV-PURE

Este proyecto es una landing page para una agencia de marketing, enfocada en la simplicidad, el rendimiento y una estética moderna ("Pure"). La aplicación está dividida en un Frontend ligero y un Backend funcional para el manejo de correos electrónicos.

## 🚀 Frontend

El desarrollo del frontend se centra en mantener la estructura limpia, utilizando tecnologías estándar web sin frameworks pesados, pero aprovechando Web Components para la reutilización de código.

### Tecnologías Clave:

- **HTML5**: Estructura semántica.
- **CSS3**: Uso extensivo de variables CSS (`variables.css`), diseño responsivo y animaciones personalizadas.
- **JavaScript (ES6+)**: Lógica modular y manejo del DOM.
- **Web Components**: Elementos personalizados como `<app-header>` y `<app-footer>` para modularizar la navegación y el pie de página.

### Bibliotecas Utilizadas:

- **[SplideJS](https://splidejs.com/)**: Un slider/carrusel ligero y accesible, utilizado en la sección "Cómo Trabajamos" y "Servicios".
- **[ScrollReveal](https://scrollrevealjs.org/)**: Biblioteca para animaciones de entrada al hacer scroll, dando dinamismo a los textos y secciones.
- **[FontAwesome](https://fontawesome.com/)**: Iconografía vectorial para elementos de la interfaz.

---

## ⚙️ Backend

El backend se encarga principalmente del procesamiento y envío de los formularios de contacto a través de correo electrónico, utilizando PHP.

### Tecnologías y Estructura:

- **PHP 8**: Lenguaje del lado del servidor.
- **Arquitectura**:
  - `SendMail.php`: Controlador que recibe los datos del formulario (vía Fetch/AJAX), valida la entrada y gestiona la respuesta en formato JSON.
  - `Mail.php`: Clase encargada de la configuración del servidor SMTP y la construcción del correo.

### Bibliotecas:

- **[PHPMailer](https://github.com/PHPMailer/PHPMailer)**: La biblioteca más popular para el envío seguro de correos electrónicos en PHP, configurada para usar SMTP con autenticación seguro.

---

## 📂 Estructura de Directorios

- **/assets**: Imágenes, videos y fuentes.
- **/backend**: Scripts PHP (`Mail.php`, `SendMail.php`).
- **/css** / **/styles**: Archivos de estilos (separados por componentes o páginas).
- **/js**: Lógica Javascript y módulos.
  - `/mods`: Bibliotecas de terceros (minificadas).
  - `/scripts`: Scripts específicos de cada sección.
- **/templates**: Páginas HTML adicionales (Contacto, Servicios).
- `index.html`: Página principal.
