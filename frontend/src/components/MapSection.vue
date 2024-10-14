<template>
  <section class="map-section">
    <h2>Standort</h2>
    <div id="map"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Importiere die Leaflet CSS

export default defineComponent({
  name: "MapSection",
  setup() {
    onMounted(() => {
      const map = L.map("map").setView([46.94809, 7.44744], 13); // Setze den Startpunkt auf Bern
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
    });
  },
});
</script>

<style scoped>
.map-section {
  padding: 60px 30px;
  text-align: center;
}

.map-section h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

/* Stelle sicher, dass die Karte die richtige Größe hat */
#map {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
</style>
