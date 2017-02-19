module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var MovieSchema = require('./movie.schema.server')();
    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    var api = {
        createMovie: createMovie,
        createAdvertise: createAdvertise,
        updateVideoUrlMovie: updateVideoUrlMovie,
        updateCoverUrlMovie: updateCoverUrlMovie,
        updatethumbnailUrlMovie: updatethumbnailUrlMovie,
        publishVideo: publishVideo,
        findAllMovie: findAllMovie,
        findMovieById: findMovieById,
        findMovieCommentById: findMovieCommentById,
        incrementView: incrementView,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function incrementView(data, movieId) {
        var promise = MovieModel.findById(movieId).then(function (movieObj) {
            var viewCount = movieObj._doc.views + data.view;
            var earningCount = movieObj._doc.earning + data.earning;
            return MovieModel.update({_id: movieId}, {
                views: viewCount,
                earning: earningCount
            });
        }, function (err) {
            return err;
        });
        return promise;
    }

    function findMovieCommentById(movieId) {
        return MovieModel.findById(movieId).populate('comment').exec();
    }



    function findMovieById(movieId) {
        var promise = MovieModel.findById(movieId).then(function (movie) {
            return movie;
        }, function (err) {
            return err;
        });
        return promise;
    }
    
    function findAllMovie() {
     var promise = MovieModel.find().then(function (movies) {
         return movies;
     }, function (err) {
         return err;
     });
     return promise;
    }

    function publishVideo(userId, movieId) {
        var promise = MovieModel.findById(movieId).then(function (result) {
            model.membershipModel.findMembershipById(userId).then(function (user) {
                user.movie.push(result);
                return user.save();
            });
        }, function (err) {
            return err;
        });
        return promise;
    }

    function updatethumbnailUrlMovie(thumbnailUrl, cloudThumbUrl, movieId) {
        var promise = MovieModel.update({_id: movieId}, {
            thumbnailUrl: thumbnailUrl, cloudThumbUrl:cloudThumbUrl
        }).then(function (status) {
            return status;
        },function (err) {
            return err;
        });
        return promise;
    }

    function updateCoverUrlMovie(coverUrl, cloudCoverUrl, movieId) {
        var promise = MovieModel.update({_id: movieId}, {
            coverUrl: coverUrl, cloudCoverUrl: cloudCoverUrl
        }).then(function (status) {
            return status;
        },function (err) {
            return err;
        });
        return promise;
    }
    function updateVideoUrlMovie(videoUrl, cloudMovieUrl, movieId) {
        var promise = MovieModel.update({_id: movieId}, {
            movieUrl: videoUrl, cloudMovieUrl: cloudMovieUrl
        }).then(function (status) {
            return status;
        },function (err) {
            return err;
        });
        return promise;
    }

    function createAdvertise(promotion, movieId) {
        var promise = MovieModel.update({_id: movieId}, {
            featuredlistAd: promotion.featuredlistAd,
            landingpageAd: promotion.landingpageAd,
            coverAd: promotion.coverAd
        }).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function createMovie(movie, userId) {
        var promise = MovieModel.create(movie).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }
};