const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	pathToIcon: {
		type: String,
		required: true,
	},
});

const Icon = model('Icon', dogSchema);
module.exports = Icon;
