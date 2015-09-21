angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $ionicPopup, $ionicListDelegate, $timeout) {
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
      
      $scope.showPopup_Delete = function(item) {
        var index = $scope.items.indexOf(item);
        $scope.data = {}

          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            title: '',
            subTitle: '是否删除？',
            scope: $scope,
            buttons: [
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function(e) {
              	$scope.items.splice(index, 1);
              }
            },
            { 
            	text: '取消' ,
            	type: 'button-positive',
            	onTap: function(e) {
            		$ionicListDelegate.closeOptionButtons();  
            	}
            }
            ]
          });  
			}
			
		  $scope.showPopup_Edit = function(item) {
      var index = $scope.items.indexOf(item);
      $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="text" ng-model="data.alias">',
          title: '',
          subTitle: '修改名称',
          scope: $scope,
          buttons: [
          {
            text: '<b>保存</b>',
            type: 'button-positive',
            onTap: function(e) {
            if (!$scope.data.alias) {
            e.preventDefault();
            } else {
									alias     : $scope.data.alias
                  $scope.items[index] = $scope.data.alias;
                  $ionicListDelegate.closeOptionButtons();  
              }
            }
          },
          { 
          	text: '取消' ,
          	type: 'button-positive',
          	onTap: function(e) {
          		$ionicListDelegate.closeOptionButtons();  
          	}
          }
          ]
        });  
		}
  
});