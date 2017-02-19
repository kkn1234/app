module.exports = function () {
    var mongoose = require('mongoose');
    var MovieSchema = mongoose.Schema({
        title: String,
        description: String,
        cast: String,
        price: Number,
        language: String,
        movieUrl: String,
        coverUrl: String,
        thumbnailUrl: String,
        cloudMovieUrl: String,
        cloudCoverUrl: String,
        cloudThumbUrl: String,
        views: {type: Number, default:0},
        earning: {type: Number, default:0},
        featuredlistAd: {type: String, default: 'No'},
        landingpageAd: {type: String, default: 'No'},
        coverAd: {type: String, default: 'No'},
        payment:[{type: mongoose.Schema.Types.ObjectId, ref:'PaymentModel'}],
        created: {type: Date, default: Date.now},
        comment:[{type: mongoose.Schema.Types.ObjectId, ref:'CommentModel'}]
    }, {collection: 'movie'});
    return MovieSchema;
};
