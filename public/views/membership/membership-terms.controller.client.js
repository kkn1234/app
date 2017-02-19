(function () {
  var app = angular.module('studiobuzz');

  app.controller('MembershipTermsController', ['$location','$routeParams',
      function ($location, $routeParams) {
    var vm = this;

    vm.membershipProceed = membershipProceed;
    vm.membershipCancel = membershipCancel;

    function membershipCancel() {
        $location.url('/');
    }

    function membershipProceed() {
        var id = $routeParams.duid;
        var url = '/dashboard/'+ id +'/membership-account';
      $location.url(url);
    }



  }]);
})();
