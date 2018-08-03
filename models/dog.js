'use strict';
 
const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
	name: { type: String, required: true }, 
	sex: { type: String, required: true },
	age: { type: String, required: true },
	breed: { type: String, required: true },
	story: { type: String, required: true },
	imageUrl: { type: String, required: true },
	imageDesc: { type: String, required: true },
});

dogSchema.set('timestamps', true);

dogSchema.set('toObject', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id;
	}
});

module.exports = mongoose.model('Dog', dogSchema);