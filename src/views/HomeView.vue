<script lang="ts">
import { defineComponent } from "vue";
import type { CSSProperties } from "vue";
import type { Beatmap } from "@/interfaces/Beatmap";
import Search from "@/models/Search";
import Beatconnect from "@/services/Beatconnect";

import BeatmapComponent from "@/components/BeatmapComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default defineComponent({
  components: { SearchComponent, BeatmapComponent },
  data() {
    return {
      beatmaps: [] as Beatmap[],
      searchParameters: new Search(),
      page: 0,
      clientWidth: 0,
    };
  },
  methods: {
    search(search: Search) {
      Beatconnect.search(search, (this.page = 0)).then((maps: Beatmap[]) => {
        this.beatmaps = maps;
        this.searchParameters = search;
      });
    },
    pageEnd() {
      Beatconnect.search(
        this.searchParameters,
        (this.page = this.page + 1)
      ).then((maps: Beatmap[]) => {
        this.beatmaps = [...this.beatmaps, ...maps];
      });
    },
    handleResize() {
      this.clientWidth = this.$refs.beatmaps.clientWidth;
    },
    calculateStyle(index: number): CSSProperties {
      const rem = 20;

      const columns =
        this.clientWidth > 800 ? 3 : this.clientWidth > 500 ? 2 : 1;

      const column = index % columns;

      const row = Math.floor(index / columns);

      const columnWidth = this.clientWidth / columns - rem - rem / columns;

      const x = columnWidth * column + rem * (column + 1);
      const y = row * 248 + (row + 1) * rem;

      return {
        position: "absolute",
        top: y + "px",
        left: x + "px",
        width: columnWidth + "px",
      };
    },
  },
  mounted() {
    this.search(this.searchParameters);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
});
</script>

<template>
  <!-- TODO: Windowed rendering & fetch new page on end -->
  <SearchComponent @search="search" />
  <div class="beatmaps" ref="beatmaps">
    <div
      class="beatmaps-wrapper"
      v-for="(beatmap, index) in beatmaps"
      :key="beatmap.id"
      :style="calculateStyle(index)"
    >
      <BeatmapComponent :beatmap="beatmap" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.beatmaps {
  position: relative;
  margin-inline: auto;
  padding: 1rem;
  width: 100%;
  max-width: 1000px;
}

.beatmaps-wrapper {
  transition: top cubic-bezier(0.83, 0, 0.4, 1.01) 750ms;
}
</style>
