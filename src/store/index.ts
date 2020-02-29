import { observable, computed } from "mobx";
import * as _ from "lodash";

interface IArchive {
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

  public fetchArchive() {
    return fetch("http://localhost:3000/archive.json")
      .then(response => response.json())
      .then(archive => {
        this.stamp = archive[0] as string;

        this.archive = archive[1];
        this.problems = archive[1].slice(0, this.PER_PAGE);

        this.hardest = _.orderBy(archive[1], ["solves"], ["asc"]);
        this.recent = archive[2].slice(0, 10);

        this.numberOfRecords = archive[3];
      });
  }
}
