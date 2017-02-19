(function() {
    var app = angular.module('studiobuzz');

    app.factory('CommentService', CommentService);

    function CommentService($http) {


        var api = {
            newCommentForMovie: newCommentForMovie,
            findAllCommentsForMovie: findAllCommentsForMovie
        };
        return api;

        function findAllCommentsForMovie(mid) {
            var url = '/api/comments/'+ mid;
            var promise = $http.get(url).then(function (res) {
                return res.data;
            },function (err) {
                return err;
            });
            return promise;
        }


        function newCommentForMovie(comment, mid, username) {
            var url = '/api/comment/new';
            var newComment = {comment: comment, movieId: mid, username:username};

            var promise = $http.post(url, newComment).then(function (res) {
                return res.data;
            }, function (err) {
                return err;
            });
            return promise;
        }






    }








})();

