export const sortTypes = ["Descending", "Ascending"] as const;
export const modes = ["All", "Standard", "Mania", "Taiko", "CTB"] as const;
export const statuses = [
  "Ranked",
  "Qualified",
  "Loved",
  "Unranked",
  "All",
] as const;
export const sorts = [
  "Relevance",
  "Last updated",
  "Ranked date",
  "Submitted date",
  "Length",
  "ID",
] as const;

export type SortType = typeof sortTypes[number];
export type Mode = typeof modes[number];
export type Status = typeof statuses[number];
export type Sort = typeof sorts[number];

export default class Search {
  public query = "";
  public sortType: SortType = "Descending";
  public mode: Mode = "All";
  public status: Status = "Ranked";
  public sort: Sort = "Relevance";

  public get params() {
    const sortTypes = new Map<SortType, number>([
      ["Descending", -1],
      ["Ascending", 1],
    ]);

    const sorts = new Map<Sort, string>([
      ["Relevance", "score"],
      ["Length", "average_length"],
    ]);

    return {
      query: this.query,
      mode: this.mode == "Standard" ? "std" : this.mode.toLowerCase(),
      status: this.status.toLowerCase(),
      sort: sorts.get(this.sort) || this.sort.replace(" ", "_").toLowerCase(),
      sortType: sortTypes.get(this.sortType),
    };
  }
}
