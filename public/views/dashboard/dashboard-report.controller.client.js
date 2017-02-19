(function () {
  var app = angular.module('studiobuzz');

  app.controller('DashboardReportContoller', [ '$routeParams','MembershipUserService', 'MovieService', '$location',
      'Facebook', '$scope',
      function ($routeParams, MembershipUserService, MovieService, $location, Facebook, $scope) {
    var vm = this;
    vm.userId = $routeParams.duid;
          vm.navLogout = navLogout;
          vm.navHome = navHome;


          Facebook.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                  $scope.logged = true;
              } else if (response.status === 'not_authorized') {
                  $scope.logged = false;
              } else {
                  $scope.logged = false;
              }
          });

          function navHome() {
              var userId = $routeParams.duid;
              var url = '/dashboard/'+userId+ '/dashboard-home';
              $location.url(url);
          }

          function navLogout() {
              if ($scope.logged) {
                  Facebook.logout(function () {
                      $scope.$apply(function () {
                          $scope.user = {};
                          $scope.logged = false;
                          $location.url('/');
                      });
                  });
              } else {
                  $location.url('/');
              }
          }


          var user = MembershipUserService.findUserById(vm.userId).then(function (result) {
          console.log(result);
          var movie = result.data.movie;
          var movieId = movie[0];
          console.log(movieId);

          var data = MovieService.findMovieById(movieId).then(function (res) {
              vm.movieObj = res.data;
              vm.movies = [vm.movieObj];
          }, function (err) {
              console.log(err);
          });
      }, function (err) {
          console.log(err);
      });



  }]);
})();
