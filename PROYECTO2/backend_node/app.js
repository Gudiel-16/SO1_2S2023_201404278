const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createClient } = require("redis");

// Load environment variables from .env file
require('dotenv').config();

// Create Express server
const app = express();
const PORT = process.env.PORT_SERVER || 5003;
const HOSTREDIS = process.env.HOST_REDIS;
const PORTREDIS = process.env.PORT_REDIS;
const URL_REDIS = `redis://:@${HOSTREDIS}:${PORTREDIS}`;

// Connecting to redis
const client = createClient({
    url: URL_REDIS // redis[s]://[[username][:password]@][host][:port][/db-number]
});  

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
    
        let elements = {
            data_stored: [],
            data_total: 0,
            cantidad_notas: {}
        }

        const arrayAllKeys = await client.keys('*');

        if(arrayAllKeys.length > 0) {
            // Stored data
            let arrayLastKeys = arrayAllKeys.slice(-20);
            let ds = await client.mGet(arrayLastKeys);
            elements.data_stored = ds.map((e) => JSON.parse(e)); // retornara un null (por el array de "cantidad_notas")

            // Total data
            let dt = await client.dbSize();
            elements.data_total= dt - 1; // -1 por el array de "cantidad_notas"

            // Number of notes per course and semester 
            elements.cantidad_notas = await client.hGetAll("cantidad_notas");

            io.emit("datadinamic", elements);

        }

    }, 1500);

    socket.on("disconnect", () => {
        console.log("client disconnected - " + socket.id);
        clearInterval(myInterval);
    });

});

async function connectRedis(){
    try {
        await client.connect();
        console.log("Database Redis connected");

    } catch (error) {
        console.log("Error al conectarse a Redis " + error);
    }
}

connectRedis();

// Port assignment
const server = http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = {
    app,
    server,
};