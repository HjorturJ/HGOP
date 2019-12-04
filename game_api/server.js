const express = require('express');
const database = require('./database.js');

let app = express();

app.get('/status', (req, res) => {
    res.statusCode = 200;
    res.send('The API is running!\n');
});

// api call to /items which returns a list of the the 10 newest item names.
app.get('/items', (req, res) => {
    database.getItems(function(items) {
        // Order items alphabetically
        let names = items.map((x) => x.name);
        names.sort();
        names = names.slice(0, 10);
        res.statusCode = 200;
        res.send(names);
    });
});

// api call to /items/name which inserts an item to database.
app.post('/items/:name', (req, res) => {
    let name = req.params.name;
    database.insertItem(name, new Date(), function() {
        let msg = 'item inserted successfully';
        res.statusCode = 201;
        res.send(msg);
    });
});

//app.listen(3000);