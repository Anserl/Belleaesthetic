/**
 * ARCHIVO JAVASCRIPT PRINCIPAL - BELLE STETIC
 * -------------------------------------------
 * Este archivo controla la interactividad del sitio web, incluyendo:
 * 1. Menú móvil (hamburguesa)
 * 2. Header pegajoso (sticky) al hacer scroll
 * 3. Desplazamiento suave (smooth scroll) para enlaces ancla
 * 4. Animaciones de aparición al hacer scroll (Intersection Observer)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ MÓVIL ---
    // Seleccionamos el botón de menú y el contenedor de navegación
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    // Agregamos un evento 'click' al botón
    mobileMenuBtn.addEventListener('click', () => {
        // Alternamos la clase 'active' en el menú para mostrarlo/ocultarlo
        nav.classList.toggle('active');

        // Cambiamos el icono entre barras (hamburguesa) y equis (cerrar)
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // --- 2. CERRAR MENÚ AL HACER CLICK EN UN ENLACE ---
    // Seleccionamos todos los enlaces dentro del menú
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Si el menú está abierto (tiene la clase active), lo cerramos
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                // Restauramos el icono a hamburguesa
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 2.5. MANTENER ENLACE ACTIVO EN LA PÁGINA ACTUAL ---
    // Este código asegura que el enlace de la página actual permanezca activo
    // incluso al hacer scroll o interactuar con la página

    // Función para actualizar el enlace activo
    function updateActiveNavLink() {
        // Obtener la URL actual de la página (solo el nombre del archivo)
        let currentPage = window.location.pathname.split('/').pop();

        // Si está vacío, es la raíz, así que es index.html
        if (currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }

        // Seleccionar SOLO los enlaces del header (no del footer)
        const headerNavLinks = document.querySelectorAll('.header .nav-list a');

        // Recorrer cada enlace del header
        headerNavLinks.forEach(link => {
            // Obtener el href del enlace
            const linkHref = link.getAttribute('href');

            // Remover la clase active de todos primero
            link.classList.remove('active');

            // Si el href coincide exactamente con la página actual
            if (linkHref === currentPage) {
                // Agregar la clase active
                link.classList.add('active');
            }
        });
    }

    // Ejecutar al cargar la página
    updateActiveNavLink();

    // También ejecutar cuando se hace scroll (por si acaso)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavLink, 100);
    });

    // --- 3. HEADER PEGAJOSO (STICKY) ---
    // Seleccionamos el header
    const header = document.querySelector('.header');

    // Escuchamos el evento de scroll en la ventana
    window.addEventListener('scroll', () => {
        // Si el scroll vertical es mayor a 50px
        if (window.scrollY > 50) {
            // Añadimos la clase scrolled para el efecto de compactación
            header.classList.add('scrolled');
        } else {
            // Removemos la clase scrolled cuando está en la parte superior
            header.classList.remove('scrolled');
        }
    });

    // --- 4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) ---
    // Esta API permite detectar cuando un elemento entra en la pantalla visible

    // Seleccionamos elementos con diferentes tipos de animación
    const revealUpElements = document.querySelectorAll('.service-card, .team-card, .package-card');
    const revealLeftElements = document.querySelectorAll('.about-content, .contact-info');
    const revealRightElements = document.querySelectorAll('.about-image, .contact-form-container');
    const revealScaleElements = document.querySelectorAll('.section-header');

    // Configuramos el observador
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento es visible en la pantalla
            if (entry.isIntersecting) {
                // Un pequeño retraso para asegurar que la clase reveal se aplique antes de active
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 50);

                // Dejamos de observar el elemento una vez animado (para que no se repita)
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Usamos el viewport como referencia
        threshold: 0.15, // La animación se activa cuando el 15% del elemento es visible
        rootMargin: "0px"
    });

    // Aplicamos animaciones fadeInUp con delays escalonados
    revealUpElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Añadimos delay escalonado para efecto cascada
        if (index % 3 === 1) el.classList.add('delay-1');
        if (index % 3 === 2) el.classList.add('delay-2');
        revealObserver.observe(el);
    });

    // Aplicamos animaciones fadeInLeft
    revealLeftElements.forEach(el => {
        el.classList.add('reveal-left');
        revealObserver.observe(el);
    });

    // Aplicamos animaciones fadeInRight
    revealRightElements.forEach(el => {
        el.classList.add('reveal-right');
        revealObserver.observe(el);
    });

    // Aplicamos animaciones scaleIn
    revealScaleElements.forEach(el => {
        el.classList.add('reveal-scale');
        revealObserver.observe(el);
    });

    // --- 5. SCROLL SPY (RESALTAR ENLACE ACTIVO AL HACER SCROLL) ---
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.scrollY;

        // Verificamos si estamos en la página principal comprobando si existe la sección de servicios
        if (document.querySelector('#servicios')) {

            // 1. Manejo de secciones con ID (como Servicios)
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 150; // Ajuste para compensar el header fijo
                const sectionId = current.getAttribute('id');
                const sectionLink = document.querySelector('.nav-list a[href*="#' + sectionId + '"]');

                if (sectionLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        // Si ya está activo, no hacemos nada para evitar parpadeos
                        if (!sectionLink.classList.contains('active')) {
                            document.querySelector('.nav-list a.active')?.classList.remove('active');
                            sectionLink.classList.add('active');
                        }
                    }
                }
            });

            // 2. Manejo especial para "Inicio" (cuando estamos en la parte superior)
            if (scrollY < 100) {
                const homeLink = document.querySelector('.nav-list a[href="index.html"]');
                const currentActive = document.querySelector('.nav-list a.active');

                // Si el link de inicio existe y no está activo actualmente
                if (homeLink && (!currentActive || currentActive !== homeLink)) {
                    currentActive?.classList.remove('active');
                    homeLink.classList.add('active');
                }
            }
        }
    }

    window.addEventListener('scroll', scrollActive);



    // --- 7. SLIDER ANTES Y DESPUÉS ---
    const sliderContainers = document.querySelectorAll('.before-after-container');

    sliderContainers.forEach(container => {
        const sliderHandle = container.querySelector('.slider-handle');
        const foregroundImg = container.querySelector('.img-foreground');
        let isDragging = false;

        // Función para actualizar la posición
        function updateSliderPosition(clientX) {
            const rect = container.getBoundingClientRect();
            let offsetX = clientX - rect.left;

            // Limitar el movimiento dentro del contenedor
            if (offsetX < 0) offsetX = 0;
            if (offsetX > rect.width) offsetX = rect.width;

            // Calcular porcentaje
            const percentage = (offsetX / rect.width) * 100;


            // Aplicar estilos
            sliderHandle.style.left = percentage + '%';
            foregroundImg.style.width = percentage + '%';
        }

        // Eventos Mouse
        const handleMouseDown = (e) => {
            e.preventDefault(); // Prevenir la selección de texto
            isDragging = true;
            // Cambiar cursor a "grabbing"
            sliderHandle.style.cursor = 'grabbing';
            container.style.cursor = 'ew-resize';
        };

        sliderHandle.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', () => {
            isDragging = false;
            // Volver cursor a "grab"
            sliderHandle.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        });

        // Eventos Touch (Móvil)
        const handleTouchStart = (e) => {
            e.preventDefault(); // Prevenir comportamiento predeterminado
            isDragging = true;
            // Cambiar cursor a "grabbing" (aunque no se verá en móvil)
            sliderHandle.style.cursor = 'grabbing';
            container.style.cursor = 'ew-resize';
        };

        sliderHandle.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', () => {
            isDragging = false;
            // Volver cursor a "grab"
            sliderHandle.style.cursor = 'grab';
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevenir scroll mientras se desliza
            updateSliderPosition(e.touches[0].clientX);
        });

        // Cambiar cursor al pasar sobre el handle
        sliderHandle.addEventListener('mouseenter', () => {
            if (!isDragging) {
                sliderHandle.style.cursor = 'grab';
            }
        });

        sliderHandle.addEventListener('mouseleave', () => {
            if (!isDragging) {
                sliderHandle.style.cursor = 'grab';
            }
        });
    });

    // --- 8. EFECTO PARALLAX SUAVE ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Parallax para el Hero
        const hero = document.querySelector('.hero');
        if (hero) {
            // hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px'; // Efecto desactivado a petición del usuario.
        }

        // Parallax para otras secciones con fondo (si las hubiera)
        const pageHeaders = document.querySelectorAll('.page-header');
        pageHeaders.forEach(header => {
            header.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
        });
    });

    // --- 9. CARRUSEL DE GALERÍA DE CLÍNICA ---
    const clinicSlides = document.querySelectorAll('.clinic-slide');
    const clinicPrevBtn = document.querySelector('.clinic-prev-btn');
    const clinicNextBtn = document.querySelector('.clinic-next-btn');
    const clinicDotsContainer = document.querySelector('.clinic-carousel-dots');
    let currentClinicSlide = 0;
    let clinicAutoplayInterval;

    if (clinicSlides.length > 0) {
        // Crear dots
        clinicSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToClinicSlide(index));
            clinicDotsContainer.appendChild(dot);
        });

        const clinicDots = document.querySelectorAll('.clinic-carousel-dots .dot');

        function showClinicSlide(index) {
            // Ocultar todos
            clinicSlides.forEach(slide => slide.classList.remove('active'));
            clinicDots.forEach(dot => dot.classList.remove('active'));

            // Mostrar el actual
            clinicSlides[index].classList.add('active');
            clinicDots[index].classList.add('active');
        }

        function nextClinicSlide() {
            currentClinicSlide++;
            if (currentClinicSlide >= clinicSlides.length) {
                currentClinicSlide = 0;
            }
            showClinicSlide(currentClinicSlide);
        }

        function prevClinicSlide() {
            currentClinicSlide--;
            if (currentClinicSlide < 0) {
                currentClinicSlide = clinicSlides.length - 1;
            }
            showClinicSlide(currentClinicSlide);
        }

        function goToClinicSlide(index) {
            currentClinicSlide = index;
            showClinicSlide(currentClinicSlide);
            resetClinicAutoplay();
        }

        function resetClinicAutoplay() {
            clearInterval(clinicAutoplayInterval);
            clinicAutoplayInterval = setInterval(nextClinicSlide, 5000);
        }

        // Event Listeners
        if (clinicNextBtn) clinicNextBtn.addEventListener('click', () => {
            nextClinicSlide();
            resetClinicAutoplay();
        });

        if (clinicPrevBtn) clinicPrevBtn.addEventListener('click', () => {
            prevClinicSlide();
            resetClinicAutoplay();
        });

        // Auto-play cada 5 segundos
        clinicAutoplayInterval = setInterval(nextClinicSlide, 5000);

        // Pausar autoplay al hacer hover
        const clinicCarousel = document.querySelector('.clinic-carousel-container');
        if (clinicCarousel) {
            clinicCarousel.addEventListener('mouseenter', () => {
                clearInterval(clinicAutoplayInterval);
            });
            clinicCarousel.addEventListener('mouseleave', () => {
                clinicAutoplayInterval = setInterval(nextClinicSlide, 5000);
            });
        }
    }

    // --- 10. FORMULARIO DE CONTACTO CON REDIRECCIÓN A WHATSAPP ---
    /**
     * Documentación de la funcionalidad:
     * ---------------------------------
     * Este código gestiona el formulario de contacto de la página "Nosotros".
     * En lugar de un envío tradicional a un servidor, intercepta los datos
     * y los formatea para enviarlos a través de un clic a WhatsApp.
     *
     * Pasos del proceso:
     * 1.  **Configuración**: Se define el número de WhatsApp de destino.
     * 2.  **Selección del Formulario**: Se apunta al formulario con la clase '.contact-form'.
     * 3.  **Escucha del Evento 'submit'**: Se previene el comportamiento por defecto del formulario.
     * 4.  **Captura y Limpieza de Datos**: Se obtienen los valores de cada campo y se limpian los espacios en blanco de los extremos (trim).
     * 5.  **Validación de Campos**: Se verifica que los campos obligatorios no estén vacíos y que el email y teléfono tengan un formato válido.
     * 6.  **Construcción del Mensaje**: Se crea un texto formateado con los datos del usuario. El formato con asteriscos (`*...*`) se usa para que WhatsApp muestre el texto en negrita.
     * 7.  **Codificación para URL**: El mensaje se codifica para que pueda ser transmitido de forma segura en una URL.
     * 8.  **Redirección a WhatsApp**: Se abre una nueva pestaña (`_blank`) con la URL `https://wa.me/...` que incluye el número y el mensaje.
     * 9.  **Feedback al Usuario**: Se resetea el formulario y se muestra una alerta de confirmación.
     */

    // 1. Configuración: Número de WhatsApp en formato internacional (código de país + número).
    const WHATSAPP_NUMBER = '573116188733'; // Reemplazar si el número cambia.

    // 2. Selección del Formulario
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        // 3. Escucha del Evento 'submit'
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue.

            // 4. Captura y Limpieza de Datos
            const nombre = document.querySelector('input[name="nombre"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const telefono = document.querySelector('input[name="telefono"]').value.trim();
            const servicio = document.querySelector('select[name="servicio"]').value;
            const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

            // 5. Validación de Campos
            if (nombre === '') {
                alert('Por favor, completa tu nombre.');
                return; // Detiene la ejecución si el campo está vacío.
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            const regexTelefono = /^[0-9\s\-\+()]{7,}$/; // Permite espacios, guiones y +
            if (!regexTelefono.test(telefono)) {
                alert('Por favor, ingresa un número de teléfono válido (mínimo 7 dígitos).');
                return;
            }

            if (!servicio || servicio === '') {
                alert('Por favor, selecciona un servicio de tu interés.');
                return;
            }

            if (mensaje === '') {
                alert('Por favor, escribe un mensaje.');
                return;
            }

            // 6. Construcción del Mensaje para WhatsApp
            const textoWhatsApp = `*Nuevo contacto desde Belle Aesthetic*

*Nombre:* ${nombre}
*Email:* ${email}
*Teléfono:* ${telefono}
*Servicio de interés:* ${servicio}

*Mensaje:*
${mensaje}`;

            // 7. Codificación del Mensaje para URL
            const mensajeEncoded = encodeURIComponent(textoWhatsApp);

            // 8. Redirección a WhatsApp
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeEncoded}`;
            window.open(whatsappUrl, '_blank');

            // 9. Feedback al Usuario
            contactForm.reset();
            alert('¡Gracias por tu mensaje! Se abrirá una nueva ventana de WhatsApp para que puedas enviarlo.');
        });
    }

});
