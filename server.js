const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes.js');

require('dotenv').config({ path: './config/.env' })
require('./config/db')
const bodyParser = require('body-parser')
const coockieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(coockieParser());

// jwt authentication
app.get('*', checkUser);
app.get('/api/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App écoute sur le port ${process.env.PORT}`)
})