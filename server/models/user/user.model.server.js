module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByfbId: findUserByfbId,
        findUserById: findUserById,
        updateUserRating:updateUserRating,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function updateUserRating(rating, userId, ratingflag) {
        var promise = UserModel.findOneAndUpdate({_id: userId}, {
            ratingFlag:ratingflag,
            rating: rating
        }).then(function (user) {
            return user;
        }, function (err) {
            return err;
        });
        return promise;
    }


    function findUserById(userId) {
        var promise = UserModel.findById(userId).then(function (user) {
            return user;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function findUserByfbId(fbId) {
        var promise = UserModel.findOne({fbId: fbId}).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function createUser(user) {
        var promise = UserModel.create(user).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

};

