module.exports = function (app, model) {

    app.post('/api/membership/user', createMembershipUser);
    app.post('/api/membership/account/:uid', addAccountInfo);
    app.get('/api/membership/:fbId', findUserByfbId);
    app.get('/api/membership/user/:uid', findUserById);

    function findUserById(req, res) {
        var userId = req.params.uid;
        model.membershipModel.findMembershipById(userId).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400);
        });
    }

    function addAccountInfo(req, res) {
        var userId = req.params.uid;
        var account = req.body;
        model.membershipModel.addAccountInfo(userId, account).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400);
        });
    }

    function findUserByfbId(req, res) {
        var fbId = req.params.fbId;
        model.membershipModel.findUserByfbId(fbId).then(function (result) {
            if(result ===  null){
                res.send('0');
            }else {
                res.send(result);
            }

        }, function (err) {
            res.sendStatus(400);
        });
    }

    function createMembershipUser(req, res) {
        var user = req.body;
        model.membershipModel.createMembershipUser(user).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
    }
};
