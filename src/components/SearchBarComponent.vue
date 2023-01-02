<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "debounce", value: string): void;
}>();

const value = ref<string>("");

let debounce: number;

const onInput = () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    emit("debounce", value.value);
  }, 300);
};
</script>

<template>
  <div class="search-bar">
    <font-awesome-icon
      class="search-bar__icon"
      icon="fa-solid fa-magnifying-glass"
    />
    <input
      class="search-bar__input"
      type="text"
      placeholder="Search..."
      v-model="value"
      @input="onInput"
    />
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  color: black;

  background: #f5f5f5;
  border-radius: 0.25rem;

  transition: box-shadow 0.2s ease-in-out;

  &:focus-within {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.6) !important;
    background: #ffffff;
  }

  &__input {
    flex: 4;
    padding: 0.75rem;
    border: none;
    background: transparent;

    &:focus {
      outline: none;
    }
  }

  &__icon {
    padding: 0.75rem;
  }
}
</style>
