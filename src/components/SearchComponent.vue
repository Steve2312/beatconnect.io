<script setup lang="ts">
import Search, { sortTypes, modes, statuses, sorts } from "@/models/Search";
import SearchSelector from "@/components/SearchSelector.vue";
import SearchBarComponent from "@/components/SearchBarComponent.vue";
import { ref, watch } from "vue";

const search = ref<Search>(new Search());
const emit = defineEmits<{
  (e: "search", search: Search): void;
}>();

watch(search.value, async (search) => {
  emit("search", search);
});
</script>

<template>
  <div class="search">
    <div class="search-container">
      <SearchBarComponent @debounce="(query) => (search.query = query)" />
      <SearchSelector title="Modes" :options="modes" v-model="search.mode" />
      <SearchSelector
        title="Status"
        :options="statuses"
        v-model="search.status"
      />
      <SearchSelector
        title="Search by"
        :options="sorts"
        v-model="search.sort"
      />
      <SearchSelector
        title="Order"
        :options="sortTypes"
        v-model="search.sortType"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  background-color: var(--color-accent);
}

.search-container {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  margin-inline: auto;
  max-width: 1000px;
}
</style>
