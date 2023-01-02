import axios from "axios";
import type { Beatmap } from "@/interfaces/Beatmap";
import type Search from "@/models/Search";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const search = async (
  search: Search,
  page: number
): Promise<Beatmap[]> => {
  const response = await instance.get("/search", {
    params: {
      q: search.params.query,
      m: search.params.mode,
      s: search.params.status,
      sort: search.params.sort,
      sort_type: search.params.sortType,
      p: page,
    },
  });

  return response.data.beatmaps;
};

export default {
  search,
};
