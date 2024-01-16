import { io } from "socket.io-client";
const socket = io.connect(process.env.EXPO_PUBLIC_SERVER_UR);
export default socket;
