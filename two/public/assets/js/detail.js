// 从地址栏中获取文章id
const postId = getUrlParams("id");
// 向服务器端发送请求，根据文章id获取文章详细信息
$.ajax({
	url: "/posts/" + postId,
	type: "get",
	success: function (response) {
		var html = template("postTpl", response);
		$("#article").html(html);
	},
	error: function () {
		alert("获取文章详情失败");
	}
});
