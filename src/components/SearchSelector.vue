<script setup lang="ts">
const props = defineProps<{
  title: string;
  options: string[];
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", option: string): void;
}>();

const select = (option: string) => {
  emit("update:modelValue", option);
};
</script>

<template>
  <div class="search-selector">
    <h1 class="search-selector__title">{{ props.title }}:</h1>
    <div class="search-selector-options">
      <p
        :class="{
          'search-selector-options__option': true,
          'search-selector-options__option--active': modelValue === option,
        }"
        v-for="option in props.options"
        :key="option"
        @click="select(option)"
      >
        {{ option }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-selector {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;

  &__title {
    padding: 0.25rem;
    font-size: 0.9rem;
    font-weight: bold;
  }
}

.search-selector-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  &__option {
    display: inline-block;
    padding: 0.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0.75;
    cursor: pointer;

    &:hover {
      &:after {
        content: "";
        position: absolute;
        bottom: -0.1rem;
        left: 0;
        width: 100%;
        height: 0.1rem;
        background: white;
        opacity: 0.9;
        cursor: default;
      }
    }

    &--active {
      opacity: 1;

      &:after {
        content: "";
        position: absolute;
        bottom: -0.1rem;
        left: 0;
        width: 100%;
        height: 0.1rem;
        background: white;
        cursor: default;
      }
    }
  }
}
</style>
