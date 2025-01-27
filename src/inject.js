const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.info('Example usage:');
  console.info('> npm run inject https://station.ch');
  console.info('> npm run inject https://station.ch 320x576 myfilename.asketch.json');
  console.info('');
  throw new Error('Please provide input URL');
}

const url = process.argv[2];
let outputFile = '../page.asketch.json';
let dimensions = [ '1280', '800' ];

// Read dimensions from CLI
if (process.argv[3] && process.argv[3].split) {
  const sizes = process.argv[3].split('x');
  if (Array.isArray(sizes) && sizes.length === 2) {
    dimensions = sizes;
  }
}

// Read file name from CLI
if (process.argv[4] && process.argv[4].endsWith('.asketch.json')) {
  outputFile = `../${process.argv[4]}`;
}

function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
};

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();

  await page.setViewport({width: Number.parseInt(dimensions[0]), height: Number.parseInt(dimensions[1])});
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  await wait(1000);

  // Get the height of the rendered page
  const bodyHandle = await page.$('body');
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  await page.evaluate(() => {
    // const viewPortHeight = document.documentElement.clientHeight;
    let lastScrollTop = document.scrollingElement.scrollTop;
    // Scroll to bottom of page until we can't scroll anymore.
    const scroll = () => {
      document.scrollingElement.scrollTop += 100;//(viewPortHeight / 2);
      if (document.scrollingElement.scrollTop !== lastScrollTop) {
        lastScrollTop = document.scrollingElement.scrollTop;
        requestAnimationFrame(scroll);
      }
    };
    scroll();
  });

  // Scroll back to top
  await page.evaluate(_ => {
    window.scrollTo(0, 0);
  });

  // Some extra delay to let images load
  await wait(2000);

  await page.addScriptTag({
    path: './build/page2layers.bundle.js'
  });

  // JSON.parse + JSON.stringify hack is only needed until
  // https://github.com/GoogleChrome/puppeteer/issues/1510 is fixed
  const asketchPageJSONString = await page.evaluate(
    'JSON.stringify(page2layers.run())'
  );

  fs.writeFileSync(path.resolve(__dirname, outputFile), asketchPageJSONString);

  browser.close();
});
