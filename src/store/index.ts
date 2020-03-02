import { observable, computed } from "mobx";
import * as _ from "lodash";

export interface IArchive {
  id: number;
  title: string;
  link: string;
  solves: number;
}

export class Store {
  public PER_PAGE = 20;

  @observable public archive: IArchive[] = [];
  @observable public problems: IArchive[] = [];
  @observable public hardest: IArchive[] = [];
  @observable public recent: IArchive[] = [];
  @observable public stamp = "N/A";

  @observable public offset = 0;
  @observable public numberOfRecords = 0;

  @computed get nextOffset() {
    return this.offset + this.PER_PAGE;
  }

  @computed get pageCount() {
    return this.numberOfRecords / this.PER_PAGE;
  }

  @observable public sortAs: "id" | "solves" = "id";

  // if this is false, then we just assume the user wants to sort by desc
  @observable public sortBy: "asc" | "desc" = "asc";

  public fetchArchive() {
    return fetch("http://localhost:3000/archive.json")
      .then(response => response.json())
      .then(archive => {
        this.stamp = archive[0]["stamp"] as string;
        this.numberOfRecords = archive[0]["records"];

        this.archive = archive[1]; // Everything from the archive
        this.problems = archive[1].slice(0, this.PER_PAGE); // Only the first 15

        this.hardest = _.orderBy(archive[1], ["solves"], ["asc"]).slice(0, 15); // Pre-order the hardest
        this.recent = archive[2].slice(0, 10);
      });
  }
}
