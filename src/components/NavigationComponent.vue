<template>
  <div class="navigation">
    <div class="navigation-container">
      <div class="navigation-container-left">
        <img
          class="navigation-container-left__logo"
          src="@/assets/logo.png"
          alt="BeatConnect Logo"
        />
        <h1 class="navigation-container-left__title">BeatConnect</h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  background-color: var(--color-background-soft);
}

.navigation-container {
  padding: 1rem;
  margin-inline: auto;
  width: 100%;
  max-width: 1000px;
}

.navigation-container-left {
  display: flex;
  align-items: center;
  gap: 1rem;

  &__logo {
    height: 2rem;
  }

  &__title {
    color: var(--color-heading);
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>
