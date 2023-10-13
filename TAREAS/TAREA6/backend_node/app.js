const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createClient } = require("redis");

// const { Server } = require('socket.io');

// Create Express server
const app = express();
const PORT = process.env.PORT_SERVER || 5001;

// Connecting socker.io
const http = require("http").Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

// Connecting to redis
const client = createClient({
    url: 'redis://:@172.17.0.2:6379' // redis[s]://[[username][:password]@][host][:port][/db-number]
});  

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {

    console.log(`New client connected - ${socket.id}`);

    const myInterval = setInterval(async () => {
        // console.log("enviado");
        const arrayAllKeys = await client.keys('*');

        if(arrayAllKeys.length > 0) {
            let arrayLastKeys = arrayAllKeys.slice(-20);
            let elements = await client.mGet(arrayLastKeys);
            elements = elements.map((e) => JSON.parse(e));

            io.emit("dataredis", elements);
        }
    }, 3000);

    socket.on("disconnect", () => {
        console.log("client disconnected - " + socket.id);
        clearInterval(myInterval);
    });

});

app.get("/api/data", async (req, res) => {
    try {
        // const reply = await client.get("3fff357a-e664-4362-a3c8-c9d63e31e7e1");
        const reply = await client.keys('*');
        let mykeys = reply.slice(-20);
        console.log(reply);

        let element = await client.mGet(mykeys);
        element = element.map((e) => JSON.parse(e));

        // mykeys.forEach(async (mykey) => {
        //     let element = await client.mGet(mykey);
        //     arrData.push(JSON.parse(element));
        // });

        // let siuu = ['a','b','c','d','e','f','g','h','i'];
        // console.log(siuu.slice(-20));

        // if (reply) {
        //     console.log("using cached data");
        //     return res.send(JSON.parse(reply));
        // }

        // console.log(element);
        res.send({"status": "200", "msg": "Data obtenida con exito.", "data": element});

    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
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