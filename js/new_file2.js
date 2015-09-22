  var light_list = [];
  var light_state=1;
  var light_alias="红色";
  var light_id=2;

  	light_list.push({'light_alias':light_alias, 'light_id':light_id, 'light_state':light_state});

angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $ionicPopup, $ionicListDelegate, $timeout) {
  $scope.items = light_list;
  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };
	$scope.moveItem = function(item, fromIndex, toIndex) {
		$scope.items.splice(fromIndex, 1);
		$scope.items.splice(toIndex, 0, item);
	};
  
      $scope.data = {
        showDelete: false
      };
      $scope.listCanSwipe = true;
      
      $scope.showPopup_Delete = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
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
		
		$scope.showPopup_Add = function() {
    $scope.data = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.alias">',
        title: '',
        subTitle: '添加云灯',
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
                $scope.items.push($scope.data.alias);
					      $scope.$broadcast('scroll.refreshComplete');
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


		$scope.CtrlDevice = function(item) {
			var index = $scope.items.indexOf(item);
			//alert("123");
			switch(index)
			{
				case 0:
					alert("0");
				break;
				case 1:
					alert("1");
				break;
				case 2:
					alert("2");
				break;
				default:
					alert("error");
				break;
			}
		}  
});
