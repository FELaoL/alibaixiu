// 评论列表展示start
$.ajax({
	type: "get",
	url: "/comments",
	success: function (response) {
		var html = template("commentsTpl", response);
		$("#commentsBox").html(html);
		var pageHtml = template("pageTpl", response);
		$("#pageBox").html(pageHtml);
	},
	error: function () {
		alert("获取评论数据失败");
	}
});

function changePage(page) {
	$.ajax({
		type: "get",
		url: "/comments",
		data: {
			page
		},
		success: function (response) {
			var html = template("commentsTpl", response);
			$("#commentsBox").html(html);
			var pageHtml = template("pageTpl", response);
			$("#pageBox").html(pageHtml);
		},
		error: function () {
			alert("获取评论数据失败");
		}
	});
}
//评论列表展示end
// 当审核按钮被点击的时候
$("#commentsBox").on("click", ".status", function () {
	// 获取当前评论的状态
	var status = $(this).attr("data-status");
	// 获取昂奇案要修改的评论的id
	var id = $(this).attr("data-id");
	// 向服务器端发送请求，更改评论状态
	$.ajax({
		type: "put",
		url: "/comments/" + id,
		data: {
			state: status == 0 ? 1 : 0
		},
		success: function () {
			location.reload();
		},
		error: function () {
			alert("更改评论状态失败");
		}
	});
});
// 评论审核end
