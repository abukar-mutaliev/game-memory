const Icons = require('../models/icons.model');
const axios = require('axios');

module.exports.Controller = {
	getIcons: async (req, res) => {
		try {
			const icons = await Icons.find();
			res.json(icons);
		} catch (e) {
			res.json(e.message);
		}
	},
};
