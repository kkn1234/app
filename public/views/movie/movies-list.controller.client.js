(function () {
    var app = angular.module('studiobuzz');

    app.controller('MovieListController', ['MovieService', 'Facebook', '$scope', '$location',
        function (MovieService, Facebook, $scope, $location) {
        var vm = this;
        vm.navMoviesList = navMoviesList;
        vm.navMoviesLogout = navMoviesLogout;
        vm.navMoviesHome = navMoviesHome;


        Facebook.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                $scope.logged = true;
            } else if (response.status === 'not_authorized') {
                $scope.logged = false;
            } else {
                $scope.logged = false;
            }
        });

            function navMoviesHome() {
                var url = '/user/'+userId+ '/home';
                $location.url(url);
            }

        function navMoviesList() {
            var url = '/user/'+userId+ '/home/movieslist';
            $location.url(url);
        }

        function navMoviesLogout() {
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



        var movie = MovieService.findAllMovie().then(function (movie) {
            vm.movie = movie.data;
            console.log(vm.movie);
        }, function (err) {
            console.log(err);
        });

    }]);
})();
