module.exports = function () {
    var mongoose = require('mongoose');
    var MembershipSchema = mongoose.Schema({
        username: String,
        fbId: String,
        accountName: String,
        accountNumber: Number,
        bankName: String,
        ifsc: String,
        movie:[{type: mongoose.Schema.Types.ObjectId, ref:'MovieModel'}]
    }, {collection: 'membership'});
    return MembershipSchema;
};
