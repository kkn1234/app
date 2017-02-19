
(function () {
    var app = angular.module('studiobuzz');

    app.factory('UserService', UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByfbId: findUserByfbId,
            findUserById: findUserById,
            updateUserRating: updateUserRating
        };
        return api;
        
        function updateUserRating(userId, userstar) {
            var url = '/api/user/' + userId;

            var promise = $http.put(url, userstar).then(function (user) {
                return user;
            }, function (err) {
                return err;
            });
            return promise;

        }

        function findUserById(userId) {
            var url = '/api/user/id/' + userId;
            var promise = $http.get(url).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function findUserByfbId(fbId) {
            var url = '/api/user/' + fbId;
            var promise = $http.get(url).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function createUser(user) {
            var url = '/api/user/create';
            var promise = $http.post(url, user)
                .then(function (res) {
                    return res;
                }, function (err) {
                    return err;
                });
            return promise;
        }


    }

})();
