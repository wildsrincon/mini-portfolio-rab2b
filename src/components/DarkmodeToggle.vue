<template>
  <button
    @click="toggleDarkMode"
    class="top-6 right-6 bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow transition hover:shadow-md"
    aria-label="Toggle Dark Mode"
  >
    <component :is="isDark ? Moon : Sun" class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>
