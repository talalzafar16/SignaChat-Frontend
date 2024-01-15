import { io } from "socket.io-client";
const socket = io.connect("http://192.168.43.7:8000");
export default socket;
