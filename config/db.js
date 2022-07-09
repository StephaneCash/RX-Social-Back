const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.hqeafnf.mongodb.net/rxsocial",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Connexion successful à la DB')
    }).catch(err => {
        console.log('Connexion impossible à la DB', err)
    })