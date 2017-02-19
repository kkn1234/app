
(function () {
    var app = angular.module('studiobuzz');

    app.factory('PaymentService', PaymentService);

    function PaymentService($http) {
        var api = {
            makePayment: makePayment,
            getPaymentDetails: getPaymentDetails,
            createPaymentDetails: createPaymentDetails,
            updatePaymentDetails: updatePaymentDetails,
            findPaymentById: findPaymentById,
            updateFlag: updateFlag
        };
        return api;

        function updateFlag(payId) {
            var url = '/api/payment/flag/'+payId;
            var data = {flag: true};
            var promise = $http.put(url, data).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function findPaymentById(payId) {
            var url = '/api/movie/payment/'+payId;
            var promise = $http.get(url).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function updatePaymentDetails(data, mid) {
            var url = '/api/movie/payment-detail/update/'+mid;
            var promise = $http.post(url, data).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function createPaymentDetails(data, mid) {
            var url = '/api/movie/payment-detail/'+mid;
            var promise = $http.post(url, data).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function getPaymentDetails(payReqID, payID) {
            var url = '/api/movie/payment/'+payReqID+'/'+payID;
            var promise = $http.get(url).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function makePayment(data) {
            var url = '/api/movie/payment';
            var promise = $http.post(url, data).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }


    }

})();
