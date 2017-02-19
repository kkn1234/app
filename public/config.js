(function () {
  var app = angular.module('studiobuzz');

  app.config(['$routeProvider', '$qProvider','$locationProvider', 'FacebookProvider', function ($routeProvider,
    $qProvider, $locationProvider, FacebookProvider) {


    var fbAppId = '1841356159409982';
    FacebookProvider.setAppId('fbAppId');
    FacebookProvider.init(fbAppId);
    $qProvider.errorOnUnhandledRejections(false);


    $routeProvider
            .when('/', {
              templateUrl: 'views/user/default.view.client.html',
              controller: 'DefaultPageController',
              controllerAs: 'model'
            }).when('/privacy-policy', {
              templateUrl: 'views/user/privacy.view.client.html',
              controller: 'DefaultPageController',
              controllerAs: 'model'
            }).when('/terms-service', {
              templateUrl: 'views/user/terms-service.view.client.html',
              controller: 'DefaultPageController',
              controllerAs: 'model'
            }).when('/user/:uid/home', {
              templateUrl: 'views/home/movie-home.view.client.html',
              controller: 'MovieHomeController',
              controllerAs: 'model'
            }).when('/user/:uid/home/movieslist', {
              templateUrl: 'views/movie/movies-list.view.client.html',
              controller: 'MovieListController',
              controllerAs: 'model'
            }).when('/user/:uid/home/movie-pay/:mid', {
                templateUrl: 'views/movie/movie-pay.view.client.html',
                controller: 'MoviePayController',
                controllerAs: 'model'
            }).when('/user/:uid/home/movie-pay/:mid/pay-success', {
               templateUrl: 'views/movie/movie-pay-success.view.client.html',
               controller: 'MoviePaySuccessController',
               controllerAs: 'model'
            }).when('/user/:uid/home/movie-pay/:mid/play/:pid', {
               templateUrl: 'views/movie/movie-play.view.client.html',
               controller: 'MoviePlayController',
               controllerAs: 'model'
            }).when('/login', {
              templateUrl: 'views/membership/membership-Login.view.client.html',
              controller: 'MembershipLoginController',
              controllerAs: 'model'
            }).when('/dashboard/:duid/membership-terms', {
              templateUrl: 'views/membership/membership-terms.view.client.html',
              controller: 'MembershipTermsController',
              controllerAs: 'model'
            }).when('/dashboard/:duid/membership-account', {
              templateUrl: 'views/membership/membership-account.view.client.html',
              controller: 'MembershipAccountController',
              controllerAs: 'model'
            }).when('/dashboard/:duid/dashboard-home', {
              templateUrl: 'views/dashboard/dashboard-home.view.client.html',
              controller: 'DashboardHomeContoller',
              controllerAs: 'model'
            }).when('/dashboard/:duid/dashboard-home/upload', {
              templateUrl: 'views/dashboard/dashboard-upload.view.client.html',
              controller: 'DashboardUploadContoller',
              controllerAs: 'model'
            }).when('/dashboard/:duid/dashboard-home/report', {
              templateUrl: 'views/dashboard/dashboard-report.view.client.html',
              controller: 'DashboardReportContoller',
              controllerAs: 'model'
            }).when('/dashboard/:duid/dashboard-home/payment', {
              templateUrl: 'views/dashboard/dashboard-payment.view.client.html',
              controller: 'DashboardPaymentContoller',
              controllerAs: 'model'
            });




  }]);
})();
