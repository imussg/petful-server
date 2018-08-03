'use strict';

const mongoose = require('mongoose');
const Dog = require('../models/dog');
const Cat = require('../models/cat');

mongoose.connect(DATABASE_URL)
	.then(() => mongoose.connection.db.dropDatabase())
	.then(() => {