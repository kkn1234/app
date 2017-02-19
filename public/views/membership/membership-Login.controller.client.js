(function () {
  var app = angular.module('studiobuzz');

  app.controller('MembershipLoginController', ['Facebook','$scope','$location',
   'MembershipUserService',function (Facebook, $scope, $location, MembershipUserService) {
    var vm = this;
    vm.error = false;
    var createMembershipUser = createMembershipUser;
    var findMembershipUser = findMembershipUser;
    var userIsConnected = false;
    $scope.logged = false;
    $scope.user = {};

    function findMembershipUser(user) {
        var newUser = {
            username: user.name,
            fbId: user.id
        };
        var fbId = user.id;
        var findUser = MembershipUserService.findUserByfbId(fbId).then(function (result) {
            console.log(result);
            var user = result.data;
            if(user === '0'){
                createMembershipUser(newUser);
            }else if(user !== '') {
                var url = '/dashboard/'+ user._id +'/dashboard-home';
                $location.url(url);
            }
        }, function (err) {
            vm.error = true;
            vm.errorMsg = 'Unable to process, please try again later.';
        });
    }

    function createMembershipUser(user) {

       var create = MembershipUserService.createMembershipUser(user).then(function (newUser) {
           var user = newUser.data;
           var url = '/dashboard/'+ user._id +'/membership-terms';
           if(newUser.status === 200){
               $location.url(url);
           }
       }, function (err) {
           vm.error = true;
           vm.errorMsg = 'Unable to create user, please try again later.';
       });
    }




    Facebook.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        userIsConnected = true;
        $scope.logged = true;
      }else if (response.status === 'not_authorized') {
        userIsConnected = false;
        $scope.logged = false;
      }else{
        userIsConnected = false;
        $scope.logged = false;
      }
    });

    // User Login
    vm.loginClick = function() {
       fbWatchNowLogin();
    };

//FB Login
    var fbWatchNowLogin = function () {
        if(!$scope.logged){
            Facebook.login(function (response) {
                if(response.status === 'connected'){
                    fbApi();
                }
            });
        }else {
            fbApi();
        }

      };



// User info
var fbApi = function () {
  Facebook.api('/me','get',{fields: 'id, name, first_name, last_name'}, function(response) {
    $scope.$apply(function() {
             $scope.user = response;
             console.log([$scope.user, 'userdata']);
             findMembershipUser(response);
           });
  });
}

  }]);
})();
