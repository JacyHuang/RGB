  var light_list = [];
  var light_state=1;
  var light_alias="红色";
  var light_id=2;
  
//  var GB2312UnicodeConverter = {
//    ToUnicode: function (str) {
//        return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
//    }
//    , ToGB2312: function (str) {
//        return unescape(str.replace(/\\u/gi, '%u'));
//    }
//};
//
//        	            var hexCode = '6211';
//        var code = parseInt(hexCode, 16);
//        var a = String.fromCharCode(code);
//        alert(a);

  	//light_list.push({'light_id':light_id, 'light_alias':light_alias, 'light_state':light_state});
  	light_list.push({'light_id':1, 'light_alias':"红色", 'light_state':1});
  	light_list.push({'light_id':2, 'light_alias':"绿色", 'light_state':1});
  	light_list.push({'light_id':3, 'light_alias':"蓝色", 'light_state':1});

angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $ionicPopup, $ionicListDelegate, $timeout) {
	var addid;
  $scope.items = light_list;
  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
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
		  switch(item.light_id)
		  {
		  	case 1 : led_red();			break;
		  	case 2 : led_green();		break;
		  	case 3 : led_blue();		break;
		  	default : led_off();		break;
		  }
		}  
		
		
		$scope.MatchDevice = function(item) {
		}  
});
