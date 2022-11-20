// 添加文章start
//  向服务器端发送请求，获取文章分类数据
$.ajax({
	url: "/categories",
	type: "GET",
	success: function (response) {
		var html = template("categoryTpl", {
			data: response
		});
		$("#category").html(html);
	},
	error: function () {
		alert("获取分类数据失败");
	}
});

// 当管理员选择文件的时候，触发事件
$("#feature").on("change", function () {
	// 获取到管理员选择到的文件
	var file = this.files[0];
	// 创建formData对象，实现二进制文件上传
	var formData = new FormData();
	formData.append("cover", file);
	// 实现文章封面图片上传
	$.ajax({
		url: "/upload",
		type: "post",
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数类型
		contentType: false,
		success: function (response) {
			$("#thumbnail").val(response[0].cover);
		},
		error: function () {
			alert("文章封面上传失败");
		}
	});
});
// 当添加文章表单提交的时候
$("#addForm").on("submit", function () {
	// 获取到管理员在表单中输入的内容
	var formData = $(this).serialize();
	$.ajax({
		type: "post",
		url: "/posts",
		data: formData,
		success: function () {
			// 文章添加成功，跳转到文章列表页面
			location.href = "/admin/posts.html";
		},
		error: function () {
			alert("创建文章失败");
		}
	});
	// 阻止表单默认提交的行为
	return false;
});
// 添加文章end
