module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var PaymentSchema = require('./payment.schema.server')();
    var PaymentModel = mongoose.model('PaymentModel', PaymentSchema);

    var api = {
        createPaymentDetails: createPaymentDetails,
        updatePaymentDetails: updatePaymentDetails,
        findPaymentById: findPaymentById,
        updateFlag: updateFlag,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function updateFlag(payId) {
        var promise = PaymentModel.update({_id: payId}, {
            flag: true
        }).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function findPaymentById(payId) {
        var promise = PaymentModel.findById(payId).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

    function updatePaymentDetails(data, movieId) {
        var promise = model.movieModel.findMovieById(movieId).then(function (movie) {
            movie.payment.push(data);
            return movie.save();
        }, function (err) {
            return err;
        });
        return promise;
    }

    function createPaymentDetails(data, movieId) {
        var promise = PaymentModel.create(data).then(function (result) {
            return result;
        }, function (err) {
            return err;
        });
        return promise;
    }

};
