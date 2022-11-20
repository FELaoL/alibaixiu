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
