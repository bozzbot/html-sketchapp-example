# Webpage to Sketch Conversion

The designers of Station have the need to quickly recreate a client website in
Sketch to highlight issues or propose improvements. They found the [HTML Sketch Plugin](https://github.com/html-sketchapp/html-sketchapp)
which lets them import an almost Sketch file  `.asketch.json`.

This is a small Node.js utility that can provide such a JSON file but currently
needs local installation. So at the moment they need to as a developer (you) to
run this as most have no Node environment locally.
So here we are. Let's go through this.

## What to tell a designer

1. Install the latest version of the [Sketch Plugin](https://github.com/html-sketchapp/html-sketchapp/releases)
2. Import the provided `*.asketch.json` over `Plugins > From Asketch > Import` and chose the file
3. Check for any z-index and grouping issues and make sure all images are there

## How do I run it?

```sh
npm i # installs dependencies
npm run build # builds src/page2layers.js script that gets injected into a page
npm run inject https://station.ch  # takes an URL and path where page.asketch.json should be saved
# You can also specify dimensions and file name as 3rd and 4th parameter
npm run inject https://station.ch 320x576 myfilename.asketch.json
```

This creates a `*.asketch.json` file in the project root that can then be loaded
into Sketch using the [brainly/html-sketchapp](https://github.com/brainly/html-sketchapp) plugin.


# Original Readme of the Project

This project was cloned from [html-sketchapp-example](https://github.com/html-sketchapp/html-sketchapp-example).

## html-sketchapp-example

Example use of [brainly/html-sketchapp](https://github.com/brainly/html-sketchapp).

This script takes an URL and produces a `page.asketch.json` file that can be loaded to Sketch via [brainly/html-sketchapp](https://github.com/brainly/html-sketchapp) plugin.

<img src="https://i.imgur.com/QuIESkW.gif" width="100%" />


## It's buggy!

You can read about current limitations [here](https://github.com/brainly/html-sketchapp/wiki/What's-supported%3F).


## What's next?

Importing whole pages shows what [html-sketchapp](https://github.com/brainly/html-sketchapp) can do, but it's probably not that much useful (is it?). See [brainly/html-sketchapp-style-guide](https://github.com/brainly/html-sketchapp-style-guide) which is used at Brainly to convert front-end style guide into a set of Sketch symbols, text styles and document colors.
