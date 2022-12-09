const express = require('express');
const cors = require('cors');
const app = express();
const socket = require('socket.io');
const expressFileUpload = require("express-fileupload");

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes.js');
const messagesRouter = require("./routes/messages.routes");

require('dotenv').config({ path: './config/.env' })
require('./config/db')
const bodyParser = require('body-parser')
const coockieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/authMiddleware');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(coockieParser());
app.use(expressFileUpload({
    createParentPath: true
}))

// jwt authentication
app.get('*', checkUser);
app.get('/api/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use("/api/messages", messagesRouter);


const serveur = app.listen(process.env.PORT, () => {
    console.log(`App écoute sur le port ${process.env.PORT}`)
})

const io = socket(serveur, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            const message = data.message;
            const file = data.file
            const dateNow = data.dateNow
            socket.to(sendUserSocket).emit("msg-received", { message, file, dateNow })
        }
    })
});