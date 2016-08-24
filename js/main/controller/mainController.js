appContrl.controller('mainContrl',['$scope','mainService','$ionicPopup','$ionicScrollDelegate','$location',function($scope,mainService,$ionicPopup,$ionicScrollDelegate,$location){
	$scope.name="礼物说";
//banner数据源
	$scope.bannerData=[];
	//初始化
	requestBannerData()
	function requestBannerData(){
		function getBannerDataSuccess(data){
			$scope.bannerData = data;
		}
		function getBannerDataError(error,statusCode){
			alertError(error,statusCode);
		}
//控制器执行服务的getMainBnnerData方法时传递两个回调函数
		mainService.getMainBnnerData(getBannerDataSuccess,getBannerDataError);
	}



//secondaryBanner数据源
	$scope.secondaryBannerData=[];
	//初始化
	requesMainSecondaryBannerData();
	//将上边的可以简写成一下格式
	function requesMainSecondaryBannerData(){
		mainService.getMainSecondaryBannerData(
			function(data){
				$scope.secondaryBannerData = data;
			},function(error,statusCode){
				alertError(error,statusCode);
			}
		);
	}
	


//mainList数据源
	$scope.mainListData=[];
	$scope.page = 1;
	//初始化
	requesListData(107,false,false)
	function requesListData(listID,isRefresh,isLoad){
		console.log(listID)
		mainService.getMainListData(
			listID,
			$scope.page,
			function(data){				
				if(isRefresh){
					$scope.mainListData = data;
			//关闭刷新动画
					$scope.$broadcast('scroll.refreshComplete')
				}else if(isLoad){
					$scope.mainListData =$scope.mainListData.concat(data) ;
			//关闭加载动画
					$scope.$broadcast('scroll.infiniteScrollComplete')
				}else{
					$scope.mainListData = data;
				}
			},function(error,statusCode){
				alertError(error,statusCode);
			//请求失败也要关闭动画
				if(isRefresh){
					$scope.$broadcast('scroll.refreshComplete')
				}else if(isLoad){
					$scope.canLoadMore = false;
					$scope.$broadcast('scroll.infiniteScrollComplete')
				}
			}
		);
	}
//mainNav数据源
		$scope.navData=[];
		mainService.getMainNavData(
			function(data){
				$scope.navData = data;
			},
			function(error,statusCode){
				alertError(error,statusCode);
			}
		);
//点击nav按钮切换页面
	$scope.index = 0;
	$scope.canLoadMore = true;
	$scope.change=function(index,id){
		//改变按钮选中状态
		$scope.index = index;
		//清空列表数据源
		$scope.mainListData=[];
		//加载第一页数据
		$scope.page=1;
		//重新请求列表数据
		requesListData(id,false,false)
		//初始化上拉加载
		$scope.canLoadMore = true;
		//列表滚动到头部
		$ionicScrollDelegate.$getByHandle('main-content').scrollTop(false)
	}
/*========================点击item跳转详情页======================*/
	$scope.itemDetail=function(id){
		console.log(id)
	//跳转到详情页时将id值传递过去
		$location.path('/tabs/mainDetail/'+id)
	}














/*========================下拉刷新======================*/
	$scope.dorefresh=function(){
		$scope.page=1;
		if($scope.index==0){
			//首页刷新banner secondaryBanner navData
			requesListData(107,true,false)
			requestBannerData();
			requesMainSecondaryBannerData();
		}else{
			//刷新navData
			requesListData($scope.navData[$scope.index].id,true,false)
		}
	}
	
/*========================上拉加载======================*/
	$scope.loadMore=function(){
		$scope.page++;
		requesListData($scope.navData[$scope.index].id,false,true)	
	}


//点击搜索跳转事件
	$scope.searchAction=function(){
		$location.path('/search')
	}














//请求数据失败提示
	function alertError(error,statusCode){
	   var alertPopup = $ionicPopup.alert({
	     title: '啊哦~~~嘛也没有',
	     template: '你请求的是个什么鬼?都报	'+statusCode+'	错误了！',
	//设置按钮样式   
	     okText:"知道了",
	   	 okType:"button-assertive"
	   });
	
	   alertPopup.then(function(res) {
	     console.log(error);
	   });
	}
}])