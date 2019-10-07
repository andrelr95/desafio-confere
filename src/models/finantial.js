const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const finantialSchema = new Schema({
    status: {
        type: String,
        enum: ['received', 'expected'],
        required: true 
    },
    receivedDate: {
        type: String,
        required: true
    },
    transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
})

const Finantial = mongoose.model('Finantial', finantialSchema);

module.exports = Finantial

// {
//     "status": "received | expected",
//     "receivedDate": "06/11/2019",
//     "transaction": {},
//     "customer": {}
// }