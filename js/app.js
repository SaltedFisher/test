var gift = angular.module('gift',['ionic','app-contrl','app-service'])

gift.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
/*配置全局ios和Android设备下tabs样式 、 位置 、 title文字居中 、页面切换动画类型 */
	$ionicConfigProvider.platform.ios.tabs.style('standard');
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.ios.views.transition('ios');
	
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.views.transition('ios');
	
	
	
	$stateProvider
	//配置tabs路由
	.state('tabs',{
		url:'/tabs',
		templateUrl:'views/tabs.html',
		abstract:true
	})
	//配置礼'物说首页'的路由
	.state('tabs.main',{
		url:'/main',
		views:{
			'main-tab':{
				templateUrl:'views/main/main.html',
				controller:'mainContrl'
			}
		}
	})
	//配置首页列表详情页面
	.state('tabs.mainDetail',{
		url:'/mainDetail/:itemID',
		views:{
			'main-tab':{
				templateUrl:'views/main/mainDetail.html',
				controller:'mainDetailContrl'
			}
		}
	})
	//配置'热门'的路由
	.state('tabs.hot',{
		url:'/hot',
		views:{
			'hot-tab':{
				templateUrl:'views/hot/hot.html',
				controller:'hotContrl'
			}
		}
	})
	//配置'分类'的路由
	.state('tabs.category',{
		url:'/category',
		views:{
			'category-tab':{
				templateUrl:'views/category/category.html',
				controller:'categoryContrl'
			}
		}
	})
	//配置'分类'more的路由
	.state('tabs.categoryMore',{
		url:'/categoryMore',
		views:{
			'category-tab':{
				templateUrl:'views/category/categoryMore.html',
				controller:'categoryMoreContrl'
			}
		}
	})
	//配置'我'的路由
	.state('tabs.me',{
		url:'/me',
		views:{
			'me-tab':{
				templateUrl:'views/me/me.html'
				/*controller:*/
			}
		}
	})
	//配置公共模块的路由
	//搜索
	.state('search',{
		url:'/search',
		templateUrl:'views/common/search.html',
		controller:'searchContrl'
	});
	

	$urlRouterProvider.otherwise('/tabs/main')
}])



























