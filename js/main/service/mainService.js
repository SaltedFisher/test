appService.service('mainService',['$http',function($http){
//请求banner图数据	
	this.getMainBnnerData=function(seccessCallBack,errorCallBack){
		$http.get('/projectFive----AngularJS/giftApp/mock/main/banner.json')
		.success(function(data){
	//请求成功，过滤出图片的url，传回控制器
		//	console.log(data.data)
			var imgUrls=[];
			for(var i=0;i<data.data.banners.length;i++){
				imgUrls.push(data.data.banners[i].image_url)
			}
			seccessCallBack(imgUrls)		/*服务请求数据成功后，执行控制器传递过来的回调函数将数据data传递到控制器*/
		})
		.error(function(error,statusCode){
			errorCallBack(error,statusCode)
		})
	}	
//请求secondaryBanner数据		
	this.getMainSecondaryBannerData=function(seccessCallBack,errorCallBack){
		$http.get('/projectFive----AngularJS/giftApp/mock/main/secondaryBanner.json')
		.success(function(data){
			var imgUrl=[];
			for(var i=0;i<data.data.secondary_banners.length;i++){
				imgUrl.push(data.data.secondary_banners[i].image_url)
			}
			seccessCallBack(imgUrl)	
		})
		.error(function(error,statusCode){
			errorCallBack(error,statusCode)
		})
	}
		
//请求mainList数据
	this.getMainListData=function(listID,page,seccessCallBack,errorCallBack){
		$http.get('/projectFive----AngularJS/giftApp/mock/main/mainList_'+listID+'page'+page+'.json')
		.success(function(data){
			console.log(data.data.items)
			var listData=[];
			for (var i =0;i<data.data.items.length;i++) {
				var item = data.data.items[i];
				var obj={};
				obj.title = item.title;
				obj.likes = item.likes_count;
				obj.coverImg = item.cover_image_url;
				obj.id = item.id;
				listData.push(obj)
			}
			seccessCallBack(listData)
		})
		.error(function(error,statusCode){
			errorCallBack(error,statusCode)
		})
	}	
//请求nav数据
	this.getMainNavData=function(seccessCallBack,errorCallBack){
		$http.get('/projectFive----AngularJS/giftApp/mock/main/nav.json')
		.success(function(data){
			console.log(data.data.channels)
			seccessCallBack(data.data.channels)
		})
		.error(function(error,statusCode){
			errorCallBack(error,statusCode)
		})
	}	
		
		
}])
