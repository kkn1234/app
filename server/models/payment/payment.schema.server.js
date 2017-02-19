module.exports = function () {
    var mongoose = require('mongoose');
    var PaymentSchema = mongoose.Schema({
        buyer_name: String,
        buyer_email: String,
        buyer_phone: String,
        earning: Number,
        fees: String,
        payment_id: String,
        payment_request_id: String,
        status: String,
        unit_price: String,
        flag: {type: Boolean, default: false},
        userId: String
    }, {collection: 'payment'});
    return PaymentSchema;
};

