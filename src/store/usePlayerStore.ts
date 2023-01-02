import { defineStore } from "pinia";
import type { Beatmap } from "@/interfaces/Beatmap";
import { ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const audio = new Audio();

  const beatmapID = ref(0);
  const playing = ref(false);

  audio.volume = 0.1;
  audio.onplay = audio.onpause = () => {
    playing.value = !audio.paused;
  };

  audio.onended = () => {
    beatmapID.value = 0;
  };

  const play = (beatmap: Beatmap) => {
    if (beatmap.id != beatmapID.value) {
      audio.src = beatmap.preview_url;
    }

    audio.play().then(() => {
      beatmapID.value = beatmap.id;
    });
  };

  const pause = () => {
    audio.pause();
  };

  return {
    beatmapID,
    playing,
    play,
    pause,
  };
});
