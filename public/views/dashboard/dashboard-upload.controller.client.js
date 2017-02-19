(function () {
  var app = angular.module('studiobuzz');

  app.controller('DashboardUploadContoller', ['WizardHandler','MovieService', '$interval', '$routeParams', '$location',
      'Facebook', '$scope',
      function (WizardHandler, MovieService, $interval, $routeParams, $location, Facebook, $scope) {
    var vm = this;
    vm.publishTab = false;
    vm.userId = $routeParams.duid;
    vm.changeLabelAndGoNext = changeLabelAndGoNext;
    vm.finishedWizard = finishedWizard;
    vm.movieinfo = movieinfo;
    vm.saveMovieInfoDisable = true;
    vm.spinMsg = false;
    vm.error = false;
    //Thumbnail upload
    vm.failureThumbUploadMsg = false;
    vm.displayThumbImageProgress = false;
    vm.successThumbUploadMsg = false;
    vm.UploadThumbImgProgressVal = 0;
    vm.thumbnailimgUploadbtn = true;
    vm.thumbnailFileDisable = false;
    //Cover upload
    vm.failureCoverUploadMsg = false;
    vm.displayCoverImageProgress = false;
    vm.successCoverUploadMsg = false;
    vm.UploadCoverImgProgressVal = 0;
    vm.coverImgUploadbtn = true;
    vm.coverFileDisable = false;
    vm.imgUploadNext = false;
    //Video upload
    vm.failureVideoUploadMsg = false;
    vm.videoFileDisable = false;
    vm.displayVideoProgress = false;
    vm.successVideoUploadMsg = false;
    vm.UploadVideoProgressVal = 0;
    vm.videoUploadbtn = true;
    vm.videoUploadNext = false;
    //Advertise
     vm.adBtn = true;
     vm.adBtnNext = false;
     vm.successAdUploadMsg = false;

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
              var userId = $routeParams.duid;
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


          function movieinfo(movie) {
        vm.spinMsg = true;
        var movie = MovieService.createMovie(movie).then(function (result) {
            var movie = result.data;
            vm.movieId = movie._id;
            vm.saveMovieInfoDisable = false;
            vm.spinMsg = false;
        }, function (err) {
            vm.error = true;
        });
    }


    function finishedWizard() {
      vm.publishTab = true;
      console.log('finished');
    }

    function changeLabelAndGoNext() {
        WizardHandler.wizard().next();
    }

    vm.publishVideo = function () {
        var userId = $routeParams.duid;
        MovieService.publishVideo(userId, vm.movieId).then(function (res) {
            WizardHandler.wizard().next();
        }, function (err) {
            WizardHandler.wizard().next();
        });
    }

      //Thumbnail upload
          var thumbnailProgress = function () {
              vm.displayThumbImageProgress = true;
              vm.progress = $interval(getThumbnailProgress, 5000);
          };

    var getThumbnailProgress = function () {
        MovieService.getThumbnailUploadProgress().then(function (res) {
            vm.UploadThumbImgProgressVal = res.data.percentage;
           console.log(progress);
        }, function (err) {
            $interval.cancel(vm.progress);
        });
    };

      vm.uploadThumbnailImg = function (file) {
          if(file !== null && file !== undefined){
              thumbnailProgress();
              vm.failureThumbUploadMsg = false;
              var promise = MovieService.uploadThumbnailimage(file, vm.movieId).then(function (res) {
                  console.log(res);
                  if(res.data === 'OK'){
                      vm.successThumbUploadMsg = true;
                      vm.thumbnailimgUploadbtn = false;
                      vm.thumbnailFileDisable = true;
                      vm.displayThumbImageProgress = false;
                      $interval.cancel(vm.progress);
                  }else {
                      vm.successThumbUploadMsg = false;
                      vm.failureThumbUploadMsg = true;
                      vm.uploadImgerror = 'Upload failed! Please try again';
                      vm.thumbnailimgUploadbtn = true;
                      vm.thumbnailFileDisable = false;
                      vm.displayThumbImageProgress = false;
                      $interval.cancel(vm.progress);
                  }

              }, function (err) {
                  vm.uploadImgerror = 'Upload failed! Please try again';
                  vm.successThumbUploadMsg = false;
                  vm.failureThumbUploadMsg = true;
                  vm.displayThumbImageProgress = false;
                  vm.thumbnailimgDisable = false;
              });
          }else {
              vm.uploadImgerror = 'Please select file';
              vm.successThumbUploadMsg = false;
              vm.failureThumbUploadMsg = true;
              vm.displayThumbImageProgress = false;
              $interval.cancel(vm.progress);
          }
      };



          //Cover upload
          var coverProgress = function () {
              vm.displayCoverImageProgress = true;
              vm.coverProgress = $interval(getCoverProgress, 5000);
          };

          var getCoverProgress = function () {
              MovieService.getCoverUploadProgress().then(function (res) {
                  vm.UploadCoverImgProgressVal = res.data.percentage;

              }, function (err) {
                  $interval.cancel(vm.coverProgress);
              });
          };

          vm.uploadCoverImg = function (file) {
              if(file !== null && file !== undefined){
                  coverProgress();
                  vm.failureCoverUploadMsg = false;
                  var promise = MovieService.uploadCoverimage(file, vm.movieId).then(function (res) {
                      console.log(res);
                      if(res.data === 'OK'){
                          vm.successCoverUploadMsg = true;
                          vm.coverImgUploadbtn = false;
                          vm.coverFileDisable = true;
                          $interval.cancel(vm.coverProgress);
                          vm.imgUploadNext = true;
                          vm.displayCoverImageProgress = false;
                      }else {
                          vm.failureCoverUploadMsg = true;
                          vm.uploadCovererror = 'Upload failed! Please try again';
                          vm.successCoverUploadMsg = false;
                          vm.coverImgUploadbtn = true;
                          vm.coverFileDisable = false;
                          $interval.cancel(vm.coverProgress);
                          vm.imgUploadNext = false;
                      }

                  }, function (err) {
                      vm.successCoverUploadMsg = false;
                      vm.coverImgUploadbtn = true;
                      vm.failureCoverUploadMsg = true;
                      vm.uploadCovererror = 'Upload failed! Please try again';
                      vm.coverFileDisable = false;
                      vm.imgUploadNext = false;
                  });
              }else {
                  vm.successCoverUploadMsg = false;
                  vm.coverImgUploadbtn = true;
                  vm.coverFileDisable = false;
                  vm.failureCoverUploadMsg = true;
                  vm.uploadCovererror = 'Please select file';
                  vm.imgUploadNext = false;
                  $interval.cancel(vm.coverProgress);
              }
          };



          //Video upload
          var videoProgress = function () {
              vm.displayVideoProgress = true;
              vm.videoProgress = $interval(getVideoProgress, 5000);
          };

          var getVideoProgress = function () {
              MovieService.getVideoUploadProgress().then(function (res) {
                  vm.UploadVideoProgressVal = res.data.percentage;
                  if(vm.UploadVideoProgressVal === 100){
                      vm.successVideoUploadMsg = true;
                      vm.videoUploadbtn = false;
                      vm.videoFileDisable = true;
                      vm.displayVideoProgress = false;
                      $interval.cancel(vm.videoProgress);
                      vm.videoUploadNext = true;
                  }
                  console.log(vm.UploadVideoProgressVal);

              }, function (err) {
                  $interval.cancel(vm.videoProgress);
              });
          };

          vm.uploadVideo = function (file) {
              if(file !== null && file !== undefined){
                  videoProgress();
                  vm.failureVideoUploadMsg = false;
                  var promise = MovieService.uploadVideo(file, vm.movieId).then(function (res) {
                      console.log(res);
                      if(res.data === 'OK'){
                          vm.successVideoUploadMsg = true;
                          vm.videoUploadbtn = false;
                          vm.videoFileDisable = true;
                          vm.displayVideoProgress = false;
                          $interval.cancel(vm.videoProgress);
                          vm.videoUploadNext = true;
                      }else {
                          var progressVal = vm.UploadVideoProgressVal;
                          if(progressVal > 1){
                              if(vm.UploadVideoProgressVal >= progressVal){
                                  videoProgress();
                              }
                          }
                      }

                  }, function (err) {
                      vm.successVideoUploadMsg = false;
                      vm.videoUploadbtn = true;
                      vm.videoUploadNext = false;
                      vm.failureVideoUploadMsg = true;
                      vm.uploadVideorerror = 'Upload failed! Please try again';
                      vm.videoFileDisable = false;
                  });
              }else {
                  vm.videoFileDisable = false;
                  vm.successVideoUploadMsg = false;
                  vm.failureVideoUploadMsg = true;
                  vm.videoUploadbtn = true;
                  vm.videoUploadNext = false;
                  vm.uploadVideorerror = 'Please select file';
                  $interval.cancel(vm.videoProgress);
              }
          };

      // Advertise
          vm.videoPromotion = function (promotion) {
              var ad = MovieService.createAdvertise(promotion, vm.movieId).then(function (result) {
                  vm.adBtn = false;
                  vm.successAdUploadMsg = true;
                  vm.adBtnNext = true;
              }, function (err) {
                  vm.adBtn = false;
                  vm.successAdUploadMsg = true;
                  vm.adBtnNext = true;
              });
          };

          vm.videoCancelPromotion = function () {
              var promotion = {
                  featuredlistAd: 'No',landingpageAd: 'No',coverAd: 'No'
              };
              var ad = MovieService.createAdvertise(promotion, vm.movieId).then(function (result) {
                  vm.adBtn = false;
                  vm.successAdUploadMsg = true;
                  vm.adBtnNext = true;
              }, function (err) {
                  vm.adBtn = false;
                  vm.successAdUploadMsg = true;
                  vm.adBtnNext = true;
              });
          };


      }]);
})();
