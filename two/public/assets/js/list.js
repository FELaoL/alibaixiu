// -----------------查询分类列表或者搜索数据-------------------------------
// 获取地址栏中的categoryId
const categoryId = getUrlParams("categoryId");
// 获取到浏览器地址栏中的搜索关键字
const key = getUrlParams("key");
// 根据分类id获取文章列表
if (categoryId != -1) {
	$("#categoryTitle").show();
	$.ajax({
		url: "/posts/category/" + categoryId,
		type: "get",
		success: function (response) {
			var html = template("listTpl", {
				data: response
			});
			$("#listBox").html(html);
		},
		error: function () {
			alert("查询文章失败");
		}
	});
	// 根据文章id获取分类信息
	$.ajax({
		url: "/categories/" + categoryId,
		type: "get",
		success: function (response) {
			$("#categoryTitle").html(response.title);
		},
		error: function () {
			alert("获取分类信息失败");
		}
	});
}
if (key != -1) {
	$("#categoryTitle").hide();
	// 跟怒搜索关键字调用搜索接口，获取搜索结果
	$.ajax({
		url: "/posts/search/" + key,
		type: "get",
		success: function (response) {
			var html = template("listTpl", {
				data: response
			});
			$("#listBox").html(html);
		},
		error: function () {
			alert("查询文章失败");
		}
	});
}
// ---------------------------------------------------
