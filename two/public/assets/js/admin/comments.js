// ---------------评论列表展示---------------------------------
let page = 1;
function queryComments() {
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
// ------------------------第一次加载--------------------------------------
queryComments();
// -----------------------页数变化时调用------------------------------------
// 实现分页
function changePage(val) {
	page = val;
	queryComments();
}
// --------------------------批准和驳回操作----------------------------------
// 当审核按钮被点击的时候
$("#commentsBox").on("click", ".status", function () {
	// 获取当前评论的状态
	var status = $(this).attr("data-status");
	// 获取当前要修改的评论的id
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
// -------------------------评论删除-----------------------------------------
// 当删除按钮被点击时
$("#commentsBox").on("click", ".delete", function () {
	if (confirm("您真的要执行删除操作吗？")) {
		// 获取管理员要删除的评论的id
		var id = $(this).attr("data-id");
		// 向服务器端发送请求，执行删除操作
		$.ajax({
			type: "delete",
			url: "/comments/" + id,
			success: function () {
				location.reload();
			},
			error: function () {
				alert("评论删除失败");
			}
		});
	}
});
// -------------------------------------------------------------------------
