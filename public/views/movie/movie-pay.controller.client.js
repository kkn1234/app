(function () {
    var app = angular.module('studiobuzz');

    app.controller('MoviePayController', ['MovieService', '$routeParams', '$sce', 'PaymentService','$window',
        'MovieRatingService', 'Facebook', '$scope','$location',
        function (MovieService, $routeParams, $sce, PaymentService, $window, MovieRatingService, Facebook, $scope, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        var movieId = $routeParams.mid;
        var redirect_url = 'http://localhost:8000/#!/user/'+ userId+'/home/movie-pay/'+ movieId +'/pay-success';
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

            vm.getMovieRating = function() {
                var movie = MovieRatingService.findMovieRating(movieId).then(function (movie) {
                    console.log(movie);
                    vm.movieRating = movie.rating;
                });

            };


        vm.playMovie = function (movie) {
            var data  = {
                purpose: movie.title, amount: movie.price, redirect_url:redirect_url
            };
            var payment = PaymentService.makePayment(data).then(function (result) {
                console.log(result.data);
                var payment = result.data;
                if(payment.success){
                    console.log([payment.success, payment.payment_request]);
                    $window.location.href = payment.payment_request.longurl;
                }else {
                    console.log('payment.success is failed');
                }

            }, function (err) {
                console.log(err);
            });
        };


        var movie = MovieService.findMovieById(movieId).then(function (movie) {
            vm.movie = movie.data;
            console.log(vm.movie);
            var src = 'https://dpwrg5f5s7hgb.cloudfront.net/sample.mp4';

            vm.image = vm.movie.cloudThumbUrl;
            vm.config = {
                preload: "none",
                sources: [
                    {src: $sce.trustAsResourceUrl(src), type: "video/mp4"},
                    {src: $sce.trustAsResourceUrl(src), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl(src), type: "video/ogg"}
                ],
                theme: {
                    url: "../../css/videogular.css"
                },

                plugins: {
                    posterImage: vm.movie.coverUrl,
                    controls: {
                        autoHide: true,
                        autoHideTime: 5000
                    }
                }
            };

        }, function (err) {
            console.log(err);
        });

    }]);
})();

