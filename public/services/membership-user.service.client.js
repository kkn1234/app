(function () {
    var app = angular.module('studiobuzz');

    app.factory('MembershipUserService', MembershipUserService);
    
    function MembershipUserService($http) {
     var api = {
         createMembershipUser: createMembershipUser,
         findUserByfbId: findUserByfbId,
         addAccountInfo: addAccountInfo,
         findUserById: findUserById
     };
     return api;

        function findUserById(userId) {
            var url = '/api/membership/user/' + userId;
            var promise = $http.get(url).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

     function addAccountInfo(userId,account) {
         var url = '/api/membership/account/'+userId;
         var promise = $http.post(url, account).then(function (result) {
             return result;
         }, function (err) {
             return err;
         });
         return promise;
     }

     function findUserByfbId(fbId) {
         var url = '/api/membership/' + fbId;
         var promise = $http.get(url).then(function (result) {
             return result;
         }, function (err) {
             return err;
         });
         return promise;
     }
     
     function createMembershipUser(user) {
         var url = '/api/membership/user';
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
