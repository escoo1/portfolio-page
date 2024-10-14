<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style>
/* Globale Stile */
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #333;
}

/* Responsivität */
@media (max-width: 768px) {
  /* Mobile Styles */
}

/* Kombinierter Selektor */
.navbar .nav-links li a:hover {
  color: #ff6600;
}
</style>
