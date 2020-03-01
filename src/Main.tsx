// Libraries
import React, { Component } from "react";

// Internal
import "./main.css";
import { Archive } from "./components/";

// Style
import "react-tabs/style/react-tabs.css";
import "bootstrap/dist/css/bootstrap.css";

// Store
import { Store } from "./store";
const store = new Store();

class Main extends Component<{}, {}> {
  render() {
    return (
      <div className="container">
        <div className="row"></div>
        <div className="row">
          <div className="col-md-7 mt-5">
            <Archive store={store} />
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
              but gives you the ability to search and sort through the problems.
            </p>

            <h6>Initial problem</h6>
            <p>
              This site is a result of my own frustration of not being able to
              sort the problems on Project Euler by number of solves, sequential
              number or search through them by a title (or maybe I missed
              something? :v).
            </p>

            <h6>How does it work?</h6>
            <p>
              Every two hours, a cron starts a script (check the repository)
              that scrapes the problems from the archive page, and dumps the
              data into a JSON file. This page serves you the JSON file (which
              is about 80KB-100KB, or about 0.1 MB), and with some JavaScript
              magic, basic features of sorting and searching are implemented.
            </p>
            <h6>Other</h6>
            <div className="other"></div>
            <p>
              You can find the <strong>REPOSITORY</strong>{" "}
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
            <p>
              <span className="note">NOTE:</span>The search will return you the
              first 20 results. Also, you can hit "Enter" to trigger a search.
            </p>
            <blockquote className="mt-5">
              <p>
                “Think deeply about things. Don’t just go along because that’s
                the way things are or that’s what your friends say. Consider the
                effects, consider the alternatives, but most importantly, just
                think.”
              </p>
              <span className="author">― Aaron Swartz</span>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
