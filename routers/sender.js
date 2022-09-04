var Parcel = require('../models/parcel');
var Sender = require('../models/sender');
const mongoose = require('mongoose');

module.exports = {

    getParcels: function (req, res) {
        Sender.find({ name: req.params.name })
            .populate('parcels')
            .exec(function (err, sender) {
                if (err) return res.status(400).json(err);
                if (!sender) return res.status(404).json();
                res.json(sender);
            });
    },

    createOne: function (req, res) {
        let newSenderDetails = req.body;
        newSenderDetails._id = new mongoose.Types.ObjectId();

        Sender.create(newSenderDetails, function (err, sender) {
            if (err) return res.status(400).json(err);

            res.json(sender);
        });
    },


    getAll: function (req, res) {
        Sender.find()
            .populate('parcels')
            .exec(function (err, senders) {
                if (err) return res.status(400).json(err);
                if (!senders) return res.status(404).json();
                res.json(senders);
            });
    },

    addParcel: function (req, res) {
        Sender.findOne({ _id: req.body.senderId }, function (err, sender) {
                if (err) return res.status(400).json(err);
                if (!sender) return res.status(404).json();

                let newParcelDetails = req.body.parcel;
                newParcelDetails._id = new mongoose.Types.ObjectId();
                newParcelDetails.sender = req.body.senderId;
                let parcel = new Parcel(newParcelDetails);
                parcel.save(function (err) {});


                sender.parcels.push(parcel._id);
                sender.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(sender);
                });

            });
    },

    deleteOne: function (req, res) {
        Sender.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    updateOne: function (req, res) {
        Sender.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            res.json(sender);
        });
    },











};