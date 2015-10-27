  var light_list = [];
  var light_state=1;
  var light_alias="红色";
  var light_id=2;

  	//light_list.push({'light_id':light_id, 'light_alias':light_alias, 'light_state':light_state});
  	light_list.push({'light_id':1, 'light_alias':"红色", 'light_state':1});
  	light_list.push({'light_id':2, 'light_alias':"绿色", 'light_state':1});
  	light_list.push({'light_id':3, 'light_alias':"蓝色", 'light_state':1});

angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $ionicPopup, $ionicListDelegate, $timeout) {

  $scope.items = light_list;
  
    $scope.doRefresh = function() {   	 
    $timeout( function() {
    		var addid;
      //simulate async response
     // $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
			addid = Math.floor(Math.random() * 1000) + 4;
      $scope.items.push({'light_id':addid, 'light_alias':'New Item ' + addid, 'light_state':0});

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
          template: '<input type="text" ng-model="data.alias" maxlength="20">',
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
                  $scope.items[index].light_alias = $scope.data.alias;
                  
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
        template: '<input type="text" ng-model="data.alias" maxlength="20">',
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
                $scope.items.push({'light_id':1, 'light_alias':$scope.data.alias, 'light_state':0})
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
			item.light_state = !item.light_state;		  	
			light_ctrl(item.light_id, item.light_state);
		}  
		
		
		$scope.MatchDevice = function(item) {
			unicode_alias = GB2312UnicodeConverter.ToUnicode(item.light_alias);
			SendBufToDevice("{" + item.light_id + "," + unicode_alias + "}");
		}  
});
