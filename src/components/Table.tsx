// Libraries
import React, { Component } from "react";
import { observer } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactPaginate from "react-paginate";

import { Store } from "../store";

// Style
import "bootstrap/dist/css/bootstrap.css";
import { computed } from "mobx";
// import { computed } from "mobx";

interface IProps {
  store: Store;
}

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
        {store.problems.map(n => (
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
    let selected = data.selected;
    store.offset = Math.ceil(selected * store.PER_PAGE);
    // store.nextOffset = store.offset + store.PER_PAGE;
    store.problems = store.archive.slice(store.offset, store.nextOffset);
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
              // breakLabel={"..."}
              pageCount={store.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
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
              {store.hardest.slice(0, 15).map(n => (
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
          <span className="note">NOTE</span>You are seeing results scraped on:{" "}
          <span id="underlined">{store.stamp}</span>
        </p>
      </Tabs>
    );
  }
}
