const express = require('express');
const path = require('node:path');
const app = express();
const PORT = 3000;
const assetsPath = path.join(__dirname, 'public');

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

// Linking and enabling the use of EJS files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(assetsPath));

app.get('/', (req, res) => {
  res.render('index', { header: 'Mini Message Board', messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form', { header: 'New Message' });
});

app.post('/new', (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('Mini Message Board Running');
});
