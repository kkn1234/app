module.exports = function (app, model) {


    app.get('/api/comments/:mid', findAllCommentsForMovie);
    app.post('/api/comment/new', createComment);

    function createComment(req, res) {
        var movieId = req.body.movieId;
        var newcomment = {comment: req.body.comment, username: req.body.username};

        model.commentModel.createComment(newcomment, movieId).then(function (comment) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(400).send(err);
        });

    }

    function findAllCommentsForMovie(req, res) {
        var movieId = req.params.mid;
        model.commentModel.findAllComments(movieId).then(function (movie) {
            res.send(movie);
        }, function (err) {
            res.sendStatus(400).send(err);
        })
    }


};

