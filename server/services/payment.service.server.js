var Insta = require('instamojo-nodejs');
var API_KEY = 'd43669c1ebf5deb236ee2d00f8fb3775';
var AUTH_KEY = 'a0e02c8810fb1baf72152f8408ae82ee';
Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(true);

module.exports = function (app, model) {

    app.post('/api/movie/payment', makePayment);
    app.get('/api/movie/payment/:payReqID/:payID', getPaymentDetails);
    app.post('/api/movie/payment-detail/:mid', createPaymentDetails);
    app.post('/api/movie/payment-detail/update/:mid', updatePaymentDetails);
    app.get('/api/movie/payment/:pid', findPaymentById);
    app.put('/api/payment/flag/:pid', updateFlag);


    function updateFlag(req, res) {
        var payId = req.params.pid;

        model.paymentModel.updateFlag(payId).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400);
        });
    }

    function findPaymentById(req, res) {
        var payId = req.params.pid;
        model.paymentModel.findPaymentById(payId).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400);
        });
    }
    function updatePaymentDetails(req, res) {
        var movieId = req.params.mid;
        var data = req.body;
        console.log(data);
        model.paymentModel.updatePaymentDetails(data, movieId).then(function (result) {
        }, function (err) {
            res.sendStatus(400);
        }).then(function (pay) {
            res.send(pay);
        }, function (err) {
            res.sendStatus(400);
        });
    }
    function createPaymentDetails(req, res) {
        var movieId = req.params.mid;
        var data = req.body;
        console.log(data);
        model.paymentModel.createPaymentDetails(data, movieId).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400);
        });
    }

    function getPaymentDetails(req, res) {
        var payment_request_id = req.params.payReqID;
        var payment_id = req.params.payID;
        var obj = {
            payment_request_id:payment_request_id, payment_id: payment_id
        };

        Insta.getPaymentDetails(payment_request_id, payment_id, function(error, response) {
            if (error) {
                res.sendStatus(400);
            } else {
                res.send(response);
            }
        });

        // res.sendStatus(200);
    }

    function makePayment(req, res) {
        var payment = req.body;
        var data = new Insta.PaymentData();
        data.purpose = payment.purpose;
        data.amount = payment.amount;
        data.currency = 'INR';
        data.allow_repeated_payments = false;
        data.redirect_url = payment.redirect_url;
        Insta.createPayment(data, function (err, response) {
            if(err){
                res.sendStatus(400);
            }else {
                res.send(response);
            }
        });
    }
};

