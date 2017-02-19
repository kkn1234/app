module.exports = function (app, model) {

    app.put('/api/rating/update/:mid',updateMovieRating);
    app.get('/api/rating/:mid', findMovieRating);
    app.post('/api/rating/create', createMovieRating);

    function createMovieRating(req, res) {
        var movieId = req.body.mid;
        model.ratingModel.createMovieRating(movieId).then(function (rating) {
            res.send(rating);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
    }

    function findMovieRating(req, res) {
        var movieId = req.params.mid;
        model.ratingModel.findMovieRating(movieId).then(function (rating) {
            if (rating !== null) {
                res.send(rating);
            } else {
                res.send('0');
            }

        }, function (err) {
            res.sendStatus(400).send(err);
        });
    }

    function updateMovieRating(req, res) {
        var star = req.body.star;
        var movieId = req.params.mid;
        model.ratingModel.updateRating(star, movieId).then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(400);
        });
    }



};
