module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var CommentScema = require('./comment.schema.server')();
    var CommentModel = mongoose.model('CommentModel', CommentScema);

    var api = {
        createComment: createComment,
        findAllComments: findAllComments,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllComments(movieId) {
        var promise = model.movieModel.findMovieCommentById(movieId).then(function (movie) {
            return movie;
        }, function (err) {
            return err;
        });
        return promise;
    }


    function createComment(comment, movieId) {
        var promise = CommentModel.create(comment).then(function (commentObj) {
            model.movieModel.findMovieById(movieId).then(function (movieObj) {
                movieObj.comment.push(commentObj);
                return movieObj.save();
            })
        }, function (err) {
            return err;
        });
        return promise;
    }


};