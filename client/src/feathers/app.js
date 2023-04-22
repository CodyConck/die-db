import feathers from '@feathersjs/feathers';
// import rest from '@feathersjs/rest-client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';


const app = feathers();

const socketClient = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
  forceNew: true
});
app.configure(socketio(socketClient));

// const restClient = rest(import.meta.env.VITE_API_URL);
// app.configure(restClient.fetch(window.fetch.bind(window)));

export default app;
