// 添加分类start
// 当添加分类表单发生的提交行为的时候
$("#addCategory").on("submit", function () {
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 向服务器端发送请求，添加分类
	$.ajax({
		type: "post",
		url: "/categories",
		data: formData,
		success: function () {
			location.reload();
		},
		error: function (err) {
			console.dir(err);
			alert("分类添加失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// 添加分类end

// 分类数据展示start
// 发送ajax请求，向服务器端索要分类列表数据
$.ajax({
	type: "GET",
	url: "/categories",
	success: function (response) {
		// 将服务器端返回的数据和HTML模板进行拼接
		var html = template("categoryListTpl", {
			data: response
		});
		// 将拼接好的内容放到页面中
		$("#categoryBox").html(html);
	},
	error: function () {
		alert("获取分类列表失败");
	}
});
// 分类数据展示end

// 分类数据修改start
// 为编辑按钮添加点击事件
$("#categoryBox").on("click", ".edit", function () {
	// 获取要修改的分类数据的id
	var id = $(this).attr("data-id");
	// 根据id获取分类数据的详细信息
	$.ajax({
		type: "get",
		url: "/categories/" + id,
		success: function (response) {
			var html = template("modifyCategoryTpl", response);
			$("#formBox").html(html);
		},
		error: function () {
			alert("获取分类信息失败");
		}
	});
});
// 当修改分类数据表单发生提交行为的时候
$("#formBox").on("submit", "#modifyCategory", function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的分类的id
	var id = $(this).attr("data-id");
	// 发送请求，修改分类数据
	$.ajax({
		type: "put",
		url: "/categories/" + id,
		data: formData,
		success: function () {
			location.reload();
		},
		error: function () {
			alert("修改分类失败");
		}
	});
	// 阻止表单的默认提交行为
	return false;
});
// 分类数据修改end

// 分类数据删除start
// 当删除按钮被点击的时候
$("#categoryBox").on("click", ".delete", function () {
	if (confirm("您真的要执行删除操作吗？")) {
		// 获取要删除的分类数据id
		var id = $(this).attr("data-id");
		// 向服务器端发送请求，删除分类数据
		$.ajax({
			type: "delete",
			url: "/categories/" + id,
			success: function () {
				location.reload();
			},
			error: function () {
				alert("分类删除失败");
			}
		});
	}
});
// 分类数据删除end
