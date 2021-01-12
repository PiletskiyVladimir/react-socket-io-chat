let socket = require('socket.io-client')(require('./settings.json').serverUrl);

export default socket;