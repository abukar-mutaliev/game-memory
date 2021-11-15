require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const router = require('./routes/icons.route');

const app = express();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(process.env.MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Успешное подключение к БД ');
	})
	.catch((e) => {
		console.log(`Ошибка подключения к БД: ${e.message}`);
	});
app.listen(process.env.PORT, () => {
	console.log(`Сервер запушен на: ${process.env.PORT}`);
});