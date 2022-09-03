var mongoose = require('mongoose');

var parcelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sender'
    },
    address: {type: String},
    weight: {type: Number},
    fragile: {type: Boolean}
});

module.exports = mongoose.model('Parcel', parcelSchema);