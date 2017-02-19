(function () {
  var app = angular.module('studiobuzz');

  app.controller('DashboardPaymentContoller', ['$routeParams', '$location', 'Facebook', '$scope',
      function ($routeParams, $location, Facebook, $scope) {
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


  }]);
})();
