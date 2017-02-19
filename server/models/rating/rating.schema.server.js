module.exports = function () {
    var mongoose = require('mongoose');
    var RatingSchema = mongoose.Schema({
        movieId:String,
        rating:{type:Number, default:0},
        star5: {type:Number, default:0},
        star4: {type:Number, default:0},
        star3: {type:Number, default:0},
        star2: {type:Number, default:0},
        star1: {type:Number, default:0}
    }, {collection: 'rating'});
    return RatingSchema;
};