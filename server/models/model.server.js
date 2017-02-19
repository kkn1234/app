module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/production');

    var membershipModel = require('./membership/membership-user.model.server')();
    var movieModel = require('./movie/movie.model.server')();
    var userModel =require('./user/user.model.server')();
    var paymentModel = require('./payment/payment.model.server')();
    var ratingModel = require('./rating/rating.model.server')();
    var commentModel = require('./comment/comment.model.server')();

    var model = {
        membershipModel: membershipModel,
        movieModel: movieModel,
        userModel: userModel,
        paymentModel: paymentModel,
        ratingModel: ratingModel,
        commentModel: commentModel
    };

    membershipModel.setModel(model);
    movieModel.setModel(model);
    userModel.setModel(model);
    paymentModel.setModel(model);
    ratingModel.setModel(model);
    commentModel.setModel(model);

    return model;
};
