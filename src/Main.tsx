import React, { Component } from "react";

// Internal
import "./main.css";
import archive from "./archive.json";

// Style
import "bootstrap/dist/css/bootstrap.css";

interface IProps {}

interface IState {
  stamp: string;
  data: any;
}

class Main extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      stamp: "N/A",
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      stamp: archive[0] as string,
      data: archive[1].slice(0, 15)
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7 mt-5">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Solves</th>
                </tr>
              </thead>
              <tbody>
                {data.map((n: any) => (
                  <tr>
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
          </div>
          <div className="col-md-5 mt-5 right-column">
            <h6>About this site</h6>
            <p>
              What you see here is a page that mirrors the{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://projecteuler.net/archives"
              >
                Project Euler archive page
              </a>{" "}
              but enables you to search and sort through the problems more
              efficiently.
            </p>

            <h6>Initial problem</h6>
            <p>
              This site is a result by my own frustration of not being able to
              sort the problems on Project Euler by number of solves, sequential
              number or search through them by a title.
            </p>

            <h6>How does it work?</h6>
            <p>
              Every two hours, a cron starts a script that scrapes the problems
              from the archive page, and dumps the data into a JSON file. This
              page serves you the JSON file (which is about 80KB-100KB, or about
              0.1 MB), and with trivial JavaScript magic, basic features of
              sorting and searching are implemented.
            </p>
            <h6>Other</h6>
            <div className="other"></div>
            <p>
              You can find the <strong>GitHub REPOSITORY</strong>{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/lubeskih/project-euler-watcher"
              >
                here
              </a>
              . Written with ❤️ by{" "}
              <a target="_blank" rel="noopener noreferrer" href="https://lh.mk">
                lh.mk
              </a>
              . Enjoy using it as I enjoyed writing it.{" "}
            </p>
          </div>
        </div>
        <hr />
        <p>
          You are seeing results scraped on:{" "}
          <span id="underlined">{archive[0]}</span>
        </p>
      </div>
    );
  }
}

export default Main;
