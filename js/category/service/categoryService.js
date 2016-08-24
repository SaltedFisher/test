appService.service('categoryService',['$http',function($http){
	
	this.getCategoryColumns=function(successCallBack,errorCallBack){
		$http.get('/projectFive----AngularJS/giftApp/mock/category/category_columns.json')
		.success(function(data){
			console.log(data.data.columns)
			var categoryColumns = [];
			for (var i=0;i<data.data.columns.length;i++) {
				var obj={};
				var item = data.data.columns[i];
				obj.imgUrl = item.banner_image_url;
				obj.title = item.title;
				obj.subtitle = item.subtitle;
				obj.id = item.id;
				obj.author = item.author;
				categoryColumns.push(obj)
			}
			successCallBack(categoryColumns)
		})
		.error(function(error){
			errorCallBack(error)
		})
	}
	
	
	
	 this.getCategoryGroup=function(successCallBack,errorCallBack){
	 	$http.get('/projectFive----AngularJS/giftApp/mock/category/category_group.json')
	 	.success(function(data){
	 		console.log(data.data.channel_groups)
	 		successCallBack(data.data.channel_groups)
	 	})
	 	.error(function(error){
	 		errorCallBack(data)
	 	})
	 }
	
//保存修改	查看更多数据
	var setGroupData = [];
	this.setGroupData=function(data){
		setGroupData = data;
	}
	this.getGroupData=function(){
		return setGroupData;
	}
	
//获取单品页面数据
		var categoryTreeDate = []
	this.getcategoryTree=function(successCallBack,errorCallBack){
		$http.get('/projectFive----AngularJS/giftApp/mock/category/category_tree.json')
		.success(function(data){
			categoryTreeDate = data.data.categories;
			successCallBack(categoryTreeDate)
		})
		.error(function(error){
			errorCallBack(data)
		})
		
		
	}
}])