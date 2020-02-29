// Libraries
import React, { Component } from "react";
import { observer } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Store } from "../store";

// Style
import "bootstrap/dist/css/bootstrap.css";

interface IProps {
  store: Store;
}

@observer
export class Archive extends Component<IProps, {}> {
  componentDidMount() {
    const store = this.props.store;
    return store.fetchArchive();
  }

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
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Solves</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <table className="table table-sm">
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
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Solves</th>
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
