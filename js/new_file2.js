﻿angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $ionicPopup, $ionicListDelegate, $timeout) {
  $scope.items = ['红色', '绿色', '蓝色'];
  
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
		
		$scope.showPopup_Add = function() {
    $scope.data = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.alias">',
        title: '',
        subTitle: '名称',
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

   // 从url中获取某个参数的值
    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
    // 得到设备ID
    var device_id = getParameterByName('device_id');
    // 如果设备ID不为空，则执行连接MQTT的操作
    if ( device_id !== null ){
        ez_connect(device_id);
    }
  // function dump_obj(myObject) {
    //     var s = '';
    //     for (var property in myObject) {
    //         s += '<span>' + property +": " + myObject[property] + '</span>';
    //     }
    //     return s;
    // }

    // 连接MQTT服务
    function ez_connect(device_id) {
        // 获取access_token
        // access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。
        // 正常情况下access_token有效期为7200秒，重复获取将导致上次获取的access_token失效
        var access_token = getParameterByName('access_token');

        document.getElementById('device_id').innerHTML = device_id;

        // websocket连接
        // wsbroker:host
        // wsport:端口 默认1983
        // Client-ID ： v1_web_[MAC]  //版本号_app_手机MAC(必须是12位小写)
        var wsbroker = "api.easylink.io";  //mqtt websocket enabled broker
        var wsport = 1983 // port for above
        var client = new Paho.MQTT.Client(wsbroker, wsport, "v1-web-" + parseInt(Math.random() * 1000000, 12));

        // 基本参数配置
        // 连接丢失所对应的callback函数
        client.onConnectionLost = onConnectionLost;
        // 消息到达所对应的callback函数
        client.onMessageArrived = onMessageArrived;
        // 连接成功所对应的callback函数
        client.connect({onSuccess:onConnect});

        // 连接成功
        function onConnect() {
            var subtopic = device_id+'/out/#';
            // Once a connection has been made, make a subscription and send a message.
            // 向某个通道发送指令
            // topic：通道
            // commond：指令
            client.publish = function(topic, commond) {
                message = new Paho.MQTT.Message(commond);
                message.destinationName = topic;
                client.send(message);
            }
            client.subscribe(subtopic, {qos: 0});
        }
        // 连接丢失
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0){
            }
        }
        // 消息到达
        function onMessageArrived(message) {
        }

        function led_red() {
            var topic = device_id+'/in/write';
            var commond = '{"rgbled_switch":true,"rgbled_hues":0, "rgbled_saturation":100, "rgbled_brightness":100}'; 
            client.publish(topic, commond);
        }
        // document.querySelector('#led_red').addEventListener('touchstart', led_red);
        document.querySelector('#led_red').addEventListener('click', led_red);

        function led_green() {
            var topic = device_id+'/in/write';
            var commond = '{"rgbled_switch":true,"rgbled_hues":120, "rgbled_saturation":100, "rgbled_brightness":100}'; 
            client.publish(topic, commond);
        }
        // document.querySelector('#led_green').addEventListener('touchstart', led_green);
        document.querySelector('#led_green').addEventListener('click', led_green);

        function led_blue() {
            var topic = device_id+'/in/write';
            var commond = '{"rgbled_switch":true,"rgbled_hues":240, "rgbled_saturation":100, "rgbled_brightness":100}'; 
            client.publish(topic, commond);
        }
        // document.querySelector('#led_blue').addEventListener('touchstart', led_blue);
        document.querySelector('#led_blue').addEventListener('click', led_blue);
    }
