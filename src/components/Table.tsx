// Libraries
import React, { Component } from "react";
import { observer } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactPaginate from "react-paginate";
import * as _ from "lodash";
import Select from "react-select";

import { Store, IArchive } from "../store";

// Style
import "bootstrap/dist/css/bootstrap.css";
import { computed } from "mobx";

interface IProps {
  store: Store;
}

const SORT_AS_OPTIONS = [
  { value: "id", label: "#" },
  { value: "solves", label: "Solves" }
];

const SORT_BY_OPTIONS = [
  { value: "asc", label: "🠕" },
  { value: "desc", label: "🠗" }
];

@observer
export class Archive extends Component<IProps, {}> {
  componentDidMount() {
    const store = this.props.store;
    return store.fetchArchive();
  }

  @computed get reRenderRows() {
    const store = this.props.store;
    return (
      <>
        {_.orderBy(store.problems, [store.sortAs], [store.sortBy])
          .slice(0, store.PER_PAGE)
          .map(n => (
            <tr key={n.id}>
              <th scope="row">{n.id}</th>
              <td>
                {" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://projecteuler.net/problem=${n.id}`}
                >
                  {n.title}
                </a>
              </td>
              <td>{new Intl.NumberFormat().format(n.solves)}</td>
            </tr>
          ))}
      </>
    );
  }

  handlePageClick = (data: any) => {
    const store = this.props.store;
    const selected = data.selected;

    store.offset = Math.ceil(selected * store.PER_PAGE);
    store.problems = store.archive.slice(store.offset, store.nextOffset);
  };

  handleSearch = (e: any) => {
    const store = this.props.store;
    let newList: any = [];

    if (e) {
      newList = _.filter(store.archive, item => {
        let title = "";

        try {
          title = item.title.toLowerCase();
        } catch (e) {}

        let filter = e.target.value.toLowerCase();

        return _.includes(title, filter);
      });
    }

    const toJSONString = JSON.stringify(newList);
    const toJSONObj: IArchive[] = JSON.parse(toJSONString);

    store.problems = toJSONObj.slice(0, 20);
  };

  onSortAsChange = (event: any) => {
    const store = this.props.store;
    store.sortAs = event.value;
  };

  render() {
    const store = this.props.store;

    return (
      <Tabs>
        <TabList>
          <Tab>Archive</Tab>
          <Tab>Top 15 Hardest</Tab>
          <Tab>Top 10 Recent</Tab>
        </TabList>

        <TabPanel>
          <div className="row">
            <div className="col-md-8">
              <input
                type="text"
                className="input mb-3"
                onChange={this.handleSearch}
                placeholder="Goldbach's other conject..."
              />
            </div>
            <div className="col-md-2">
              {" "}
              <Select
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "lightgray",
                    primary: "#000"
                  }
                })}
                className="mb-2"
                defaultValue={SORT_AS_OPTIONS[0]}
                options={SORT_AS_OPTIONS}
                onChange={this.onSortAsChange}
              />
            </div>
            <div className="col-md-2">
              {" "}
              <Select
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "lightgray",
                    primary: "#000"
                  }
                })}
                className="mb-2"
                defaultValue={SORT_BY_OPTIONS[0]}
                options={SORT_BY_OPTIONS}
                // onChange={this.onReflectorChange}
              />
            </div>
          </div>

          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Solves</th>
              </tr>
            </thead>
            <tbody>{this.reRenderRows}</tbody>
          </table>
          <div className="pagination">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              pageCount={store.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Solves</th>
              </tr>
            </thead>
            <tbody>
              {store.hardest.map(n => (
                <tr key={n.id}>
                  <th scope="row">{n.id}</th>
                  <td>
                    {" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://projecteuler.net/problem=${n.id}`}
                    >
                      {n.title}
                    </a>
                  </td>
                  <td>{new Intl.NumberFormat().format(n.solves)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <p>
            Recent problems are not included in the{" "}
            <span id="underlined">Archive</span> and{" "}
            <span id="underlined">Top 10 Hardest</span> tabs.
          </p>
          <table
            id="dtBasicExample"
            className="table table-striped table-bordered table-sm"
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th className="th-sm sorting" scope="col">
                  Solves
                </th>
              </tr>
            </thead>
            <tbody>
              {store.recent.map(n => (
                <tr key={n.id}>
                  <th scope="row">{n.id}</th>
                  <td>
                    {" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://projecteuler.net/problem=${n.id}`}
                    >
                      {n.title}
                    </a>
                  </td>
                  <td>{new Intl.NumberFormat().format(n.solves)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
        <p>
          <span className="note">NOTE</span>You are seeing results last scraped
          on: <span id="underlined">{store.stamp}</span>
        </p>
      </Tabs>
    );
  }
}
