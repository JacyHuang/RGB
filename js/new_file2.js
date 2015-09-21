angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $timeout) {
  $scope.items = ['Item 1', 'Item 2', 'Item 3'];
  
  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
  
      $scope.data = {
        showDelete: false
      };
      $scope.listCanSwipe = true;
      
      $scope.showPopup = function(item) {
        var index = $scope.items.indexOf(item);
        $scope.data = {}

          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.alias">',
            title: '',
            subTitle: 'ÐÞ¸ÄÃû³Æ',
            scope: $scope,
            buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              }
              ]
            });
  
			}
  
});