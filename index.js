'use strict';

let cats = [
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageUrl: 'https://cdn3-www.cattime.com/assets/uploads/gallery/abyssinian-cats-and-kittens/abyssinian-1.jpg',
    imageDescription: 'Kitty staring stoicly into the abyss',
    name: 'Cleopatra',
    sex: 'Female',
    age: 10,
    breed: 'Abyssinian'
  }
];
let dogs = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageUrl: 'https://images.dog.ceo/breeds/bullterrier-staffordshire/n02093256_5936.jpg',
    imageDescription: 'A bull terrier enjoying a stick!',
    name: 'Bud',
    sex: 'Male',
    age: 4,
    breed: 'Staffordshire Bullterrier',
    story: 'Roaming the streets looking for sticks'
  }
];

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.json());

app.get('/api/cat', (req, res) => {
  res.json(cats[0]);
});

app.get('/api/dog', (req, res) => {
  res.json(dogs[0]);
});

app.delete('/api/cat', (req, res) => {
  cats = cats.slice(1, cats.length);
  res.sendStatus(204);
});

app.delete('/api/dog', (req, res) => {
  dogs = dogs.slice(1, dogs.length);
  res.sendStatus(204);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
