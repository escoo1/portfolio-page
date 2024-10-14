<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">Mein Portfolio</router-link>
    </div>
    <ul :class="['nav-links', { 'nav-active': menuOpen }]">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/projects">Projekte</router-link></li>
      <li><router-link to="/contact">Kontakt</router-link></li>
    </ul>
    <div class="menu-icon" @click="toggleMenu">
      <!-- Verwende ein Icon, z. B. von Font Awesome -->
      <i class="fas fa-bars"></i>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Navbar",
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    return { menuOpen, toggleMenu };
  },
});
</script>

<style scoped>
/* ... Styles für die Navbar ... */
</style>
