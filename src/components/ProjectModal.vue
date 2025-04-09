<script setup lang="ts">
import type { IProject } from '@/data'
import { X } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  project: {
    type: Object as () => IProject,
    required: true,
  },
})

const emit = defineEmits(['close'])

const isVisible = ref(props.show)

// Update local state when prop changes
watch(
  () => props.show,
  (newValue) => {
    isVisible.value = newValue
  },
)

// Close the modal
const closeModal = () => {
  isVisible.value = false
  emit('close')
}

// Close modal when escape key is pressed
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

// Add event listener for keyboard events
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

// Clean up event listener
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeModal"
        ></div>

        <!-- Modal content -->
        <div
          class="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
          >
            <!-- Close button with Lucide X icon -->
            <button
              @click="closeModal"
              class="absolute bg-gray-300 rounded-full right-4 top-4 text-gray-900 hover:text-gray-700 dark:hover:text-gray-600 focus:outline-none z-10 px-3 py-3"
            >
              <span class="sr-only">Close</span>
              <X class="h-6 w-6" />
            </button>

            <!-- Modal header with project image -->
            <div class="relative">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-64 object-cover sm:h-72"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6"
              >
                <h3 class="text-2xl font-bold text-white" id="modal-title">
                  {{ project.title }}
                </h3>
              </div>
            </div>

            <!-- Modal body -->
            <div class="px-6 py-4">
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                {{ project.description }}
              </p>
            </div>

            <!-- Modal footer with links -->
            <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-wrap justify-end gap-3">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              >
                <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub Repository
              </a>
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none"
              >
                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
