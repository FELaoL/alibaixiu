// -----------------文章详情---------------------------------
// 从地址栏中获取文章id
const postId = getUrlParams("id");
// 向服务器端发送请求，根据文章id获取文章详细信息
if (postId !== -1) {
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
}
// ---------------------评论是否加载-------------------------------
// 评论是否经过人工审核
var review = null;
// 获取网站的配置信息
$.ajax({
	url: "/settings",
	type: "get",
	success: function (response) {
		review = response.review;
		// 判断管理员是否开启了评论功能
		if (response.comment) {
			// 判断用户是否登录了
			if (isLogin) {
				// 管理员开启了评论功能，渲染评论模板
				var html = template("commentTpl");
				// 渲染评论模板
				$("#comment").html(html);
			} else {
				alert("如果想评论，请访问/admin/login.html登录");
			}
		}
	},
	error: function () {
		alert("获取网站设置失败");
	}
});
// -------------------------提交评论功能----------------------------------------
// 当评论表单发生提交的时候
$("#comment").on("submit", "form", function () {
	// 获取用户输入的评论内容
	const content = $(this).find("textarea").val();
	let state = 0;
	if (review) {
		// 要经过人工审核
		state = 0;
	} else {
		// 不需要经过人工审核
		state = 1;
	}
	// 向服务器端发送请求，执行添加评论功能
	$.ajax({
		url: "/comments",
		type: "post",
		data: {
			content,
			post: postId,
			state
		},
		success: function () {
			alert("评论成功");
			location.reload();
		},
		error: function () {
			alert("评论失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// ------------------------------------------------------------------
