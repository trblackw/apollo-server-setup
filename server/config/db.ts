const mongoose = require('mongoose');
const DB_URI = `mongodb://localhost:27017/gql-chat-demo`;
// mongoose.setDebug('true');
mongoose.connect(DB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'));
mongoose.connection.on('error', (error: any) => console.error(error));

module.exports = mongoose;