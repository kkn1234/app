(function () {
  var app = angular.module('studiobuzz');

  app.controller('DefaultPageController', ['$window', '$scope', 'Facebook',
  '$location', 'MovieService', 'UserService',
      function ($window, $scope,
  Facebook, $location, MovieService, UserService) {
    var vm = this;
    $scope.logged = false;


          var thumbnailImage = MovieService.findAllMovie().then(function (movie) {
              vm.movie = movie.data;
              console.log(vm.movie);
          }, function (err) {
              console.log(err + 'error');
          });



          Facebook.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                  $scope.logged = true;
              } else if (response.status === 'not_authorized') {
                  $scope.logged = false;
              } else {
                  $scope.logged = false;
              }
          });

          function findUser(user) {
              var newUser = {
                  username: user.name,
                  fbId: user.id
              };
              var fbId = user.id;
              var findUser = UserService.findUserByfbId(fbId).then(function (result) {
                  console.log(result);
                  var user = result.data;
                  if(user === '0'){
                      createUser(newUser);
                  }else if(user !== '') {
                      var url = '/user/'+ user._id +'/home';
                      $location.url(url);
                  }
              }, function (err) {
                  vm.error = true;
                  vm.errorMsg = 'Unable to process, please try again later.';
              });
          }

          function createUser(user) {

              var create = UserService.createUser(user).then(function (newUser) {
                  var user = newUser.data;
                  var url = '/user/'+ user._id +'/home';
                  if(newUser.status === 200){
                      $location.url(url);
                  }
              }, function (err) {
                  vm.error = true;
                  vm.errorMsg = 'Unable to create user, please try again later.';
              });
          }

// User Login
vm.loginWatchNow = function() {
fbWatchNowLogin();
};

//FB Login
var fbWatchNowLogin = function () {
    if (!$scope.logged) {
        Facebook.login(function (response) {
            if (response.status === 'connected') {
                fbApi();
            }
        });
    } else {
        fbApi();
    }
};

// User info
          var fbApi = function () {
              Facebook.api('/me','get',{fields: 'id, name, first_name, last_name'}, function(response) {
                  $scope.$apply(function() {
                      $scope.user = response;
                      console.log([$scope.user, 'userdata']);
                      findUser(response);
                  });
              });
          };


    // Memebership
    // Logout
    vm.membershipLogin = function () {
        if ($scope.logged) {
            Facebook.logout(function () {
                $scope.$apply(function () {
                    $scope.user = {};
                    $scope.logged = false;
                    $location.url('/login');
                });
            });
        } else {
            $location.url('/login');
        }
    };

  }]);
})();
