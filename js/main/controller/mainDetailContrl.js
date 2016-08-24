appContrl.controller('mainDetailContrl',['$scope','$stateParams',function($scope,$stateParams){
	//得到url传递过来的详情页id
		$scope.itemID = $stateParams.itemID
		console.log($scope.itemID)
		var iframe = document.getElementById('iframe')
		iframe.src='http://hawaii.liwushuo.com/posts/'+$scope.itemID
}])







