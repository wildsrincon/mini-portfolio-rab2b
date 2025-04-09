<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
import { computed, onMounted, ref } from 'vue'

const footerRef = ref<HTMLElement | null>(null)

const isDarkMode = computed(
  () =>
    document.documentElement.classList.contains('dark') || document.body.classList.contains('dark'),
)

const updateTheme = () => {
  const isDark =
    document.documentElement.classList.contains('dark') || document.body.classList.contains('dark')

  if (footerRef.value) {
    if (isDark) {
      footerRef.value.classList.add('footer--dark')
    } else {
      footerRef.value.classList.remove('footer--dark')
    }
  }
}

// Actualiza el tema cuando se monta el componente
onMounted(() => {
  updateTheme()

  // Opcional: observa cambios en las clases de dark mode
  const observer = new MutationObserver(updateTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  // Limpiar el observer cuando se desmonte el componente
  return () => observer.disconnect()
})
</script>
<template>
  <footer class="footer bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white" ref="footerRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="footer__content">
        <div class="footer__brand">
          <div class="footer__brand-header">
            <img
              class="footer__logo-img"
              :src="logo"
              alt="Company Logo"
              :class="{ filter: isDarkMode }"
            />
            <h3 class="footer__logo">
              &lt;Wilds<span class="footer__logo-accent">Rincon</span>/&gt;
            </h3>
          </div>
          <p class="footer__tagline">Crafting digital experiences with modern web technologies</p>
        </div>
        <div class="footer__social">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
          >
            <svg
              class="footer__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
          >
            <svg
              class="footer__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              ></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
          >
            <svg
              class="footer__social-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">© 2025 Wilder Rincon. All rights reserved.</p>
        <div class="footer__links">
          <a href="#" class="footer__link">Home</a>
          <a href="#about" class="footer__link">About</a>
          <a href="#projects" class="footer__link">Projects</a>
        </div>
      </div>

      <div class="footer__decoration">
        <span class="footer__decoration-dot"></span>
        <span class="footer__decoration-dot"></span>
        <span class="footer__decoration-dot"></span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  backdrop-filter: blur(10px); /* Efecto de desenfoque para un aspecto moderno */
  border-top: 1px solid rgba(229, 231, 235, 0.8); /* Borde superior en modo claro */
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

/* En modo oscuro, cambiamos los colores */
:global(.dark) .footer {
  background-color: rgba(17, 24, 39, 0.9); /* Fondo oscuro con transparencia */
  border-top: 1px solid rgba(55, 65, 81, 0.8); /* Borde superior más oscuro */
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.footer__content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
}

/* .footer__brand {
  max-width: 350px;
} */

.footer__brand-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer__logo-img {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
}

.footer__logo {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
}

.footer__logo-accent {
  color: var(--primary-color, #41b883);
}

.footer__tagline {
  color: var(--text-light, #6b7280);
  line-height: 1.5;
}

.footer__social {
  display: flex;
  gap: 1.25rem;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(107, 114, 128, 0.1);
}

.footer__social-link:hover {
  transform: translateY(-5px);
  color: var(--primary-color, #41b883);
  border-color: var(--primary-color, #41b883);
  box-shadow: 0 6px 15px rgba(65, 184, 131, 0.1);
}

.footer__social-icon {
  width: 20px;
  height: 20px;
}

.footer__bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(107, 114, 128, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.footer__copyright {
  color: var(--text-light, #6b7280);
  font-size: 0.875rem;
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__link {
  color: var(--text-light, #6b7280);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: var(--primary-color, #41b883);
}

.footer__decoration {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding-bottom: 12px;
}

.footer__decoration-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--primary-color, #41b883);
  opacity: 0.6;
}

.footer__decoration-dot:nth-child(2) {
  opacity: 0.8;
}

.footer__decoration-dot:nth-child(3) {
  opacity: 1;
}

/* Dark mode styles */
:global(.dark) .footer {
  background-color: var(--background-alt, #111827);
}

:global(.dark) .footer__logo {
  color: #f9fafb;
}

:global(.dark) .footer__social-link {
  background-color: rgba(31, 41, 55, 0.5);
  color: #f9fafb;
  border-color: rgba(75, 85, 99, 0.3);
}

/* Responsive styles */
@media (max-width: 768px) {
  .footer__content {
    flex-direction: column;
    gap: 2rem;
  }

  .footer__brand {
    width: 90vw;
    text-align: center;
  }

  .footer__brand-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer__social {
    isplay: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .footer__bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer__links {
    justify-content: center;
  }
}
</style>
