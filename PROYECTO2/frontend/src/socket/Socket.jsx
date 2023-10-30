import io from "socket.io-client";

const URL = "http://" + import.meta.env.VITE_IP_NODE + ":5003";

const socket = io(URL, {
    autoConnect: false // no connect automatically
});

export default socket;