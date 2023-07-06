const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/my-uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }); 

//const storage = multer.memoryStorage()
//const upload = multer({ storage: storage })

app.post('/contact/send-message', upload.single('image'), (req, res) => {

  const { author, sender, title, message } = req.body;

  if(author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, fileName: req.file.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
});

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
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});