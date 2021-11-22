const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    category :{
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    value: {
        type: Number,
    }, 
    date: {
        type: String
    }


});

const Transaction = mongoose.model('transaction', TransactionSchema);
module.exports = Transaction;