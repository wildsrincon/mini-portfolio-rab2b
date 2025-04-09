<template>
  <section id="about" class="about container mx-auto px-6 py-20 max-w-5xl">
    <h2
      class="section-title__about text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
    >
      About Me
    </h2>
    <div class="flex flex-col md:flex-row items-center gap-12">
      <div class="about__text flex-1 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        <p class="mb-4">
          I'm a passionate
          <strong class="text-gradient__subtitle text-blue-600 dark:text-blue-400"
            >Frontend Developer</strong
          >
          focused on building accessible, user-friendly, and performant web applications. I love
          working with modern technologies like Vue.js, React, and TypeScript.
        </p>
        <p>
          With a strong foundation in responsive design and UI/UX, I strive to create seamless and
          delightful experiences on every device.
        </p>
      </div>
      <div class="about__skills flex-1 w-full">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Technologies I use:
        </h3>
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <li
            v-for="skill in skills"
            :key="skill"
            class="bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded text-center text-sm text-gray-800 dark:text-white font-medium"
          >
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = [
  'Vue.js',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'TailwindCSS',
  'HTML5',
  'CSS3',
  'Git & GitHub',
]
</script>

<style scoped>
.section-title__about::after {
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
</style>
