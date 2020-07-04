const express = require("express");
const http = require('http');
const Mongoose = require('mongoose');
const readline = require('readline');

const DB_URL = 'mongodb://localhost/libraryapp';
const PORT = 8080;

const app = express();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.use(express.json());

const startServer = () => {
  Mongoose.connect(DB_URL, (err) => {
    if (!err) {
      http.createServer(app).listen(PORT, () => {
        console.log("Server started on port:", PORT);
      });
    } else {
      console.error("Error in mongoose connection", err.message);
      rl.question("Type `rs` to restart server", (answer) => {
        if (answer === 'rs') {
          startServer();
        } else {
          return;
        }
      })
    }

  });
}

startServer();