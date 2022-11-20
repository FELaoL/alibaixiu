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
