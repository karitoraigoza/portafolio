document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LÓGICA DEL PRELOADER (Aplica para index.html) ---
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 2000); 
    }

    // --- 2. LÓGICA DE LA GALERÍA LIGHTBOX (Aplica para las páginas de galería) ---
    const galleryItems = document.querySelectorAll('.galeria-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;

    // Solo ejecutar si existe una galería en la página actual
    if (galleryItems.length > 0 && lightbox) {
        
        // Abrir modal al hacer clic en una imagen
        galleryItems.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                openLightbox();
            });
        });

        // Función para abrir
        function openLightbox() {
            lightbox.style.display = "flex";
            lightboxImg.src = galleryItems[currentIndex].src;
            document.body.style.overflow = "hidden"; // Evita que se haga scroll en el fondo
        }

        // Función para cerrar
        function closeLightbox() {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }

        // Función para ir a la imagen anterior
        function showPrev() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
            lightboxImg.src = galleryItems[currentIndex].src;
        }

        // Función para ir a la siguiente imagen
        function showNext() {
            currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
            lightboxImg.src = galleryItems[currentIndex].src;
        }

        // Eventos de clic en botones del Lightbox
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        // Cerrar lightbox haciendo clic fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
                closeLightbox();
            }
        });

        // Navegación con teclado (Flechas y Escape)
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === "flex") {
                if (e.key === "Escape") closeLightbox();
                if (e.key === "ArrowLeft") showPrev();
                if (e.key === "ArrowRight") showNext();
            }
        });
    }

    // --- 3. LÓGICA DEL MENÚ HAMBURGUESA ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.menu');

    if (mobileMenu && navMenu) {
        // Abrir/cerrar menú al tocar la hamburguesa
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        // Cerrar el menú automáticamente al hacer clic en cualquier enlace
        const navLinks = document.querySelectorAll('.menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }
});