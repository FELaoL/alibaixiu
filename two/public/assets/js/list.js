// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split("&");
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split("=");
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}
// 获取地址栏中的categoryId
const categoryId = getUrlParams("categoryId");
// 根据分类id获取文章列表
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
