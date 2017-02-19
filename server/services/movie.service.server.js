var multiparty = require('connect-multiparty');
var multipartymiddleware = multiparty();
var fs = require('fs');
var knox = require('knox');
var client = knox.createClient({
    key: 'AKIAJQAXTPF3O5KKO3AA',
    secret: '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',
    bucket: 'studiobuzz.web'
});
var cloudVideo = 'dpwrg5f5s7hgb.cloudfront.net';
var cloudthumbImg = 'd2wi0uupekmksr.cloudfront.net';
var cloudcoverImg = 'd1fzrd6yi8xoje.cloudfront.net';
var thumbnailUploadpercentage = 1;
var coverUploadpercentage = 1;
var videoUploadpercentage = 1;

module.exports = function (app, model) {

    app.use(multipartymiddleware);

    app.post('/api/movie/create', createMovie);
    app.post('/api/movie/upload/thumbnail',multipartymiddleware, uploadThumbnailimage);
    app.get('/api/movie/upload/thumbnail/progress', getThumbnailUploadProgress);
    app.post('/api/movie/upload/cover',multipartymiddleware, uploadCoverimage);
    app.get('/api/movie/upload/cover/progress', getCoverUploadProgress);
    app.post('/api/movie/upload/video',multipartymiddleware, uploadVideo);
    app.get('/api/movie/upload/video/progress', getVideoUploadProgress);
    app.post('/api/movie/advertise/:mid', createAdvertise);
    app.get('/api/movie/publish/:uid/:mid', publishVideo);
    app.get('/api/movie', findAllMovie);
    app.get('/api/movie/:mid', findMovieById);
    app.post('/api/movie/view/:mid', incrementView);

    function incrementView(req, res) {
        var movieId = req.params.mid;
        var data = req.body;
        model.movieModel.incrementView(data,movieId).then(function (movie) {
            res.send(movie);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
    }

    function findMovieById(req, res) {
        var movieId = req.params.mid;
        model.movieModel.findMovieById(movieId).then(function (movie) {
            res.send(movie);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
    }

    function findAllMovie(req, res) {
        model.movieModel.findAllMovie().then(function (movies) {
            res.send(movies);
        }, function (err) {
            res.sendStatus(400);
        });
    }

    function publishVideo(req, res) {
        var movieId = req.params.mid;
        var userId = req.params.uid;
        model.movieModel.publishVideo(userId, movieId).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400);
        }).then(function (result) {
            res.send(result);
        });
    }

    function createAdvertise(req, res) {
        var movieId = req.params.mid;
        var promotion = req.body;
        model.movieModel.createAdvertise(promotion, movieId).then(function (result) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(400);
        });
    }


    function createMovie(req, res) {
        var movie = req.body;
        model.movieModel.createMovie(movie).then(function (result) {
            res.send(result);
        }, function (err) {
            res.sendStatus(400);
        }).then(function (result) {
            res.send(result);
        });
    }

    function uploadVideo(req, res) {
        var file = req.files.file.path;
        var movieId = req.body.movieId;
        var type = req.files.file.type;
        var typeResult = type.split('/');
        var extnType = typeResult[typeResult.length - 1];
        var path = 'videos/' + movieId + '.'+ extnType;
        client.putFile(file, path, { 'x-amz-acl': 'public-read' }, function(err, response) {
            if(err){
                res.sendStatus(400);
            }

            if(file !== ''){
                fs.unlink(file, function (err) {
                    if(err){
                        console.log(err);
                    }
                });
            }

            var videoUrl = response.req.url;
            var cloudMovieUrl = 'https://'+cloudVideo +'/'+movieId + '.'+ extnType;
            model.movieModel.updateVideoUrlMovie(videoUrl, cloudMovieUrl, movieId).then(function (result) {
                if(result){
                    res.sendStatus(200);
                }else{
                    res.send('0');
                }

            }, function (err) {
                res.sendStatus(400).send(err);
            });

        }).on('progress', function (evt) {
            videoUploadpercentage = evt.percent;
            console.log(videoUploadpercentage);
        });
    }

    function getVideoUploadProgress(req, res) {
        var progressBar = {
            percentage: videoUploadpercentage
        };
        res.send(progressBar);
    }




    function uploadCoverimage(req, res) {
        var file = req.files.file.path;
        var movieId = req.body.movieId;
        var type = req.files.file.type;
        var typeResult = type.split('/');
        var extnType = typeResult[typeResult.length - 1];
        var path = 'coverImg/' + movieId + '.'+ extnType;
        client.putFile(file, path, { 'x-amz-acl': 'public-read' }, function(err, response) {
            if(err){
                res.sendStatus(400);
            }

            if(file){
                fs.unlink(file, function (err) {
                    if(err){
                        console.log(err);
                    }
                });
            }

            var coverUrl = response.req.url;
            var cloudCoverUrl = 'https://'+cloudcoverImg +'/'+movieId + '.'+ extnType;
            model.movieModel.updateCoverUrlMovie(coverUrl, cloudCoverUrl, movieId).then(function (result) {
                if(result){
                    res.sendStatus(200);
                }else{
                    res.send('0');
                }

            }, function (err) {
                res.sendStatus(400).send(err);
            });

        }).on('progress', function (evt) {
            coverUploadpercentage = evt.percent;
            console.log(coverUploadpercentage);
        });
    }

    function getCoverUploadProgress(req, res) {
        var progressBar = {
            percentage: coverUploadpercentage
        };
        res.send(progressBar);
    }



    function uploadThumbnailimage(req, res) {
        var file = req.files.file.path;
        var movieId = req.body.movieId;
        var type = req.files.file.type;
        var typeResult = type.split('/');
        var extnType = typeResult[typeResult.length - 1];
        var path = 'thumbImg/' + movieId + '.'+ extnType;
        client.putFile(file, path, { 'x-amz-acl': 'public-read' }, function(err, response) {
            if(err){
                res.sendStatus(400);
            }

            if(file !== ''){
                fs.unlink(file, function (err) {
                    if(err){
                        console.log(err);
                    }
                });
            }

            var thumbnailUrl = response.req.url;
            var cloudThumbUrl = 'https://'+cloudthumbImg +'/'+movieId + '.'+ extnType;
            model.movieModel.updatethumbnailUrlMovie(thumbnailUrl, cloudThumbUrl, movieId).then(function (result) {
                if(result){
                    res.sendStatus(200);
                }else{
                    res.send('0');
                }

            }, function (err) {
                res.sendStatus(400).send(err);
            });

        }).on('progress', function (evt) {
            thumbnailUploadpercentage = evt.percent;
            console.log(thumbnailUploadpercentage);
        });
    }

    function getThumbnailUploadProgress(req, res) {
        var progressBar = {
            percentage: thumbnailUploadpercentage
        };
        res.send(progressBar);
    }


};
