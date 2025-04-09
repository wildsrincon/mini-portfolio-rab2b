<!-- src/components/ProjectFilter.vue -->
<script setup lang="ts">
import type { IProject, ITechnology } from '@/data'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  projects: IProject[]
  technologies: ITechnology[]
}>()

const emit = defineEmits(['filter'])

// Extract all unique technologies from projects
const allTechnologies = computed(() => {
  const uniqueTechNames = new Set<string>()

  props.projects.forEach((project) => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach((tech: ITechnology) => {
        if (tech && tech.name) {
          uniqueTechNames.add(tech.name)
        }
      })
    }
  })

  return Array.from(uniqueTechNames).sort()
})

const techColorMap = computed(() => {
  const colorMap = new Map<string, string>()

  props.projects.forEach((project) => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach((tech: ITechnology) => {
        if (tech && tech.name && tech.color && !colorMap.has(tech.name)) {
          colorMap.set(tech.name, tech.color)
        }
      })
    }
  })

  return colorMap
})

// Active filters
const activeFilters = ref<string[]>([])

// Toggle a filter
const toggleFilter = (techName: string) => {
  if (activeFilters.value.includes(techName)) {
    // Remove the filter if it's already active
    activeFilters.value = activeFilters.value.filter((t) => t !== techName)
  } else {
    // Add the filter
    activeFilters.value.push(techName)
  }

  // Emit the filtered projects
  filterProjects()
}

// Clear all filters
const clearFilters = () => {
  activeFilters.value = []
  emit('filter', props.projects)
}

// Filter projects based on active filters
const filterProjects = () => {
  if (activeFilters.value.length === 0) {
    // If no filters are active, return all projects
    emit('filter', props.projects)
    return
  }

  // Filter projects that have any of the active filters
  const filtered = props.projects.filter((project) => {
    const projectTechNames = project.technologies.map((tech: ITechnology) => tech.name)

    return activeFilters.value.some((activeTech) => projectTechNames.includes(activeTech))
  })

  emit('filter', filtered)
}

// Get color for a technology
const getTechColor = (techName: string): string => {
  return techColorMap.value.get(techName) || 'blue-text-gradient'
}

// Initialize with all projects
onMounted(() => {
  emit('filter', props.projects)
})
</script>

<template>
  <div class="filter mb-8">
    <h2 class="filter__title text-lg font-medium mb-3">Filter by Technology:</h2>

    <div class="filter__options flex flex-wrap gap-2 mb-4">
      <button
        v-for="tech in allTechnologies"
        :key="tech"
        @click="toggleFilter(tech)"
        :class="[
          'filter__option',
          activeFilters.includes(tech) ? 'filter__option--active' : 'filter__option--inactive',
        ]"
      >
        <!-- Apply the gradient text class if not active -->
        <span v-if="!activeFilters.includes(tech)" :class="getTechColor(tech)">
          {{ tech }}
        </span>
        <!-- Regular text if active -->
        <span v-else>{{ tech }}</span>
      </button>
    </div>

    <div v-if="activeFilters.length > 0" class="filter__active">
      <span class="filter__active-label">Active filters:</span>
      <div class="filter__active-tags">
        <span v-for="filter in activeFilters" :key="filter" class="filter__active-tag">
          {{ filter }}
          <button @click="toggleFilter(filter)" class="filter__active-tag-remove">×</button>
        </span>
        <button @click="clearFilters" class="filter__clear">Clear all</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Filter component main block */
.filter {
  margin-bottom: 2rem;
}

.filter__title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

/* Filter options */
.filter__options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter__option {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

.filter__option:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

.filter__option--active {
  background-color: #41b883; /* blue-600 */
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter__option--inactive {
  background-color: #e5e7eb; /* gray-200 */
  color: #374151; /* gray-700 */
}

.filter__option--inactive:hover {
  background-color: #d1d5db; /* gray-300 */
}

/* Dark mode styles */
:global(.dark) .filter__option--inactive {
  background-color: #374151; /* dark:bg-gray-700 */
  color: #d1d5db; /* dark:text-gray-300 */
}

:global(.dark) .filter__option--inactive:hover {
  background-color: #4b5563; /* dark:hover:bg-gray-600 */
}

/* Active filters section */
.filter__active {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.filter__active-label {
  margin-right: 0.5rem;
}

.filter__active-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.filter__active-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: #dbeafe; /* bg-blue-100 */
  color: #1e40af; /* text-blue-800 */
}

.filter__active-tag-remove {
  margin-left: 0.25rem;
  color: #2563eb; /* text-blue-600 */
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 1rem;
  line-height: 1;
  padding: 0 0.25rem;
}

.filter__active-tag-remove:hover {
  color: #1d4ed8; /* hover:text-blue-800 */
}

/* Dark mode active filters */
:global(.dark) .filter__active-tag {
  background-color: #1e3a8a; /* dark:bg-blue-900 */
  color: #bfdbfe; /* dark:text-blue-100 */
}

:global(.dark) .filter__active-tag-remove {
  color: #93c5fd; /* dark:text-blue-300 */
}

:global(.dark) .filter__active-tag-remove:hover {
  color: #bfdbfe; /* dark:hover:text-blue-100 */
}

/* Clear all button */
.filter__clear {
  text-decoration: underline;
  margin-left: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
}

.filter__clear:hover {
  color: #9ca3af; /* hover:text-gray-800 */
}

:global(.dark) .filter__clear {
  color: #9ca3af; /* dark:text-gray-400 */
}

:global(.dark) .filter__clear:hover {
  color: #e5e7eb; /* dark:hover:text-gray-200 */
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .filter__active {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter__active-label {
    margin-bottom: 0.5rem;
  }
}
</style>
