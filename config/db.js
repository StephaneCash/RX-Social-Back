const mongoose = require("mongoose");

mongoose
    .connect(
        'mongodb+srv://Stephane_Cash:c8tDzsgG9dweEQIp@cluster0.hqeafnf.mongodb.net/rxsocial',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Connexion successful à la DB')
    }).catch(err => {
        console.log('Connexion failed à la DB', err)
    })