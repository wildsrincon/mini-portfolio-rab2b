<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeroSection',
  props: {
    name: {
      type: String,
      default: 'Alex Díaz',
    },
    role: {
      type: String,
      default: 'Frontend Developer',
    },
    profileImage: {
      type: String,
      default: '/img/profile.jpg',
    },
    imageAlt: {
      type: String,
      default: 'Frontend Developer',
    },
    primaryBtnText: {
      type: String,
      default: 'Show Projects',
    },
    secondaryBtnText: {
      type: String,
      default: 'Contáctame',
    },
    projectsLink: {
      type: String,
      default: '#projects',
    },
  },
})
</script>

<template>
  <section class="hero">
    <div class="hero__bg-decoration">
      <div class="hero__bg-circle hero__bg-circle--1"></div>
      <div class="hero__bg-circle hero__bg-circle--2"></div>
      <div class="hero__bg-grid"></div>
    </div>

    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__intro">
          <span class="hero__greeting">¡Hi, I'm</span>
          <h1 class="hero__title">{{ name }}<span class="hero__title-dot">.</span></h1>
          <h2 class="hero__subtitle">{{ role }}</h2>
        </div>

        <p class="hero__description">
          We develop modern websites, user interfaces, web and mobile applications.
        </p>

        <div class="hero__cta">
          <a :href="projectsLink" class="hero__button hero__button--primary">{{
            primaryBtnText
          }}</a>
        </div>
      </div>

      <div class="hero__image">
        <div class="hero__code-snippet">
          <pre class="hero__code">
<code><span class="hero__code-comment">// Vue.js + TypeScript</span>
<span class="hero__code-keyword">export</span> <span class="hero__code-keyword">default</span> <span class="hero__code-function">defineComponent</span>({
  <span class="hero__code-property">setup</span>() {
    <span class="hero__code-keyword">const</span> <span class="hero__code-variable">count</span> = <span class="hero__code-function">ref</span>&lt;<span class="hero__code-type">number</span>&gt;(0);
    <span class="hero__code-keyword">const</span> <span class="hero__code-variable">increment</span> = () => {
      <span class="hero__code-variable">count</span>.<span class="hero__code-property">value</span>++;
    };

    <span class="hero__code-keyword">return</span> {
      <span class="hero__code-variable">count</span>,
      <span class="hero__code-variable">increment</span>
    };
  }
});</code>
          </pre>
          <div class="hero__image-decoration"></div>
        </div>
      </div>
    </div>

    <div class="hero__scroll">
      <span class="hero__scroll-text">Scroll Now</span>
      <div class="hero__scroll-indicator"></div>
    </div>
  </section>
</template>

<style>
.hero {
  position: relative;
  min-height: 100vh;
  padding: 3rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.hero__bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.hero__bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.hero__bg-circle--1 {
  top: 10%;
  right: 5%;
  width: 25rem;
  height: 25rem;
  background: var(--primary-color, #41b883);
}

.hero__bg-circle--2 {
  bottom: 20%;
  left: 15%;
  width: 20rem;
  height: 20rem;
  background: var(--secondary-color, #3178c6);
}

.hero__bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(31, 41, 55, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 41, 55, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.hero__container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero__intro {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero__greeting {
  font-size: 1.25rem;
  color: var(--text-light, #6b7280);
}

.hero__title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
}

.hero__title-dot {
  color: var(--primary-color, #41b883);
}

.hero__subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(
    90deg,
    var(--primary-color, #41b883),
    var(--secondary-color, #3178c6)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.hero__description {
  font-size: 1.125rem;
  max-width: 540px;
  color: var(--text-light, #6b7280);
}

.hero__highlight {
  color: var(--primary-color, #41b883);
  font-weight: 600;
}

.hero__cta {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hero__button--primary {
  background-color: var(--primary-color, #41b883);
  color: white;
  box-shadow: var(--shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
}

.hero__button--primary:hover {
  background-color: #35a474;
  transform: translateY(-2px);
  box-shadow: var(
    --shadow-lg,
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05)
  );
}

.hero__button--secondary:hover {
  background-color: var(--background-alt, #f3f4f6);
  border-color: var(--text-light, #6b7280);
  transform: translateY(-2px);
}

.hero__tech-stack {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.hero__tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hero__tech-icon {
  font-size: 2rem;
  color: var(--text-light, #6b7280);
  transition: color 0.3s ease;
  width: 2rem;
  height: 2rem;
}

.hero__tech-icon--ts {
  color: var(--secondary-color, #3178c6);
}

.hero__tech-icon--tailwind {
  color: var(--tertiary-color, #06b6d4);
}

.hero__tech-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.hero__tech-item:hover .hero__tech-icon {
  color: var(--primary-color, #41b883);
}

.hero__image {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero__profile {
  position: relative;
  z-index: 1;
}

.hero__img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 1rem;
  box-shadow: var(
    --shadow-lg,
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05)
  );
  object-fit: cover;
}

.hero__image-decoration {
  position: absolute;
  top: -1rem;
  left: -1rem;
  width: calc(100% + 2rem);
  height: calc(100% + 2rem);
  border: 2px solid var(--primary-color, #41b883);
  border-radius: 1rem;
  z-index: -1;
}

.hero__code-snippet {
  position: absolute;
  bottom: -10rem;
  right: 2rem;
  max-width: 350px;
  background-color: #1e293b;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: var(
    --shadow-lg,
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05)
  );
  transform: rotate(2deg);
}

.hero__code {
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #e5e7eb;
  overflow-x: auto;
}

.hero__code-comment {
  color: #94a3b8;
}

.hero__code-keyword {
  color: #93c5fd;
}

.hero__code-function {
  color: #fcd34d;
}

.hero__code-property {
  color: #a5b4fc;
}

.hero__code-variable {
  color: #c4b5fd;
}

.hero__code-type {
  color: #f9a8d4;
}

.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hero__scroll-text {
  font-size: 0.875rem;
  color: var(--text-light, #6b7280);
}

.hero__scroll-indicator {
  width: 1.5rem;
  height: 2.5rem;
  border: 2px solid var(--text-light, #6b7280);
  border-radius: 1rem;
  position: relative;
}

.hero__scroll-indicator::after {
  content: '';
  position: absolute;
  top: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--text-light, #6b7280);
  border-radius: 50%;
  animation: scrollDown 1.5s infinite;
}

@keyframes scrollDown {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(1rem);
  }
}

/* Responsive Styles */

@media (max-width: 1024px) {
  .hero__container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero__image {
    order: -1;
  }

  .hero__code-snippet {
    position: relative;
    bottom: 0;
    right: 0;
    transform: rotate(0);
    margin-top: 2rem;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 1.5rem 3rem;
  }

  .hero__title {
    font-size: 3rem;
  }

  .hero__subtitle {
    font-size: 1.5rem;
  }

  .hero__profile {
    display: flex;
    justify-content: center;
  }

  .hero__img {
    max-width: 300px;
  }

  .hero__code-snippet {
    max-width: 90%;
    margin: 0 auto;
    font-size: 0.7rem;
  }

  .hero__code {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 1rem 2rem;
    min-height: auto;
  }

  .hero__container {
    gap: 2rem;
  }

  .hero__title {
    font-size: 2.25rem;
  }

  .hero__subtitle {
    font-size: 1.25rem;
  }

  .hero__description {
    font-size: 1rem;
  }

  .hero__cta {
    flex-direction: column;
    width: 100%;
  }

  .hero__button {
    width: 100%;
    text-align: center;
  }

  .hero__img {
    max-width: 100%;
    height: auto;
  }

  .hero__code-snippet {
    position: relative;
    bottom: 0;
    right: 0;
    transform: none;
    max-width: 100%;
    margin-top: 1.5rem;
    padding: 0.75rem;
  }

  .hero__scroll {
    display: none;
  }

  .hero__bg-circle--1 {
    width: 15rem;
    height: 15rem;
  }

  .hero__bg-circle--2 {
    width: 12rem;
    height: 12rem;
  }
}

/* Añadir breakpoint adicional para dispositivos muy pequeños */
@media (max-width: 360px) {
  .hero__title {
    font-size: 2rem;
  }

  .hero__greeting {
    font-size: 1rem;
  }

  .hero__subtitle {
    font-size: 1.1rem;
  }

  .hero__button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .hero__scroll {
    display: none; /* Opcional: ocultar el indicador de scroll en pantallas muy pequeñas */
  }
}
</style>
