<script lang="ts">
import logo from '@/assets/images/logo.svg'
import { Menu as MenuIcon, X } from 'lucide-vue-next'
import { defineComponent, onBeforeUnmount, onMounted, ref, watch, type PropType } from 'vue'
import DarkmodeToggle from './DarkmodeToggle.vue'

interface MenuItem {
  name: string
  href: string
  current: boolean
}

export default defineComponent({
  name: 'NavBar',
  components: {
    DarkmodeToggle,
    MenuIcon,
    X,
  },
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
    menuItems: {
      type: Array as PropType<MenuItem[]>,
      default: () => [
        { name: 'Home', href: '#home', current: true },
        { name: 'About', href: '#about', current: false },
        { name: 'Projects', href: '#projects', current: false },
      ],
    },
  },
  emits: ['toggleDarkMode'],
  setup(props, { emit }) {
    const isMenuOpen = ref<boolean>(false)
    const menuItemsRef = ref<MenuItem[]>(props.menuItems)

    const toggleMenu = (): void => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const toggleDarkMode = (): void => {
      emit('toggleDarkMode')
    }

    const setActiveMenuItem = (href: string): void => {
      menuItemsRef.value = menuItemsRef.value.map((item) => ({
        ...item,
        current: item.href === href,
      }))
    }

    // Función para detectar qué sección está visible
    const checkActiveSection = (): void => {
      // Si estamos en la parte superior de la página, activar el Home
      if (window.scrollY < 100) {
        const homeItem = menuItemsRef.value.find((item) => item.href === '#home')
        if (homeItem) {
          setActiveMenuItem('#home')
          return
        }
      }

      // Obtener todas las secciones que tienen un ID correspondiente a los enlaces del menú
      const sections = menuItemsRef.value
        .map((item) => {
          // Extraer el ID del enlace (sin el #)
          const targetId = item.href.startsWith('#') ? item.href.substring(1) : null
          if (!targetId) return null

          const element = document.getElementById(targetId)
          if (!element) return null

          return {
            id: targetId,
            href: item.href,
            element,
            top: element.getBoundingClientRect().top,
          }
        })
        .filter(Boolean)

      if (sections.length === 0) return

      // Encontrar la sección más cercana a la parte superior de la ventana
      const activeSection = sections.reduce((prev, current) => {
        return current && Math.abs(current.top) < Math.abs(prev.top) ? current : prev
      }, sections[0])

      // Si la sección está dentro del viewport (con un margen)
      if (activeSection && activeSection.top < window.innerHeight / 2) {
        setActiveMenuItem(activeSection.href)
      }
    }

    // Manejar clics en enlaces
    const handleLinkClick = (href: string, event: MouseEvent): void => {
      event.preventDefault() // Prevenir el comportamiento por defecto para todos los enlaces

      // Actualizar estado activo
      setActiveMenuItem(href)

      // Si es "home", simplemente ir al inicio de la página
      if (href === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
        return
      }

      // Para otros enlaces de anclaje
      if (href.startsWith('#')) {
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Scroll suave a la sección
          targetElement.scrollIntoView({
            behavior: 'smooth',
          })
        }
      }
    }

    // Configurar detección de scroll
    onMounted(() => {
      window.addEventListener('scroll', checkActiveSection, { passive: true })
      // Comprobar la sección activa al cargar la página
      checkActiveSection()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkActiveSection)
    })

    // Actualizar menuItems cuando cambie la prop
    watch(
      () => props.menuItems,
      (newMenuItems) => {
        menuItemsRef.value = newMenuItems
      },
    )

    return {
      isMenuOpen,
      toggleMenu,
      toggleDarkMode,
      logo,
      menuItems: menuItemsRef,
      handleLinkClick,
    }
  },
})
</script>

<template>
  <nav class="navbar bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo Section que también actúa como Home -->
        <div class="navbar__brand cursor-pointer" @click="handleLinkClick('#home', $event)">
          <img class="navbar__logo-img" :src="logo" alt="Company Logo" />
          <h3 class="navbar__logo">
            &lt;Wilds<span class="navbar__logo-accent">Rincon</span>/&gt;
          </h3>
        </div>

        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button
            @click="toggleMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Main menu"
          >
            <span class="sr-only">{{ isMenuOpen ? 'Close main menu' : 'Open main menu' }}</span>
            <MenuIcon v-if="!isMenuOpen" class="h-6 w-6" aria-hidden="true" />
            <X v-else class="h-6 w-6" aria-hidden="true" />
          </button>
          <!-- Dark Mode toggle for mobile -->
          <DarkmodeToggle
            :isDarkMode="isDarkMode"
            @toggle="toggleDarkMode"
            class="ml-2"
            :small="true"
          />
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <div class="flex space-x-4">
            <a
              v-for="(item, index) in menuItems"
              :key="index"
              :href="item.href"
              @click="(e) => handleLinkClick(item.href, e)"
              :class="[
                item.current
                  ? 'bg-[#41b883] text-white dark:text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
                'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </a>
          </div>
          <!-- Dark Mode toggle for desktop -->
          <DarkmodeToggle :isDarkMode="isDarkMode" @toggle="toggleDarkMode" />
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div
      id="mobile-menu"
      class="md:hidden transition-all duration-300 ease-in-out"
      :class="isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'"
      :aria-hidden="!isMenuOpen"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          v-for="(item, index) in menuItems"
          :key="index"
          :href="item.href"
          @click="(e) => handleLinkClick(item.href, e)"
          :class="[
            item.current
              ? 'bg-[#41b883] text-white dark:text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
            'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  /* background-color: rgba(255, 255, 255, 0.9); */
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  padding: 0.75rem 0;
}

:global(.dark) .navbar {
  background-color: rgba(17, 24, 39, 0.9);
  border-bottom: 1px solid rgba(55, 65, 81, 0.8);
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar__logo-img {
  display: block;
  width: 2rem;
  height: 2rem;
}

.navbar__logo-img--inverted {
  filter: invert(1);
}

.navbar__logo {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

:global(.dark) .navbar__logo {
  color: #f9fafb;
}

.navbar__logo-accent {
  color: var(--primary-color, #41b883);
}
</style>
