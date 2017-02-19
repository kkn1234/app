module.exports = function () {
    var mongoose = require('mongoose');
    var CommentSchema = mongoose.Schema({
        comment: String,
        username: String,
        created: {type: Date, default: Date.now}
    }, {collection: 'comment'});
    return CommentSchema;
};