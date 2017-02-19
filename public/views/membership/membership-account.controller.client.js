(function () {
  var app = angular.module('studiobuzz');

  app.controller('MembershipAccountController', ['$routeParams','MembershipUserService',
     '$location', function ($routeParams, MembershipUserService, $location) {
    var vm = this;
    vm.error = false;
    vm.submitBtn = false;
    vm.addAccountInfo = addAccountInfo;
    vm.cancelAccountInfo = cancelAccountInfo;
    var duid = $routeParams.duid;

    function addAccountInfo() {
        vm.submitBtn = true;
        var account = {
            accountName: vm.account.payeeName,
            accountNumber: vm.account.number,
            bankName: vm.account.bank,
            ifsc: vm.account.code
        };
        var addaccount = MembershipUserService.addAccountInfo(duid, account).then(function (result) {
            var status = result.status;
            if(status === 200){
                var url = '/dashboard/'+ duid +'/dashboard-home';
                $location.url(url);
            }
        }, function (err) {
            vm.error = true;
            vm.errorMsg = 'Unable to add details, please try again later. ';
        });
        vm.account = '';
    }
    function cancelAccountInfo() {
        $location.url('/');
    }


  }]);
})();
