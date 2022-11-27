// ---------------------------------------查询文章数量-----------------------------------------------------------------------------------------------
// 获取文章的数量
$.ajax({
	type: "get",
	url: "/posts/count",
	success: function (response) {
		$("#post").html("<strong>" + response.postCount + "</strong>篇文章（<strong>" + response.draftCount + "</strong>篇草稿）");
	},
	error: function () {
		alert("查询文章数量失败");
	}
});
// ----------------------------------------查询分类数量-------------------------------------------------------------------------------------------
// 获取分类的数量
$.ajax({
	type: "get",
	url: "/categories/count",
	success: function (response) {
		$("#category").html("<strong>" + response.categoryCount + "</strong>个分类");
	},
	error: function () {
		alert("查询分类数量失败");
	}
});
// -----------------------------------------查询评论数量---------------------------------------------------------------------------------------
// 获取评论的数量
$.ajax({
	type: "get",
	url: "/comments/count",
	success: function (response) {
		$("#comment").html("<strong>" + response.commentCount + "</strong>条评论（<strong>" + response.toCommentCount + "</strong>条待审核）");
	},
	error: function () {
		alert("查询评论数量");
	}
});
// ------------------------------------------------------------------------------------------------------------------------------------------------
