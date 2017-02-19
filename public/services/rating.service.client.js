(function () {
    var app = angular.module('studiobuzz');

    app.factory('MovieRatingService', MovieRatingService);
    
    function MovieRatingService($http) {
        var api = {
            updateMovieRating: updateMovieRating,
            findMovieRating: findMovieRating,
            createMovieRating: createMovieRating
        };
        return api;
        
        function createMovieRating(mid) {
            var userRate = {
                mid: mid,
            };
            var url = '/api/rating/create';
            var promise = $http.post(url, userRate).then(function (res) {
                return res.data;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function findMovieRating(mid) {
            var url = '/api/rating/'+mid;
            var promise = $http.get(url).then(function (res) {
                return res.data;
            }, function (err) {
                return err;
            });
            return promise;
        }
        
        function updateMovieRating(userstar, movieId) {
            var rating = {
                star:userstar,
                movieId:movieId
            };
            var url = '/api/rating/update/' + movieId;
            var promise = $http.put(url, rating).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
            return promise;
        }

    }

})();
