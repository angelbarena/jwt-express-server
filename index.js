const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//DB Config
const db = ('mongodb://localhost:27017/auth');
//Connect DB
mongoose.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type:'*/*'}));
//app.use(bodyParser.urlencoded({ extended: true }));

//Routes Setup
const router = require('./router');
app.use(router);

//Server Setup
const port  = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);