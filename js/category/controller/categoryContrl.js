appContrl.controller('categoryContrl',['$scope','categoryService','$ionicScrollDelegate','$location',function($scope,categoryService,$ionicScrollDelegate,$location){
	$scope.switchBtn = false;
	$scope.temUrl='views/category/categoryTem2.html';
	
//点击跳转搜索页面
	$scope.searchAction=function(){
		$location.path('/search')
	}
	
	
	
	
	
//点击头部按钮显示不同的页面内容
	$scope.switchBtnAction=function(boolval){
		$scope.switchBtn = boolval;
		if($scope.switchBtn){
			$scope.temUrl='views/category/categoryTem1.html';
		}else{
			$scope.temUrl='views/category/categoryTem2.html';
		}
	//每次切换模块让页面自动回到顶部
		$ionicScrollDelegate.$getByHandle('category-content').scrollTo(0,0,false)
	}
//栏目数据
	$scope.columnsData=[];
	categoryService.getCategoryColumns(
		function(data){
			console.log(data)
			$scope.columnsData=data;
		},	
		function(error){
			
		}
	)
//分组的数据
	$scope.groupAllData=[];
	$scope.groups = [];
	categoryService.getCategoryGroup(
		function(data){
			console.log(data)
			$scope.groupAllData=data;

			for (var i =0;i<$scope.groupAllData.length;i++) {
				var obj = {};
				obj.name = $scope.groupAllData[i].name;
				obj.channels = $scope.groupAllData[i].channels.slice(0,6);
				obj.isMore = $scope.groupAllData[i].channels.length>6;
				$scope.groups.push(obj)		
			}		
		},
		function(error){
			console.log(error)
		}
	)
	
//点击显示更多跳转详情列表
	$scope.showMore=function(index){
		console.log(index)
//将每次点击的数据储存到服务里
		categoryService.setGroupData($scope.groupAllData[index])	
		$location.path('/tabs/categoryMore')
	}
	
	
/*=======================================单品页面===================================================--*/	
	$scope.categoryTreeData = [];
	$scope.itemHeightArr = [];
	$scope.itemStyleArr = [];
	$scope.topArr=[];
	categoryService.getcategoryTree(
		function(data){
			console.log(data)
			$scope.categoryTreeData=data;
//计算每一项的高度
			var top = 0;
			for(var i = 0;i<data.length;i++){
				var count =Math.ceil(data[i].subcategories.length/3)
				var height = count*100+20;
				$scope.itemHeightArr.push(height)
				top += height;
				$scope.topArr.push(top)
				
				var style = "{height:'"+height+"px'}"
				$scope.itemStyleArr.push(style)
			}
			console.log($scope.topArr)
			console.log($scope.itemHeightArr)
			console.log($scope.itemStyleArr)
		},
		function(error){
			console.log(error)
		}
	)
//左边nav切换事件
	$scope.activeItem = 0;
	$scope.navItemAction=function(index){
		$scope.activeItem = index;
		$scope.isClick = true;
		if(index==0){
			$ionicScrollDelegate.$getByHandle('nav-content').scrollTo(0,0,true)	
		}else{
			$ionicScrollDelegate.$getByHandle('nav-content').scrollTo(0,$scope.topArr[index-1],true)		
		}
		console.log(index)
		
	}
//右边滚动视图触发事件
	$scope.contentScrollAction=function(){
		if($scope.isClick){
			$scope.isClick=false;
			return
		}
	//求每次滚动坐标对应的左边nav的index
		var top = $ionicScrollDelegate.$getByHandle('nav-content').getScrollPosition().top;
		console.log(top)
		var index = 0 ; 	
		if(index<0){
			index=0;
		}
		
		for (var i = 0;i<$scope.topArr.length;i++) {
			if(top<$scope.topArr[0]){
				index=0;
				break;
			}else if(top>=$scope.topArr[i-1]&&top<$scope.topArr[i]){
				index = i;
				break;
			}
		}
		$scope.$apply(function(){
			$scope.activeItem = index;		
		})	
			$ionicScrollDelegate.$getByHandle('category-nav').scrollTo(0,index*50,true)
	}
	
}])