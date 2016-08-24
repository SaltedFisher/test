appContrl.controller('categoryMoreContrl',['$scope','categoryService',function($scope,categoryService){
	//从服务中获得存储的更多页面数据
		$scope.categoryMoreData = categoryService.getGroupData().channels
		$scope.title = categoryService.getGroupData().name;	
}])