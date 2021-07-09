const express = require('express');
const app = express()

app.use((req, res, next) => {
    console.log("Loading");
    next();
})

app.use(express.json());
