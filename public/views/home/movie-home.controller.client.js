(function () {
    var app = angular.module('studiobuzz');

    app.controller('MovieHomeController', ['MovieService', '$routeParams',
        '$location', function (MovieService, $routeParams, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.active = 0;
        //movie nav tab
        vm.viewtab = false;
        vm.featuretab = true;
        vm.ratingtab = false;
        vm.recenttab = false;
        //function
        vm.movieNavTabs = movieNavTabs;
        vm.navMoviesList = navMoviesList;
        vm.watchMovieById = watchMovieById;
        vm.navMoviesHome = navMoviesHome;

        var movie = MovieService.findAllMovie().then(function (movie) {
            vm.movie = movie.data;
            console.log(vm.movie);
        }, function (err) {
            console.log(err);
        });

        function watchMovieById(mid) {
            $location.url('/user/' + userId + '/home/movie-pay/' + mid);
        }

        function navMoviesHome() {
            $location.url('/user/' + userId + '/home');
        }

            function navMoviesList() {
            $location.url('/user/'+ userId +'/home/movieslist');
        }

        vm.viewNavTab = function (prop, val) {
            return function (item) {
                if(item[prop] >= val) return true;
            }
        }

        function movieNavTabs(movietab) {
            switch (movietab) {
                case 'most':
                    vm.viewtab = true;
                    vm.featuretab = false;
                    vm.ratingtab = false;
                    vm.recenttab = false;
                    break;

                case 'top':
                    vm.viewtab = false;
                    vm.featuretab = false;
                    vm.ratingtab = true;
                    vm.recenttab = false;
                    break;

                case 'recent':
                    vm.viewtab = false;
                    vm.featuretab = false;
                    vm.ratingtab = false;
                    vm.recenttab = true;
                    break;

                default:
                    vm.viewtab = false;
                    vm.featuretab = true;
                    vm.ratingtab = false;
                    vm.recenttab = false;
                    break;

            }
        }



    }]);
})();
