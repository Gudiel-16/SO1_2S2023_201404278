const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// Create Express server
const app = express();
const PORT = process.env.PORT_SERVER || 5003;

// Connecting socker.io
const http = require("http").Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/data_mysql.route'));

app.get('/', (req, res) => {
    res.status(200).send("Hello World - NODE");
});

// Socket.io
io.on("connection", (socket) => {

    console.log(`New client connected - ${socket.id}`);

    const myInterval = setInterval(async () => {
    
        io.emit("datadinamic", elements);

    }, 3000);

    socket.on("disconnect", () => {
        console.log("client disconnected - " + socket.id);
        clearInterval(myInterval);
    });

});

// Port assignment
const server = http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = {
    app,
    server,
};