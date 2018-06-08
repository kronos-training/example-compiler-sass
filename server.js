const { join } = require('path');
const { writeFileSync } = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const themes = require('./themes.json');

const compiler = webpack(webpackConfig);
const app = express();

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  publicPath: '/static'
}));

app.get('/:theme', (req, res) => {
  const theme = themes[req.params.theme];

  const filename = join(process.cwd(), 'styles/_theme.scss');
  const configFile = theme;

  writeFileSync(filename, configFile);
  res.send(`
    <!doctype html>
    <html>
      <head></head>
      <link href="/static/theme.css" rel="stylesheet">
      <body class="theme">
        <h1>Hello world</h1>

        <select onchange="changeTheme(this.value)">
          <option value="">- Seleccione -</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
        <script>
          function changeTheme(color) {
            if (color) {
              window.location.href = "/" + color;
            }
          }
        </script>
      </body>
    </html>
  `);
});


app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head></head>
      <link href="/static/theme.css" rel="stylesheet">
      <body class="theme">
        <h1>Hello world</h1>

        <select onchange="changeTheme(this.value)">
          <option value="">- Seleccione -</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
        <script>
          function changeTheme(color) {
            if (color) {
              window.location.href = "/" + color;
            }
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.info('Running on port 3000');
});