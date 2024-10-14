<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Willkommen auf meiner Portfolioseite</h1>
      <p class="hero-subtitle">
        Wirtschaftsinformatik Student | Elektriker | Freediver
      </p>
      <button class="cta-button" @click="scrollToSection('about')">
        Mehr erfahren
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeroSection",
  methods: {
    scrollToSection(sectionId: string) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
});
</script>

<style scoped>
/* ... Styles für die Hero Section ... */
</style>
