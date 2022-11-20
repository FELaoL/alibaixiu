// 文章列表数据展示start
// 向服务器端发送请求，获取文章列表数据
$.ajax({
	url: "/posts",
	type: "get",
	success: function (response) {
		var html = template("postsTpl", response);
		$("#postsBox").html(html);
		var page = template("pageTpl", response);
		$("#page").html(page);
	},
	error: function () {
		alert("获取文章列表失败");
	}
});

// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
// 分页
function changePage(page) {
	// 向服务器端发送请求，获取文章列表数据
	$.ajax({
		url: "/posts",
		type: "get",
		data: {
			page
		},
		success: function (response) {
			var html = template("postsTpl", response);
			$("#postsBox").html(html);
			var page = template("pageTpl", response);
			$("#page").html(page);
		},
		error: function () {
			alert("获取文章列表失败");
		}
	});
}

// 向服务器端发送请求，索要分类数据
$.ajax({
	type: "GET",
	url: "/categories",
	success: function (response) {
		var html = template("categoryTpl", {
			data: response
		});
		$("#categoryBox").html(html);
	},
	error: function () {
		alert("获取分类数据失败");
	}
});

// 当用户进行文章列表筛选的时候
$("#filterForm").on("submit", function () {
	// 获取到管理员选择的过滤条件
	const formData = $(this).serialize();
	// 向服务器端发送请求，获取文章列表数据
	$.ajax({
		url: "/posts",
		type: "get",
		data: formData,
		success: function (response) {
			var html = template("postsTpl", response);
			$("#postsBox").html(html);
			var page = template("pageTpl", response);
			$("#page").html(page);
		},
		error: function () {
			alert("获取文章列表失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// 文章删除start
// 当删除按钮被点击的时候
$("#postsBox").on("click", ".delete", function () {
	// 弹窗确认框和管理员确认是否真的要进行删除操作
	if (confirm("您真的要进行删除操作吗？")) {
		// 获取管理员要删除的文章的id
		var id = $(this).attr("data-id");
		// 向服务器端发送请求，执行删除操作
		$.ajax({
			type: "delete",
			url: "/posts/" + id,
			success: function () {
				location.reload();
			},
			error: function () {
				alert("文章删除失败");
			}
		});
	}
});
// 文章删除end
