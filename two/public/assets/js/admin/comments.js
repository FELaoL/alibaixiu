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
