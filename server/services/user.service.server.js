module.exports = function (app, model) {

    app.post('/api/user/create', createUser);
    app.get('/api/user/:fbId', findUserByfbId);
    app.get('/api/user/id/:uid', findUserById);
    app.put('/api/user/:uid', updateUserRating);

    function  updateUserRating(req, res) {
        var userId = req.params.uid;
        var ratingflag = req.body.userRating;
        var rating = req.body.rating;
        console.log(rating);
        model.userModel.updateUserRating(rating, userId, ratingflag).then(function (result) {
            console.log(result)
            res.send(result);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        model.userModel.findUserById(userId).then(function (result) {
                res.send(result);
        }, function (err) {
            res.sendStatus(400);
        });
    }




    function findUserByfbId(req, res) {
        var fbId = req.params.fbId;
        model.userModel.findUserByfbId(fbId).then(function (result) {
            if(result ===  null){
                res.send('0');
            }else {
                res.send(result);
            }

        }, function (err) {
            res.sendStatus(400);
        });
    }

    function createUser(req, res) {
        var user = req.body;
        model.userModel.createUser(user).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
    }
};

