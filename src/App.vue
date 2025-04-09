<script setup lang="ts">
import { HeroInfo, projects as projectsData, type IProject, type ITechnology } from '@/data'
import { defineComponent, onMounted, ref } from 'vue'
import AboutSection from './components/AboutSection.vue'
import AppFooter from './components/AppFooter.vue'
import HeroSection from './components/HeroSection.vue'
import NavBar from './components/NavBar.vue'
import ProjectCard from './components/ProjectCard.vue'
import ProjectFilter from './components/ProjectFilter.vue'

const allProjects = ref<IProject[]>([])
const filteredProjects = ref<IProject[]>([])
const technologies = ref<ITechnology[]>([])
const heroData = HeroInfo

// Apply filters from the filter component
const handleFilter = (filtered: IProject[]) => {
  filteredProjects.value = filtered
}

onMounted(() => {
  allProjects.value = projectsData
  filteredProjects.value = projectsData
})
defineComponent({
  name: 'App',
  components: {
    HeroSection,
  },
})
</script>

<template>
  <div class="nav-container">
    <NavBar :isDarkMode="true" />
  </div>

  <main
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
  >
    <!-- Hero Section -->
    <section id="hero" class="hero-container">
      <HeroSection name="Wilder Rincon" role="Frontend Developer" :profileImage="heroData.image" />
    </section>

    <!-- About Section -->
    <section id="about" class="about-section max-w-5xl mx-auto px-6 py-6">
      <AboutSection />
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section max-w-5xl mx-auto px-6 py-16">
      <header class="section-header mb-12">
        <h2 class="section-title text-4xl font-bold text-center">Projects</h2>
        <p
          class="section-subtitle text-center mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          <span class="text-gradient__subtitle">Discover my creative journey</span> through these
          carefully crafted web experiences that showcase my technical expertise
        </p>
      </header>

      <div class="projects-content">
        <!-- Filter Component -->
        <div class="filter-container mb-8">
          <ProjectFilter
            :projects="allProjects"
            :technologies="technologies"
            @filter="handleFilter"
          />
        </div>

        <!-- Projects Display Area -->
        <div class="projects-results">
          <!-- Empty State -->
          <div v-if="filteredProjects.length === 0" class="empty-state text-center py-10">
            <h3 class="empty-state-title text-xl font-medium mb-2">
              No projects match your filters
            </h3>
            <p class="empty-state-text text-gray-600 dark:text-gray-400">
              Try selecting different technologies or clear your filters.
            </p>
          </div>

          <!-- Projects Grid -->
          <div v-else class="projects-grid grid gap-6 md:grid-cols-3">
            <ProjectCard
              v-for="project in filteredProjects"
              :key="project.id"
              :project="project"
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- You could add a footer here as well for better semantic structure -->
  <AppFooter />
</template>

<style scoped>
/* You can add section-specific styles here */
.nav-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
}

:global(.dark) .nav-container {
  background-color: rgba(17, 24, 39, 0.9);
  border-bottom: 1px solid rgba(55, 65, 81, 0.8);
}

.projects-section {
  scroll-margin-top: 2rem; /* Helps with smooth scrolling to the section */
  padding-bottom: 4rem;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  margin: 16px auto 0;
  background: linear-gradient(
    90deg,
    var(--primary-color, #41b883),
    var(--secondary-color, #3178c6)
  );
  border-radius: 2px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-subtitle {
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.section-header {
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: var(--primary-color, #41b883);
  border-radius: 2px;
}

/* Additional responsive adjustments if needed */
@media (max-width: 768px) {
  .projects-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}
</style>
