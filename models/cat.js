'use strict';
 
const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
	name: { type: String, required: true }, 
	sex: { type: String, required: true },
	age: { type: String, required: true },
	breed: { type: String, required: true },
	story: { type: String, required: true },
	imageUrl: { type: String, required: true },
	imageDesc: { type: String, required: true },
});

catSchema.set('timestamps', true);

catSchema.set('toObject', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id;
	}
});

module.exports = mongoose.model('Cat', catSchema);