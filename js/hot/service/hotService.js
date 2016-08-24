
appService.service('hotService',['$http',function($http){
	this.getHotListData=function(successCallBack,page,errorCallBack){	
		$http.get('/projectFive----AngularJS/giftApp/mock/hot/hotList'+page+'.json')
		.success(function(data){
			console.log(data.data.items)
			var hotListData = [];
			for (var i=0;i<data.data.items.length;i++) {
				var obj = {};
				obj.imgUrl = data.data.items[i].data.cover_image_url;
				obj.name = data.data.items[i].data.name;
				obj.price = data.data.items[i].data.price;
				obj.like = data.data.items[i].data.favorites_count;
				hotListData.push(obj)
			}
			successCallBack(hotListData)
		})
		.error(function(error){
			errorCallBack(error)
		})	
	}
	

}])


















