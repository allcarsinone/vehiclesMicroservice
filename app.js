const express = require('express');
const vehicleRouter = require('./src/routes/VehicleRouter');  
const app = express();

app.use(express.json());
app.use('/vehicle', vehicleRouter)

module.exports = app;
