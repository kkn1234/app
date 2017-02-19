module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var RatingSchema = require('./rating.schema.server')();
    var RatingModel = mongoose.model('RatingModel', RatingSchema);

    var api = {
        updateRating: updateRating,
        findMovieRating: findMovieRating,
        createMovieRating: createMovieRating,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createMovieRating( movieId) {
        var user = {};
        user.movieId = movieId;
        var promise = RatingModel.create(user).then(function (res) {
            return res;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function findMovieRating(movieId) {
        var promise = RatingModel.findOne({movieId: movieId}).then(function (rating) {
            return rating;
        }, function (err) {
            return err;
        });
        return promise;
    }



    function updateRating(userstar, movieId) {
        var promise = RatingModel.find({movieId:movieId}).then(function (rating) {
            var movie = rating[0];
            var star = Math.floor(userstar);
            switch (star){
                case 1: movie.star1 = movie.star1 + 1; break;
                case 2: movie.star2 = movie.star2 + 1; break;
                case 3: movie.star3 = movie.star3 + 1; break;
                case 4: movie.star4 = movie.star4 + 1; break;
                case 5: movie.star5 = movie.star5 + 1; break;
            }
            movie.rating = (movie.star5*5 + movie.star4*4 + movie.star3*3 + movie.star2*2 + movie.star1*1)/(movie.star1+movie.star2+movie.star3+movie.star4+movie.star5) ;

            RatingModel.update({movieId: movieId}, {
                star1: movie.star1,star2: movie.star2,star3: movie.star3,star4: movie.star4,star5: movie.star5,
                rating: movie.rating
            }).then(function () {
                return;
            });
        }, function (err) {
            return err;
        });

        return promise;
    }



}