const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const activity = __dirname.includes('Backend-social-media')
  ? __dirname.split('/Backend-social-media/')[1]
  : __dirname;

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on ${PORT}`);
  });
});
