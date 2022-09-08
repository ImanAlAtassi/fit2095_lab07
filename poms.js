const express = require('express');
const mongoose = require('mongoose');

const parcels = require('./routers/parcel');
const senders = require('./routers/sender');

const app = express();

app.listen(8080);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/fit2095parcels', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connected Successfully');

});

//for sender:
app.post('/senders', senders.createOne);
app.get('/senders', senders.getAll);
app.put('/sender/parcel', senders.addParcel);
app.get('/sender/:name', senders.getParcels);
app.delete('/sender', senders.deleteOne);
app.put('/sender', senders.updateOne);

//for parcel:
app.post('/parcels', parcels.createOne);
app.get('/parcels', parcels.getAll);
app.get('/parcel', parcels.getByAddress);
app.put('/parcel', parcels.updateOne);
app.delete('/parcel', parcels.deleteOne);


