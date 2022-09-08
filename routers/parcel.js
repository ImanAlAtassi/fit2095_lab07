var Parcel = require('../models/parcel');
var Sender = require('../models/sender');
const mongoose = require('mongoose');

module.exports = {

    createOne: function (req, res) {
        let newParcelDetails = req.body;
        newParcelDetails._id = new mongoose.Types.ObjectId();

        let parcel = new Parcel(newParcelDetails);
        parcel.save(function (err) {
            res.json(parcel);
        });
    },

    getAll: function (req, res) {
        Parcel.find()
            .populate('sender')
            .exec(function (err, parcels) {
                if (err) return res.status(400).json(err);
                if (!parcels) return res.status(404).json();
                res.json(parcels);
            });
    },

    getByAddress: function (req, res) {
        Parcel.find({ address: req.query.address })
            .populate('sender')
            .exec(function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
                res.json(parcel);
            });
    },

    updateOne: function (req, res) {
        Parcel.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();

            res.json(parcel);
        });
    },

    deleteOne: function (req, res) {

        if (req.body.id){
            Parcel.findOneAndRemove({ _id: req.body.id }, function (err) {
                if (err) return res.status(400).json(err);
                res.json();
            });  
        } else if (req.body.weight){
            Parcel.findOneAndRemove({ weight: req.body.weight }, function (err) {
                if (err) return res.status(400).json(err);
                 res.json();
            });   
        } 
    },



};