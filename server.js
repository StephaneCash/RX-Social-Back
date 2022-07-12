const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const bodyParser = require('body-parser')
const coockieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(coockieParser());

// jwt authentication
app.get('*', checkUser);

//routes
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App écoute sur le port ${process.env.PORT}`)
})