module.exports = function (app) {
    var model = require('./models/model.server.js')();

    require('./services/membership-user.service.server.js')(app, model);
    require('./services/movie.service.server')(app, model);
    require('./services/user.service.server')(app, model);
    require('./services/payment.service.server')(app, model);
    require('./services/rating.service.server')(app, model);
    require('./services/comment.service.server')(app, model);
};
