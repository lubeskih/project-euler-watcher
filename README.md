# Project Euler Watcher

This repository consist of a Python script and a React application that work together to solve the problem
of not being able to sort or search through the problems
on Project Euler easily.

Genrelly, this is a result of my own frustration from some of the problems mentioned above.

## Building

First thing first, clone the repository:

```
$ git clone https://github.com/lubeskih/project-euler-watcher.git
```

### Python script

The Python script (located under `scripts/scrape/`) is a scraper that extracts the problems (the problems include the archive page, as well as the most recent ones) from the Project Euler archive page and dumps them into a JSON file.

To start the script, I would recommend first installing [Virtualenv](https://virtualenv.pypa.io/en/latest/), and then:

```
virtualenv venv --python=python3
```

```
pip install -r requirements.txt
```

and to run it:

```
python scrape.py
```

The JSON file will be located in the same directory, and the dump should look like this:

```
[
  {stamp: "Sat, Feb 29, 2020 at 10:45 PM", records: 600 },  # METADATA
  [{ id: 1, title: "example title" }, {...}],               # ARCHIVE
  [{ id: 5, title: "another example title" }, {...}]        # RECENT PROBLEMS
]
```

In order for this to work locally, move the JSON file into the `public` directory.

### React App

In the root directory, to install the required packages - run:

```
yarn
```

To start the application (defaults to port `3000`), run:

```
yarn start
```

Or to build it:

```
yarn build
```

`NOTE:` After building, you may want to use a HTTP server to serve the builded application, for example (inside the `build` directory):

```
python3 -m http.server
```

## Contributing

Feel free to open a PR if you feel like you can improve something or you know a better solution. This was written in a quick and dirty way in one weekend, so don't expect the code to shine. :)

## License

MIT, [see here](License.md).