
appContrl.controller('hotContrl',['$scope','hotService','$timeout','$ionicPopup','$location',function($scope,hotService,$timeout,$ionicPopup,$location){
	
	$scope.hotListData=[];
	$scope.page=1;
	hotService.getHotListData(
		function(data){
			console.log(data)
			$scope.hotListData = data
		},
		$scope.page,
		function(error){
			alertError(error);
		}
	)
//点击跳转搜索页面
	$scope.searchAction=function(){
		$location.path('/search')
	}
	

	
	
//下拉刷新
	$scope.refreshAction=function(){
		$timeout(function(){
			$scope.hotListData=[];
			$scope.page=1;
			hotService.getHotListData(
				function(data){
					console.log(data)
					$scope.hotListData = data
				},
				$scope.page,
				function(error){
					alertError(error);
				}
			)
			$scope.$broadcast('scroll.refreshComplete')
		},1000)	
	}
	
//上拉加载
	$scope.loadMore=function(){
		
		$timeout(function(){
			$scope.page++;
			hotService.getHotListData(
				function(data){
					console.log(data)
					$scope.hotListData =$scope.hotListData.concat(data)
				},
				$scope.page,
				function(error){
					alertError(error);
				}
			)
			$scope.$broadcast('scroll.infiniteScrollComplete')
		},1000)		
		
	}
	
	function alertError(error){
	   var alertPopup = $ionicPopup.alert({
	     title: '啊哦~~~嘛也没有',
	     template: '你请求的是个什么鬼?'
	   });
	
	   alertPopup.then(function(res) {
	     console.log(error);
	   });
	}
	
	
	
}])












