// 添加用户start
$("#userForm").on("submit", function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: "post",
		url: "/users",
		data: formData,
		success: function () {
			location.reload();
		},
		error: function () {
			alert("用户添加失败");
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// 添加用户end

// 用户头像上传start
// 当用户选择文件的时候
$("#avatar").on("change", function () {
	var formdata = new FormData();
	// 用户选择到的文件
	formdata.append("avatar", this.files[0]);
	$.ajax({
		type: "post",
		url: "/upload",
		data: formdata,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数类型
		contentType: false,
		success: function (response) {
			// 实现头像预览功能
			$("#preview").attr("src", response[0].avatar);
			$("#hiddenAvatar").val(response[0].avatar);
		},
		error: function () {
			alert("头像上传失败");
		}
	});
});
// 用户头像上传end
