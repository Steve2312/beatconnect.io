<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import type { Beatmap } from "@/interfaces/Beatmap";
import { usePlayerStore } from "@/store/usePlayerStore";
import { formatSeconds } from "@/utils/time.js";

export default defineComponent({
  props: {
    beatmap: {
      type: Object as PropType<Beatmap>,
      required: true,
    },
  },
  setup(props) {
    const player = usePlayerStore();
    const selected = ref(false);
    const playing = ref(false);

    player.$subscribe((mutation, state) => {
      selected.value = state.beatmapID == props.beatmap.id;
      playing.value = selected.value && state.playing;
    });

    return {
      player,
      selected,
      playing,
    };
  },
  methods: {
    play() {
      this.player.play(this.beatmap);
    },
    pause() {
      this.player.pause();
    },
    difficultyColor(difficulty: number) {
      const colors = [
        "#4290FB",
        "#4FC0FF",
        "#4FFFD5",
        "#7CFF4F",
        "#F6F05C",
        "#FF8068",
        "#FF4E6F",
        "#C645B8",
        "#6563DE",
        "#18158E",
        "#000000",
      ];

      difficulty = Math.min(Math.round(difficulty), 10);

      return colors[difficulty];
    },
  },
  computed: {
    maps() {
      return [...this.beatmap.beatmaps].sort((a, b) => {
        return a.difficulty - b.difficulty;
      });
    },
    duration() {
      return formatSeconds(this.beatmap.average_length);
    },
  },
});
</script>

<template>
  <div class="beatmap" :class="{ 'beatmap--selected': selected }">
    <div class="beatmap-backdrop" />
    <div class="beatmap-cover" @click="playing ? pause() : play()">
      <font-awesome-icon
        class="beatmap-cover__icon"
        :icon="'fa-solid' + ' ' + (playing ? 'fa-pause' : 'fa-play')"
      />
      <img
        class="beatmap-cover__image"
        :src="beatmap.covers.cardx2"
        :alt="beatmap.title + ' cover'"
      />
    </div>
    <div class="beatmap-information">
      <h1 class="beatmap-information__title">{{ beatmap.title }}</h1>
      <h2 class="beatmap-information__artist">{{ beatmap.artist }}</h2>
      <br />
      <p class="beatmap-information__song">
        {{ duration }} ( {{ beatmap.bpm }} BPM )
      </p>
      <p class="beatmap-information__creator">
        Mapped by:
        <a
          class="beatmap-information__creator__link"
          :href="'https://osu.ppy.sh/users/' + beatmap.user_id"
          target="_blank"
          >{{ beatmap.creator }}</a
        >
      </p>
      <br />

      <div class="beatmap-information-footer">
        <p
          class="beatmap-information-footer__status"
          :style="{ backgroundColor: 'var(--color-' + beatmap.status + ')' }"
        >
          {{ beatmap.status }}
        </p>
        <div class="beatmap-information-difficulties">
          <div
            class="beatmap-information-difficulties-difficulty"
            v-for="map in maps"
            :key="map.id"
            :style="{ backgroundColor: difficultyColor(map.difficulty) }"
          >
            <img
              class="beatmap-information-difficulties-difficulty__icon"
              v-if="map.mode === 'osu'"
              src="@/assets/osu_standard.jpeg"
              alt=""
            />
            <img
              class="beatmap-information-difficulties-difficulty__icon"
              v-if="map.mode === 'mania'"
              src="@/assets/osu_mania.jpeg"
              alt=""
            />
            <img
              class="beatmap-information-difficulties-difficulty__icon"
              v-if="map.mode === 'taiko'"
              src="@/assets/osu_taiko.png"
              alt=""
            />
            <img
              class="beatmap-information-difficulties-difficulty__icon"
              v-if="map.mode === 'fruits'"
              src="@/assets/osu_ctb.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.beatmap {
  position: relative;
  background-color: var(--color-background-soft);
  border-radius: 0.25rem;
  width: 100%;
  transition: transform linear 100ms;

  &--selected,
  &:hover {
    .beatmap-cover__image {
      opacity: 0.6;
    }

    .beatmap-cover__icon {
      opacity: 1;
    }
  }

  &--selected {
    overflow: visible;
    transform: translate(0.5rem, -0.5rem);
  }

  &--selected > .beatmap-backdrop {
    width: calc(100% + 0.5rem);
    height: calc(100% + 0.5rem);
    transform: translate(-0.5rem, 0);
  }
}

.beatmap-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(
        to bottom right,
        var(--color-accent-light) 50%,
        var(--color-accent-mute) 50%
      )
      bottom left / 0.5rem 0.5rem no-repeat,
    linear-gradient(
      90deg,
      var(--color-accent-light) 0.5rem,
      var(--color-accent-mute) 0.5rem
    );

  z-index: -1;
  transition: all linear 100ms;

  clip-path: polygon(
    0.5rem 0,
    0.5rem 0,
    100% calc(100% - 0.5rem),
    100% calc(100% - 0.5rem),
    calc(100% - 0.5rem) 100%,
    0 100%,
    0 100%,
    0 0.5rem
  );
}

.beatmap-cover {
  position: relative;
  height: 6rem;
  background-color: inherit;
  user-select: none;
  cursor: pointer;

  &:hover &__icon {
    color: var(--color-accent-light);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 100ms linear;
  }

  &__icon {
    position: absolute;
    padding: 1rem;
    font-size: 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    opacity: 0;
    transition: opacity 100ms linear, color 100ms linear;
  }
}

.beatmap-information {
  background-color: inherit;
  padding: 1rem;

  &__title {
    font-weight: bold;
    font-size: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__artist {
    font-weight: 600;
    font-size: 0.9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__song {
    font-size: 0.7rem;
    font-weight: 400;
  }

  &__creator {
    font-size: 0.8rem;
    font-weight: 400;

    &__link {
      color: var(--color-accent-light);
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.beatmap-information-footer {
  display: flex;
  overflow: hidden;
  user-select: none;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 75%,
      var(--color-background-soft)
    );
  }

  &__status {
    --color-ranked: #b3ff66;
    --color-qualified: #66ccff;
    --color-loved: #ff66ab;
    --color-unranked: #4e4e4e;

    display: inline-block;
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
    color: black;
  }
}

.beatmap-information-difficulties {
  display: inline-flex;
  align-items: center;
  margin: 0 0.25rem;
  gap: 0.25rem;
}

.beatmap-information-difficulties-difficulty {
  display: grid;
  place-content: center;
  border-radius: 100%;
  padding: 0.0625rem;

  &__icon {
    height: 1rem;
    width: auto;
    filter: drop-shadow(0px 0px 5px var(--color-background-light));
  }
}
</style>
