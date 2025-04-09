<script setup lang="ts">
import ProjectModal from '@/components/ProjectModal.vue'
import type { IProject } from '@/data'
import { ref } from 'vue'

defineProps<{
  project: IProject
}>()

const showModal = ref(false)
const openModal = () => {
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div
    class="project-card bg-white dark:bg-gray-800 rounded-xl p-4 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    @click="openModal"
  >
    <div class="project-card__image-container overflow-hidden rounded-2xl">
      <img
        :src="project.image"
        alt="project image"
        class="project-card__image w-full h-[230px] object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
    <h2 class="project-card__title text-xl font-semibold my-3">{{ project.title }}</h2>
    <p class="project-card__description text-gray-700 dark:text-gray-300 mb-3">
      {{ project.description }}
    </p>

    <!-- Display technologies -->
    <div class="project-card__technologies flex flex-wrap gap-1 mb-3">
      <span
        v-for="(tech, index) in project.technologies.slice(0, 3)"
        :key="index"
        class="project-card__tech px-2 py-1 bg-slate-300 dark:bg-gray-500 rounded-full text-xs"
      >
        <span :class="tech.color">{{ tech.name }}</span>
      </span>
      <span
        v-if="project.technologies.length > 3"
        class="project-card__tech-more px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
      >
        +{{ project.technologies.length - 3 }} more
      </span>
    </div>

    <a
      :href="project.link"
      target="_blank"
      class="project-card__link text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-flex items-center group"
      @click.stop
    >
      View Project
      <span
        class="project-card__link-arrow transform transition-transform duration-300 group-hover:translate-x-1 ml-1"
        >→</span
      >
    </a>

    <ProjectModal :show="showModal" :project="project" @close="closeModal" />
  </div>
</template>

<style scoped>
/* Main block */
.project-card {
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Block modifiers */
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Elements */
.project-card__image {
  transition: transform 0.5s ease;
}

.project-card__link {
  /* Base styles for the link element */
}

.project-card__link-arrow {
  transition: transform 0.3s ease;
}

/* Element state modifications */
.project-card:hover .project-card__image {
  transform: scale(1.05);
}

.project-card:hover .project-card__link-arrow {
  transform: translateX(4px);
}

/* Pseudo-element for glow effect */
.project-card:hover::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(
    circle at center,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(59, 130, 246, 0) 70%
  );
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  animation: project-card-glow-in 0.4s forwards;
}

/* Animation with namespace */
@keyframes project-card-glow-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
