const http = require('http');
const PORT = process.env.port || 5005;
const app = require('./app');



const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server started at port ${PORT}`)
})