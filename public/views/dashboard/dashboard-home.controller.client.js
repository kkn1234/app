(function () {
  var app = angular.module('studiobuzz');

  app.controller('DashboardHomeContoller', ['$routeParams', 'MembershipUserService', 'MovieService',
      'MovieRatingService','CommentService', 'Facebook', '$scope', '$location',
      function ($routeParams, MembershipUserService, MovieService, MovieRatingService, CommentService, Facebook, $scope, $location) {
    var vm = this;
    var userId = $routeParams.duid;
    vm.id = userId;

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



    var user = MembershipUserService.findUserById(userId).then(function (result) {
        console.log(result);
        var movie = result.data.movie;
        var movieId = movie[0];
        console.log(movieId);

        var promise = CommentService.findAllCommentsForMovie(movieId).then(function (movie) {
            console.log(movie.comment);
            vm.commentArray = movie.comment;
        });

        var data = MovieService.findMovieById(movieId).then(function (res) {
            vm.movieObj = res.data;
        }, function (err) {
            console.log(err);
        });
        var ratingData = MovieRatingService.findMovieRating(movieId).then(function (resObj) {
            vm.ratingObj = resObj;
        }, function (err) {
            console.log(err);
        });
    }, function (err) {
        console.log(err);
    });




  }]);
})();
