<template>
  <section class="skills-section">
    <h2 class="animate__animated animate__fadeInUp">Fähigkeiten</h2>
    <canvas id="skillsChart"></canvas>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "SkillsSection",
  setup() {
    onMounted(() => {
      const ctx = (
        document.getElementById("skillsChart") as HTMLCanvasElement
      ).getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "radar",
          data: {
            labels: [
              "HTML",
              "CSS",
              "JavaScript",
              "Vue.js",
              "TypeScript",
              "Python",
            ],
            datasets: [
              {
                label: "Fähigkeiten",
                data: [50, 50, 40, 60, 60, 90],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "#36A2EB",
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      }
    });
  },
});
</script>

<style scoped>
/* ... Styles für die Skills Section ... */
</style>
