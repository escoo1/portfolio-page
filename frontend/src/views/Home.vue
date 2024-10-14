<template>
  <div class="home">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <MapSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeroSection from "../components/HeroSection.vue";
import AboutSection from "../components/AboutSection.vue";
import SkillsSection from "../components/SkillsSection.vue";
import ProjectsSection from "../components/ProjectsSection.vue";
import MapSection from "../components/MapSection.vue";

export default defineComponent({
  name: "Home",
  components: {
    HeroSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    MapSection,
  },
});
</script>

<style>
/* Falls du globale Styles hast, kannst du sie hier hinzufügen */
</style>
