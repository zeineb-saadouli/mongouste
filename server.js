const express = require('express');// importation de express
const app = express();// creation de l'app express
const Contact = require('./app.js');
//creation du port
const PORT = 3000;
app.use(express.json ());

app.listen(PORT, () => {
    console.log (`http://localhost:${PORT}`);
});
