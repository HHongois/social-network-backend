const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    messages : {
        type : [
            {
               auteurId: String,
               userName: String,
               contenu: String,
               date: Number 
            }
        ]
    },
    salon :{
        type:[String]
    },
    date : {
        type : Number
    }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
