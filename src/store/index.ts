import { observable } from "mobx";
import * as _ from "lodash";

interface IArchive {
  id: number;
  title: string;
  link: string;
  solves: number;
}

export class Store {
  @observable public archive: IArchive[] = [];
  @observable public problems: IArchive[] = [];
  @observable public hardest: IArchive[] = [];
  @observable public recent: IArchive[] = [];
  @observable public stamp = "N/A";

  public fetchArchive() {
    return fetch("http://localhost:3000/archive.json")
      .then(response => response.json())
      .then(archive => {
        this.stamp = archive[0] as string;

        this.archive = archive[1];
        this.problems = archive[1].slice(0, 15);

        this.hardest = _.orderBy(archive[1], ["solves"], ["asc"]).slice(0, 15);
        this.recent = archive[2].slice(0, 10);
      });
  }
}
