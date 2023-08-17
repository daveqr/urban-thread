const mongoose = require('mongoose');

const editionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Edition = mongoose.model('Edition', editionSchema);

module.exports = Edition;
