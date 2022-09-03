var mongoose = require('mongoose');

var senderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    parcels: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Parcel'
    }]
});

module.exports = mongoose.model('Sender', senderSchema);