module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = mongoose.Schema({
        username: String,
        fbId: String,
        ratingFlag: {type: Boolean, default:false},
        rating:{type: Number, default:0}
    }, {collection: 'user'});
    return UserSchema;
};

