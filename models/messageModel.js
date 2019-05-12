const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    contenu :{
        type : String
    },
    destinataire : {
        type: Number
    },
    expediteur : {
        type : Number
    },
    date : {
        type : Number
    }
});

module.exports = mongoose.model('Post', MessageSchema);
