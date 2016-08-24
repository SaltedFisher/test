appContrl.controller('searchContrl',['$scope','$ionicHistory',function($scope,$ionicHistory){
	//返回上一页
	$scope.cancelAction=function(){
		$ionicHistory.goBack()		
	}
	
	
	
	
}])