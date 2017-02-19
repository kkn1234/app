module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var MembershipSchema = require('./membership-user.schema.server')();
    var MembershipModel = mongoose.model('MembershipModel', MembershipSchema);

    var api = {
        createMembershipUser: createMembershipUser,
        findUserByfbId: findUserByfbId,
        addAccountInfo: addAccountInfo,
        findMembershipById: findMembershipById,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }



    function findMembershipById(userId) {
        var promise = MembershipModel.findById(userId).then(function (user) {
            return user;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function addAccountInfo(userId, account) {
        var promise = MembershipModel.update({_id: userId},{
           accountName:account.accountName,accountNumber:account.accountNumber,
            bankName:account.bankName,ifsc:account.ifsc
        }).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function findUserByfbId(fbId) {
        var promise = MembershipModel.findOne({fbId: fbId}).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function createMembershipUser(user) {
       var promise = MembershipModel.create(user).then(function (result) {
           return result;
       }, function (err) {
           return err;
       });
       return promise;
    }

};
