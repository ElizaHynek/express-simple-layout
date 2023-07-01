const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index', { layout: 'dark' });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res, next) => {
  res.render('history');
});

/* We move this function to html
app.get('/hello/:name', (req, res) => {
  res.send(`<h1>Hello: ${req.params.name}!<h1>`);
});} */

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });  // render via handlebars-engin
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});