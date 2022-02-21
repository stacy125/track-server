const express = require('express');
const mongoose = require('mongoose')
const app = express();
app.get('/', (req, res) => {
    res.send('Hi there.')
});

const mongoURI = 'mongodb+srv://stacy:udemytracker@cluster0.9wdeo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance");
});

mongoose.connection.on('error', (error) => {
    console.error("Error connecting to mongo", error);
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})
