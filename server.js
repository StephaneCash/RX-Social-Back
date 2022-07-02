const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const app = express();


//routes
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App écoute sur le port ${process.env.PORT}`)
})