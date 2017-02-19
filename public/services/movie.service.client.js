(function () {
    var app = angular.module('studiobuzz');

    app.factory('MovieService', MovieService);

    function MovieService($http, Upload) {
        var api = {
            createMovie: createMovie,
            uploadThumbnailimage: uploadThumbnailimage,
            getThumbnailUploadProgress:getThumbnailUploadProgress,
            uploadCoverimage: uploadCoverimage,
            getCoverUploadProgress:getCoverUploadProgress,
            uploadVideo: uploadVideo,
            getVideoUploadProgress:getVideoUploadProgress,
            createAdvertise: createAdvertise,
            publishVideo: publishVideo,
            findAllMovie: findAllMovie,
            findMovieById: findMovieById,
            incrementView: incrementView
        };
        return api;


        function incrementView(view, earning, movieId) {
            var url = '/api/movie/view/' + movieId;
            var data = {view: view, earning: earning};
            var promise = $http.post(url, data).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function findMovieById(movieId) {
            var url = '/api/movie/' + movieId;
            var promise = $http.get(url).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }
        
        function findAllMovie() {
            var promise = $http.get('/api/movie').then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function  publishVideo(userId, movieId) {
            var url = '/api/movie/publish/'+ userId + '/' + movieId;
            var promise = $http.get(url).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function createAdvertise(promotion, movieId) {
            var url = '/api/movie/advertise/'+ movieId;
            var promise = $http.post(url, promotion).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function getVideoUploadProgress() {
            var url = '/api/movie/upload/video/progress';
            var promise = $http.get(url).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
            return promise;
        }


        function uploadVideo(file, movieId) {
            var promise = Upload.upload({
                url: '/api/movie/upload/video',
                data: {file: file, movieId: movieId}
            }).then(function (resp) {
                return resp;
            }, function (err) {
                return err;
            });
            return promise;
        }




        function getCoverUploadProgress() {
            var url = '/api/movie/upload/cover/progress';
            var promise = $http.get(url).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
            return promise;
        }


        function uploadCoverimage(file, movieId) {
            var promise = Upload.upload({
                url: '/api/movie/upload/cover',
                data: {file: file, movieId: movieId}
            }).then(function (resp) {
                return resp;
            }, function (err) {
                return err;
            });
            return promise;
        }



        function getThumbnailUploadProgress() {
            var url = '/api/movie/upload/thumbnail/progress';
            var promise = $http.get(url).then(function (res) {
                return res;
            }, function (err) {
                return err;
            });
            return promise;
        }


        function uploadThumbnailimage(file, movieId) {
            var promise = Upload.upload({
                url: '/api/movie/upload/thumbnail',
                data: {file: file, movieId: movieId}
            }).then(function (resp) {
                return resp;
            }, function (err) {
                return err;
            });
            return promise;
        }

        function createMovie(movie) {
            var url = '/api/movie/create';
            var promise = $http.post(url, movie).then(function (result) {
                return result;
            }, function (err) {
                return err;
            });
            return promise;
        }



    }

})();
